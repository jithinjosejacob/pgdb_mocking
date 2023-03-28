const { newDb } = require("pg-mem");
const { Pool } = require("pg");

let queryBuilder = require("knex")({
  client: "pg",
});

var pool;
const fs = require("fs");
async function seedDB(db) {
  console.log("Creating tables in inmemory db ....");
  db.public.none(fs.readFileSync(__dirname + "/createScript.sql", "utf-8"));
  const poolClass =  db.adapters.createPg().Client;

  pool = new poolClass();
  let insertQuery = {
    text: queryBuilder("customers")
      .insert({
        firstName: "suraj",
        lastName: "kumar",
        address: "from in mem",
        pinCode: "memory pin code ",
        numberOfOrders: 27,
      })
      .toQuery()
  };
  let insertQuery2 = {
    text: queryBuilder("customers")
      .insert({
        firstName: "Raj",
        lastName: "kumar",
        address: "from in mem",
        pinCode: "memory pin code ",
        numberOfOrders: 27,
      })
      .toQuery()
  };
  // Exec the query.
  await pool.query(insertQuery);
  await pool.query(insertQuery2);
}

async function connectToInMemPGdb() {
  db = newDb();
  await seedDB(db);
}

async function connectToDB() {
  pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
  });
}

async function createDB(mode) {
  if (mode == "DB") {
    console.log("Connecting to actual db.. ");
    await connectToDB();
  } else {
    console.log("creating in memory db ... ");
    await connectToInMemPGdb();
  }
}

async function getCustomers()  {

    let query = { 
        text: queryBuilder("customers").toString() 
    }   
    let results = await pool.query(query)
    return results.rowCount > 0 ? results.rows:[];

}

async function insertCustomer(customer)  {

    let query = { 
        text: queryBuilder("customers").insert(customer).toQuery() 
    }   
    let results = await pool.query(query)

    return results.rowCount

}

module.exports = (mode) => {
 createDB(mode)
 return {
    pool, 
    getCustomers , 
    insertCustomer 
  };
};
