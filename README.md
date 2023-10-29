<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository. It contains book management serivce with basic auth implemented. For basic auth, username is `admin` and password is `brewappsllc`
Following are details of APIs

```bash
POST /dev/book -- Create a new book with unique title
GET /dev/book -- Fetch all books, or search books using keyword
PUT /dev/book/{id} -- Update a book detail using id
DELETE /dev/boo/{id} -- Delete a book, if exists
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode with development environment
$ npm run start:dev
```

## Swagger documentation

Once the app starts, run check swagger on `http://baseurl:port/dev/swagger`
Development enviroment swagger link: `http://localhost:3001/dev/swagger`

## Stay in touch

- Author - [Harish Gupta](https://www.github.com/harishgupta42)

## License

Nest is [MIT licensed](LICENSE).
