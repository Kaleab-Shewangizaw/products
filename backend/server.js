import express from "express";
import connectdb from './db.js'

const app = express();



app.get("/", (req, res) => {
  res.send("<h1>this is from the server</h1>");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
  connectdb();
});


