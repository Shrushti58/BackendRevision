import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productControllers.js";

const router=Router();

router.post('/create',createProduct);
router.get('/getProducts',getProducts);
router.put('/updateProduct/:id',updateProduct);
router.delete('/deleteProduct/:id',deleteProduct);

export default router;