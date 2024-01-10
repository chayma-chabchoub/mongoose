const express=require("express")
const router= express.Router()
const Person = require("../models/personSchema")


// @DESCRIPTION CREATE DATA 
// @METHODE:POST 
router.post('/uers',async(req,res)=>{
    try{
        const newPerson = new Person(req.body)
        await newPerson.save()
        res.status(200).json({msg:"success",newPerson})
    }
    catch(err){
        res.status(500).json({msg:err.message})
    }
})
module.exports=router

