import express from "express";
import connectdb from "./db.js";
import router from "./routes/product.route.js";

const app = express();

app.use(express.json());

app.use('/api/products', router)

app.listen(3000, () => {
  console.log("server is running on port 3000");
  connectdb();
});
