#![feature(plugin)]
#![plugin(rocket_codegen)]
// #[macro_use]

extern crate lazy_static;
extern crate rocket;
extern crate json;
extern crate futures;
extern crate hyper;
extern crate tokio_core;

mod client;

use rocket::response::content;

#[get("/bullshit")]
fn bullshit() -> content::Json<String> {
    return content::Json(String::from("dawg, use http://static.politifact.com/api/doc.html"));
}

fn main() {
    rocket::ignite().mount("/", routes![bullshit]).launch();
    client::get();
}
