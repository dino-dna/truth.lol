# FROM rust as build
# RUN USER=root cargo new --bin /build --name api
# WORKDIR /build
# COPY Cargo.* ./
# RUN cargo build --release
# RUN rm src/*.rs
# COPY src src
# RUN cargo build --release
# COPY public public
# COPY bullshit.json bullshit.json
# EXPOSE 8080
# CMD ["./target/release/api"]


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
COPY public public
COPY bullshit.json bullshit.json
COPY --from=build /build/target/release/api ./api
EXPOSE 8080
CMD ["./api"]
