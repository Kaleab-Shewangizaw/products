import express from "express";
import connectdb from "./db.js";
import Product from "./models/product.models.js";

const app = express();

app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
app.post("/api/products", async (req, res) => {
  const products = req.body;

  if (!products.name || !products.image || !products.price) {
    res
      .status(400)
      .json({ success: false, message: "provide all the required items!" });
  }

  const newProduct = new Product(products);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "created a product", data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/products/:id', async(req, res)=> {
  try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!product){
      res.status(401).json({success: false, message: "the product is not here!"})
    }
    res.status(201).json({success: true, message: "successfully updated the following product", data: product})
  }catch(err){
    res.status(500).json({success: false, message: err.message})
  }
})

app.delete('/api/products/:id', async(req, res)=>{
  try{
    const product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({success: true, message:"successfully deleted the following item", data: product})
  }catch(err){
    res.status(500).json({success: false, message: err.message})
  }
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
  connectdb();
});
