# A simple fintech app 

The challenge was to create a small SPA composed of two routes, one to show the list of financial transactions, and another one to show a specific transaction details. The two general requirements are:

* The main page should show a table of transactions, allowing to textually search transactions and/or to filter by bank, by account or by date range (start month and end month).
* The details page should be shown after clicking on a row of the previous table, then allowing to update the category of the shown transaction, by selecting an existing category or even creating a new category.


# Backend

Everything in this section should be executed from the `/server` directory.
```bash
npm install 
```
## Setting up the database

You can start the postgres database as a docker instance by navigating to the docker directory and using the docker compose configuration.

```bash
cd server/docker; docker compose up -d
 ```

## Setting up the data model with Prisma

The app uses Prisma to create and update the data models. 
```bash
npx prisma generate 
```

## Adding some sample data

You can also load some sample data by copying the contents of the 3 `.csv` files in `docker/data`. 

```bash
docker exec -it docker-db-1 bash
cd /var/lib/postgresql
psql -h localhost -U postgres testdata
\COPY "Account" FROM 'accounts.csv' DELIMITER ',' CSV HEADER;
\COPY "Category" FROM 'categories.csv' DELIMITER ',' CSV HEADER;
\COPY "Transaction"( "id", "accountId", "categoryId", "reference", "amount", "currency", "date" ) FROM 'transactions.csv' DELIMITER ',' CSV HEADER;`
```

## Ready to fire up the Apollo server

You can now query the database using the Apollo Server and GraphQL

```bash
npm run dev
```


# Frontend

Everything in this section should be executed from the `/client` directory.

## Set up

The UI is build with Vue and Nuxt. It's styled with Tailwind CSS. 

```bash
npm install 
npm run build 
npm run dev
```