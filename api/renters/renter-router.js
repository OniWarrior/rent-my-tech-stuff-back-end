const router = require('express').Router()
const Renter = require('./renter-model')
const {default:jwtDecode} = require('jwt-decode')

// retrieves all available items that can be rented by the renter
router.get('/available',(req,res,next)=>{
    Renter.available()
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`server error: ${err.message}`)
    })
})

// retrieves all items rented by the renter
router.get('/rented',(req,res,next)=>{
    const decoded = jwtDecode(req.headers.authorization)
    Renter.rented(decoded.username)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`server error: ${err.message}`)
    })
})

// retrieves a specific item rented by the renter
router.get('/rented/:item_id',(req,res,next)=>{
    Renter.findRentedItemById(req.params.item_id)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`server error: ${err.message}`)
    })
})

// allows the renter to rent an item
router.put('/available/:item_id',(req,res,next)=>{
    const {item_id}=req.params
    const decode = jwtDecode(req.headers.authorization)
    const rented = req.body.isRented

    Renter.rentItem(item_id,decode.username,rented)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`server error: ${err.message}`)
    })
})

module.exports=router