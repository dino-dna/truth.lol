#![feature(plugin)]
#![plugin(rocket_codegen)]
#[macro_use]

extern crate lazy_static;
extern crate rocket;
extern crate json;
use json::{JsonValue};
use rocket::response::content;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

lazy_static! {
    static ref LIES: JsonValue = {
        let path = Path::new("lies.json");
        let display = path.display();
        let mut file = File::open(&path).unwrap();
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

#[get("/bullshit")]
fn bullshit<'a>() -> content::Json<&'a str> {
    let dumpy = LIES.dump();
    return content::Json(dumpy);
}

fn main() {
    rocket::ignite().mount("/", routes![bullshit]).launch();
}
