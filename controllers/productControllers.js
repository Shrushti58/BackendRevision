import Product from "../models/products.js";

export const createProduct = async (req, res) => {

    try {
        const { name, quantity, image, price } = req.body;
        if (!name || quantity == null || price == null) {
            return res.status(404).json({ 'message': 'Required fields not Available' });
        }

        const newProduct = await Product.create({ name, quantity, image, price });
        return res.status(200).json({ 'message': 'Product Created Sucessfully' });
    }
    catch (err) {
        console.error('Failed to create Product', err.message);
        res.status(500).json({ 'message': 'Server Error' })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);

    } catch (err) {
        console.error('Error', err.message);
        return res.status(500).json({ 'message': 'Server Error' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ 'message': 'Product not Found!' })
        }

        const updatedProduct = await Product.findById(id);
        return res.status(200).json({ message: 'Product Updated', Product: updatedProduct })


    } catch (error) {
        return res.status(500).json({ 'message': 'Server Error' })
    }
}

export const deleteProduct=async(req,res)=>{
    try {

        const {id}=req.params;
        const deletedProduct=await Product.findByIdAndDelete(id);
        if(deletedProduct){
            return res.status(200).json({message:'Product Deleted',product:deletedProduct})
        }

        return res.status(404).json({message:'Product not Found'});
        
    } catch (error) {
        console.error('Error', err.message);
        return res.status(500).json({ 'message': 'Server Error' })
    }
}