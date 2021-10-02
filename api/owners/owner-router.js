const router = require('express').Router()
const Owner = require('./owner-model')
const {default:jwtDecode} = require('jwt-decode')


// post a new item
router.post('/',async(req,res,next)=>{
    try{
        const decode = jwtDecode(req.headers.authorization)
        const{name,description,cost,image}=req.body

        const item = await Owner.addItem({
            item_name:name,
            item_description:description,
            item_cost:cost,
            item_image:image,
            owner_username:decode.username
        })
        if(item){
            res.status(201).json(item)
        }

    }
    catch(err){
        res.status(500).json(`server error: ${err.message}`)

    }

})

// Retrieve all of owners items
router.get('/',(req,res,next)=>{
    const decode = jwtDecode(req.headers.authorization)

    Owner.findItemsOfOwner(decode.username)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`server error: ${err.message}`)
    })
})

// Retrieve a specific item of the owner
router.get('/:item_id',(req,res,next)=>{
    Owner.findById(req.params.item_id)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`server error: ${err.message}`)
    })
})

//Updates a specific item of the owner
router.put('/:item_id',(req,res,next)=>{
    const {item_id} = req.params
    const updatedItem = req.body

    Owner.updateItem(item_id,updatedItem)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`server error: ${err.message}`)
    })
})

//Deletes a specific item of the owner
router.delete('/:item_id',(req,res,next)=>{
    const {item_id}=req.params
    Owner.removeItem(item_id)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`server error: ${err.message}`)
    })
})

module.exports=router

