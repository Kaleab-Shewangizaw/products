import express from "express";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();


router.get('/', getProducts)
router.get('/:id', getOneProduct)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)


export default router