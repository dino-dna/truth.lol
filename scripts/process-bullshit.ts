import * as sql from "sqlite3";
import assert from "assert";
import fetch from "node-fetch";
import { Window } from "happy-dom";
import { promisify } from "util";
import path from "path";
import { decode } from "html-entities";

const DB_FILENAME = path.resolve(__dirname, "../db.sqlite");
const log = (msg: any) => console.log(`[bs-process]`, msg);
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

var RULING_TYPES = [
  "false",
  "pants-fire",
  "half-true",
  "barely-true",
  "mostly-true",
  "true",
  "full-flop",
];

var BULLSHIT_RULING_TYPES = [
  "false",
  "pants-fire",
  "full-flop",
  // 'half-true',
  "barely-true",
];

const POLITIFACT_ORIGIN = "https://www.politifact.com";
const getPageUrl = (pageNum: number) => {
  assert(pageNum > 0, "page numbers are 1 indexed");
  return `${POLITIFACT_ORIGIN}/factchecks/list/?page=${pageNum}&speaker=donald-trump`;
};

const runQ = (db: sql.Database, ...args: Parameters<sql.Database["run"]>) =>
  promisify(db.run.bind(db))(...args) as Promise<sql.RunResult>;

async function update({ db }: { db: sql.Database }) {
  let pageNum = 1; // set to 0 to terminate
  const window = new Window();
  const document = window.document;

  while (pageNum) {
    log(`fetch page ${pageNum}`);
    const html = await fetch(getPageUrl(pageNum), {}).then((r) => r.text());
    ++pageNum;
    document.body.innerHTML = html;
    const quoteEls = document.querySelectorAll(".o-listicle__item");
    log(`  found ${quoteEls.length} quotes`);
    if (!quoteEls.length) {
      pageNum = 0;
      continue;
    }
    for (const quoteEl of quoteEls) {
      const anchorEl = quoteEl.querySelector(".m-statement__quote a");
      if (!anchorEl) {
        throw new Error(`expected anchor, got ${anchorEl}`);
      }
      const statement = anchorEl.textContent;
      const url = `${POLITIFACT_ORIGIN}/${anchorEl.getAttribute("href")}`;
      const rating = quoteEl
        .querySelector(".m-statement__meter .c-image img")
        .getAttribute("alt");
      if (!RULING_TYPES.includes(rating)) {
        log(`  skipping quote due to rating: ${rating}`);
        continue;
      }
      const footer = quoteEl.querySelector(".m-statement__footer").textContent;
      const [_, date] = footer.split("•");
      const bs = {
        statement: decode(statement.trim()),
        url: decode(url.trim()),
        rating: decode(rating.trim()),
        date: decode(date.trim()),
      };
      Object.entries(bs).forEach(([k, v]) => {
        assert(v, `field ${k} expected value, got ${v}`);
      });
      log(`  adding statement: ${bs.statement.substr(0, 30)}`);
      await runQ(
        db,
        "insert into statements (statement,url,rating,date) values (?,?,?,?);",
        bs.statement,
        bs.url,
        bs.rating,
        bs.date
      ).catch((err: any) => {
        if (err && err.code === "SQLITE_CONSTRAINT") return;
        throw err;
      });
    }
    await sleep(500);
  }
}

void (async function go() {
  const db = new sql.Database(DB_FILENAME);
  await runQ(
    db,
    "create table if not exists statements (statement text unique, url text unique, rating text, date text)"
  ).catch((err) => {
    throw err;
  });
  await update({ db });
  db.close();
})();
