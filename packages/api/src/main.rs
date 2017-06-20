#[macro_use]

extern crate lazy_static;
extern crate hyper;
extern crate futures;
extern crate json;

use hyper::header::{ContentType};
use hyper::server::{Http, Request, Response, Service};
use hyper::{Method, StatusCode};
use futures::future::FutureResult;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;
use json::{JsonValue};

struct Bullshit;
lazy_static! {
    static ref LIES: JsonValue = {
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
        json::parse(&lies).unwrap().remove("data")
    };
}

impl Service for Bullshit {
    type Request = Request;
    type Response = Response;
    type Error = hyper::Error;
    type Future = FutureResult<Self::Response, Self::Error>;

    fn call(&self, req: Request) -> Self::Future {
        println!("request recieved");
        let mut response = Response::new();
        match (req.method(), req.path()) {
            (&Method::Get, "/bullshit") => {
                println!("{}", req.path());
                response = Response::new()
                .with_header(ContentType::json())
                .with_body(LIES[0].dump());
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
    println!("Server running on {}", addr);
    server.run().unwrap();
}
