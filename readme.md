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

## Database imports

1. Delete the contents of `./horrorLex/data`. If this directory doesn't exist, create it.
2. Add the CSV files to `./horrorLex/data/`, paying close attention to their names. Right now, only the following names and extensions are permitted:
   - articles.csv
   - books.csv
   - categories.csv (sometimes referred to as tags)
   - films.csv
3. Data can be created or destroyed using `drop` and `insertMany` Mongo DB commands via two npm scripts. For overwriting existing content, or uploading new csv documents, the collection *must* be dropped before the new CSV data is imported. That means the most common workflow for each collection is to `drop` and then `insertMany`:

**Drop a collection**
- `npm run db:drop`
- Enter the name of the collection **without** the extension (e.g., `articles`)
- Note: when dropping `articles` and/or `books`, only one needs to be dropped as they share a collection. Dropping the second item throws an error and is totally safe to ignore. This is because they're both actually a collection under-the-hood named `publications`! Confusing and strange, yes, but this is because we built the damn plane while we we're flying it.

**Seed a collection**
- `npm run db:seed`
- Enter the name of the collection **without the extension (e.g., `articles`)
- Note: unlike the above quirk, both `articles` and `books` must be inserted, as they are both destined for a collection under-the-hood named `publications` and when this command executes `insertMany` we just keep pushing items into that collection.

4. If `articles` or `books` were dropped (and, as a result, the common `publications` collection was dropped, too), then a search index must be created via the Mongo Atlas UI

- Navigate to the `horror-lex-01` database and click the "Search" tab followed by the "Create Search Index" button
<img width="1250" alt="Screen Shot 2021-08-18 at 9 01 43 PM" src="https://user-images.githubusercontent.com/7059639/129994686-c6f80590-ff9f-4f39-a791-83d949fdefcc.png">

- Select the "JSON Editor" radio button and then click the "Next" button
<img width="1244" alt="Screen Shot 2021-08-18 at 9 01 51 PM" src="https://user-images.githubusercontent.com/7059639/129994811-a3733407-276e-4512-a2f3-74691d043479.png">

- For "Database and Collection", select "publications". For "Index Name" enter `search` (verbatim). This field is case sensitive and crucial to the app functioning correctly, as that value is referenced and hardcoded in the backend (building the plane while we flew it, yada yada). Paste the contents of `./horrorLex/config/searchIndex.json` into the JSON editor, then click the "Next" button
<img width="1236" alt="Screen Shot 2021-08-18 at 9 02 53 PM" src="https://user-images.githubusercontent.com/7059639/129995146-52a80254-676a-42f0-acdd-acf4c012febf.png">

- On the next screen, you can review things and then if it looks good, click the "Create Search Index" button

- Once the search index is created, you'll receive an email. This step usually takes a few minutes.

- Once the index is built, check the site and make sure the search and browse functionality looks normal.

- Success!
