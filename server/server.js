//import packages
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

//start or configure packages
//tell server to use JSON
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//create a root route
app.get("/", (req, res) => {
  res.send("This is the root route!");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//--------------------
//creating db pool
const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

//I need a route to READ data from the database
app.get("/messages", async (req, res) => {
  const result = await db.query("SELECT * FROM guestbook");
  res.json(result.rows);
});

//I need a route to CREATE new data in the database

app.post("/new-data", async (req, res) => {
    console.log("This is the req.body", req.body);
  
    const { formValues } = req.body;
  
    const { messages } = formValues;
  
    const query = await db.query(
      `INSERT INTO guestbook ( messages) 
         VALUES ($1) RETURNING *`,
      [messages]
    );
  
    res.json({
      message: "Data inserted successfully!",
      newData: query.rows[0],
    });
  });
  