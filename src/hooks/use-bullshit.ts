import { useRef } from "react";
import { createDbWorker } from "sql.js-httpvfs";
import dbUrl from "url-loader!../../db.sqlite";

// sadly there's no good way to package workers and wasm directly so you need a way to get these two URLs from your bundler.
// This is the webpack5 way to create a asset bundle of the worker and wasm:
const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js"
  // import.meta.url,
);
const wasmUrl = new URL(
  "sql.js-httpvfs/dist/sql-wasm.wasm"
  // import.meta.url,
);
// the legacy webpack4 way is something like `import wasmUrl from "file-loader!sql.js-httpvfs/dist/sql-wasm.wasm"`.

// the config is either the url to the create_db script, or a inline configuration:
const config = {
  from: "inline",
  config: {
    serverMode: "full", // file is just a plain old full sqlite database
    requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
    url: "/foo/bar/test.sqlite3", // url to the database (relative or full)
  },
};
// // or:
// const config = {
//   from: "jsonconfig",
//   configUrl: "/foo/bar/config.json"
// }

const worker = await createDbWorker(
  [config],
  workerUrl.toString(),
  wasmUrl.toString()
);

type Bs = {
  statement: string;
  statement_url: string;
  // e.g. a tweet
  statement_context: string;
  // 2018-04-22
  statement_date: string;
  // "speaker": {
  //     "first_name": "Donald",
  //     "last_name": "Trump",
  //     "name_slug": "donald-trump",
  //     "canonical_photo": "http://static.politifact.com.s3.amazonaws.com/politifact/mugs/NYT_TRUMP_CAMPAIGN_5.jpg",
  //     "party": {
  //         "party": "Republican",
  //         "party_slug": "republican"
  //     }
  // },
};

export const useBullshit = () => {
  const bsById = useRef<Record<string, Bs>>({});
  const { bullshitCount };
};
