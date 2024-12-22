import express from "express";
import connectdb from "./db.js";
import dotenv from 'dotenv'
import router from "./routes/product.route.js";

const app = express();

dotenv.config()
app.use(express.json());
const port = process.env.PORT
app.use('/api/products', router)

app.listen(port, () => {
  console.log("server is running on port " + port);
  connectdb();
});
