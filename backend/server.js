import express from "express";
import connectdb from "./db.js";
import Product from "./models/product.models.js";

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the details",
    });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/products/:id', async(req, res)=>{
  try{
    const product = await Product.findByIdAndDelete(params.id)
    if(!product){
      return res.status(404).json({success: false, message: "product not found"})
    }
    return res.status(200).json({success: true, message: "product deleted successfully", data: product})
  }catch(err){
    res.json(500).json({success: false, message: err.message})
  }
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
  connectdb();
});
