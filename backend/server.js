import express from "express";
import connect from "./config/db.js";
import Product from "./models/product.model.js";
const app = express();

// Middleware
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
  const { id } = req.params;
  try{
    const product = await Product.findById(id);
    if (!product)
      return res
       .status(404)
       .json({ success: false, message: "Product not found" });

    res.json({ success: true, data: product });
  }catch(err){
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.image || !product.price) {
    return res
      .status(401)
      .json({ success: false, message: "please provide all the items" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


app.put('/api/products/:id', async (req, res)=>{
  const {id} = req.params

  try{
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true})
    if (!updatedProduct)
      return res
       .status(404)
       .json({ success: false, message: "Product not found" });

    res.json({ success: true, data: updatedProduct });
  }catch(err){
    res.status(500).json({success: false, message: err.message})
  }
}

)

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(3001, () => {
  connect();
  console.log("server is running on port 30001!");
});
