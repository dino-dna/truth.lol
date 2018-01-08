extern crate serde_json;

use self::serde_json::{Value, Error};
use std::fs::File;
use futures::{Future, Stream};

use client;

const BULLSHIT_FILENAME: &str = "bullshit.json";
const BULLSHIT_API_ROOT: &str = "http://www.politifact.com/api/statements/truth-o-meter/people/donald-trump/json/";

pub fn init () -> Future<Item=Value, Error=Error> {
  match File::open(BULLSHIT_FILENAME) {
    Error => {
      // let bulk_api_uri = format!("{}?n=500", BULLSHIT_API_ROOT).parse().unwrap()
      let bulk_api_uri = format!("{}?n=1", BULLSHIT_API_ROOT).parse().unwrap();
      return client::create().get(bulk_api_uri).and_then(|res| {
        res.
          res.body().concat2().and_then(move |body| {
              let bs: Value = serde_json::from_slice(&body).unwrap();
              println!("{}", bs);
              Ok(())
          })
      })
    }
  }
}
// initializes bullshit json
  // test for file
  // on file missing, create a client, fetch, write_lies
  // begin poll
// poll
  // every N minutes, hit api w/ defaults
  // add missing entries into json file => write_lies
// write_lies
  // plain-text-ify html statements
  // test for url collision
  // write non-colliding set
// provide bullshit on request
  // bullshit::get_random()
  // bullshit::get_all()
  // bullshit::get(n)
