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
- `npm run start:dev`

### Production Builds
- `npm run start:prod`
- `pm2` is used to manage the Express process
- To stop the above process, `./node_modules/.bin/pm2 kill`