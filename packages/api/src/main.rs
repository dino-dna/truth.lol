#[macro_use]
extern crate lazy_static;
extern crate hyper;
extern crate futures;
extern crate json;

use hyper::server::{Http, Request, Response, Service};
use hyper::{Method, StatusCode};
use futures::future::FutureResult;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

struct Bullshit;
lazy_static! {
    static ref LIES: String = {
        let path = Path::new("lies.json");
        let display = path.display();
        let mut file = match File::open(&path) {
            Err(_) => {
                panic!("couldn't open {}", display)
            },
            Ok(file) => file,
        };

        let mut lies = String::new();

        match file.read_to_string(&mut lies) {
            Err(_) => {
                panic!("couldn't read {}", display)
            },
            Ok(lies) => lies,
        };

        let parsed = json::parse(&lies).unwrap();
        println!("{}", &parsed["data"][0]);

        lies
    };
}

impl Service for Bullshit {
    type Request = Request;
    type Response = Response;
    type Error = hyper::Error;

    type Future = FutureResult<Self::Response, Self::Error>;

    fn call(&self, req: Request) -> Self::Future {
        let mut response = Response::new();

        match (req.method(), req.path()) {
            (&Method::Get, "/bullshit") => {
                response.set_body(LIES.to_string());
            },
            _ => {
                response.set_status(StatusCode::NotFound);
            },
        };

        futures::future::ok(response)
    }
}

fn main() {

    let addr = "127.0.0.1:3001".parse().unwrap();
    let server = Http::new().bind(&addr, || Ok(Bullshit)).unwrap();
    server.run().unwrap();
}
