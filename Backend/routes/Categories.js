const express=require("express")
const router=express.Router();
const Categories=require("../models/CategoriesSchema")

router.post("/addCategory",async(req,res)=>{
const {name,description}=req.body;
if(!name || !description){
    return res.status(401).json({message:'All fileds are required'})
}
const newCategory=await new Categories({name,description})
await  newCategory.save()
return res.status(201).json({message:"category  added successfuly"})
});
router.delete("/deleteCategory",async(req,res)=>{
    const{name}=req.body
    const deleteCategory=await Categories.findOneAndDelete({name})
    return res.status(201).json({message:"category delete "})
})
router.get("/getAllCategory",async(req,res)=>{
    const Category=await Categories.find()
    if(!Category)
    {
        return res.status(401).json({message:"There is no category"})
    }
    return res.status(201).json({message:"All  Categories",Category})
})
module.exports=router;