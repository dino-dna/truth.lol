#![feature(plugin)]
#![plugin(rocket_codegen)]
#![feature(macro_vis_matcher)]
extern crate rocket;
extern crate futures;
extern crate hyper;
extern crate tokio_core;

mod bullshit;
mod client;

use rocket::response::content;

#[get("/bullshit")]
fn buuuuuulshiiit() -> content::Json<String> {
    let client = client::create();
    return content::Json(
        String::from("dawg, use http://static.politifact.com/api/doc.html")
    );
}

fn main() {
    bullshit::init();
    rocket::ignite()
        .mount("/", routes![buuuuuulshiiit]).launch();
}
