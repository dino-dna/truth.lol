FROM rust as build
RUN USER=root cargo new --bin /build --name api
WORKDIR /build
COPY Cargo.* ./
RUN cargo build --release
RUN rm src/*.rs
COPY src src
RUN cargo build --release

FROM rust:slim
RUN mkdir /api
WORKDIR /api
COPY public ./public
COPY bullshit.json ./
COPY --from=build /build/target/release/api ./api
CMD ["/api/bin"]
