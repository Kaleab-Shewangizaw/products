import express from "express";
import connectdb from "./db.js";
import Product from "./models/product.models.js";

const app = express();

app.use(express.json());

app.post('/api/products', async(req, res) => {
  const products = req.body
  if(!products.name || !products.price || !products.image){
    return res.status(400).json({message: "Please provide all the required!"})
  }

  products = new Product(products)

  try{
    await products.save()
    res.status(200).json({success: true, message: "product added successfully", data: products})
  }catch(err){
    res.status(500).json({success: false, message: err.message})
  }
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
  connectdb();
});
