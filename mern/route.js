const {Router}=require("express")
const Transaction=require("./Transaction")
const router=Router()
router.get("/",async(req,res)=>{
    const transaction=await Transaction.find({}).sort({createdAt: -1})
    res.json({data:transaction})
})
router.post("/", async (req,res)=>{
    const {amount,detail,date}= req.body;
    const transaction= new Transaction({
        amount,
        detail,
        date,

    });
    await transaction.save()
    res.json("sucessul")
})
router.delete("/:id",async(req,res)=>{
    await Transaction.findOneAndDelete({_id:req.params.id})
    res.json("it is deleted")


})
module.exports=router;