extern crate log;
extern crate actix_web;
extern crate env_logger;

use actix_web::http::{Method};
use actix_web::middleware::{self};
use actix_web::{fs, pred, server, App, HttpRequest, HttpResponse, Result};
use std::{env, path::Path};

static PUBLIC_DIRNAME: &str = &"public";

fn index(_req: HttpRequest) -> Result<fs::NamedFile> {
    let path = Path::new("public/index.html");
    let filename = path.canonicalize()?;
    println!("\nindex filename: {:?}\n", filename);
    Ok(fs::NamedFile::open(filename)?)
}
fn api_bullshit(_req: HttpRequest) -> Result<fs::NamedFile> {
    // Cache-Control: max-age=604800
    // 60 * 60 * 24 * 7 (days)
    let path = Path::new("./bullshit.json");
    let filename = path.canonicalize()?;
    println!("\nbs filename: {:?}\n", filename);
    Ok(fs::NamedFile::open(filename)?)
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
            .handler("/",
                fs::StaticFiles::new(PUBLIC_DIRNAME)
                    .default_handler(index))
            .default_resource(|r| {
                // 404 for GET request
                println!("serving default");
                r.method(Method::GET).f(index);
                r.route()
                    .filter(pred::Not(pred::Get()))
                    .f(|_| HttpResponse::MethodNotAllowed());
            })
    })
    .bind(format!("0.0.0.0:{}", port))
        .unwrap()
        .threads(4)
        .run()
}
