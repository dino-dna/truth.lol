use std::io::{self, Write};
use futures::{Future, Stream};
use hyper::{Client};
use hyper::client::HttpConnector;
use tokio_core::reactor::Core;

struct Err;

pub fn get () -> &'static Client<HttpConnector> {
  let mut core = match Core::new() {
    Ok(v) => v,
    Err(e) => {
      panic!("failed to create http client");
    }
  }
  let client = Client::new(&core.handle());
  &client;
}
