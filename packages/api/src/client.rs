use hyper::{Client};
use hyper::client::HttpConnector;
use tokio_core::reactor::Core;

pub fn create () -> Client<HttpConnector> {
  let core = Core::new().unwrap();
  return Client::new(&core.handle());
}
