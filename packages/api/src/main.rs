//extern crate actix;
#[macro_use]
extern crate log;
extern crate actix_web;
extern crate env_logger;

use actix_web::http::{Method};
use actix_web::middleware::{self};
use actix_web::{fs, pred, server, App, HttpRequest, HttpResponse, Result};
use std::env;

fn index(_req: HttpRequest) -> Result<fs::NamedFile> {
    Ok(fs::NamedFile::open("./public/index.html")?)
}
fn api_bullshit(_req: HttpRequest) -> Result<fs::NamedFile> {
    // Cache-Control: max-age=604800
    // 60 * 60 * 24 * 7 (days)
    Ok(fs::NamedFile::open("./bullshit.json")?)
}

fn main() {
    env::set_var("RUST_LOG", "actix_web=debug");
    env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();
    let port = 8080;
    server::new(|| {
        App::new()
            .middleware(middleware::Logger::default())
            .resource("/api/bullshit", |r| r.f(api_bullshit))
            .handler("/", fs::StaticFiles::new("public"))
            .default_resource(|r| {
                // 404 for GET request
                r.method(Method::GET).f(index);
                // all requests that are not `GET`
                r.route()
                    .filter(pred::Not(pred::Get()))
                    .f(|_| HttpResponse::MethodNotAllowed());
            })
    })
    .bind(format!("127.0.0.1:{}", port))
        .unwrap()
        .threads(4)
        .run()
}
