# Horror Lex

## Prerequisites 

- Node >= 14
- Mongo DB

## Running the Project

### Install Dependencies
- `npm i`

### Add a local `.env` file
- Add `.env` file to the project root, using `.env-sample` as a template

### Seed the local database
- Add the `books.csv` file to `./data`
- `npm run db:seed`

### Development Builds
- `npm start`

### Production Builds
- `npm run client:prod`
- `npm run server:prod`
