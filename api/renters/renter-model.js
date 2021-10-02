const db = require('../data/dbConfig')


function available(){
    return db('items')
           .returning(['item_id','item_name','item_description','item_cost','item_image','item_isRented','owner_username'])
           .where('item_isRented',0)
           .orderby('item_id')
}


function rented(username){
    return db('items')
           .returning(['item_id','item_name','item_description','item_cost','item_image','owner_username'])
           .where('renter_username',username)
           .orderby('item_id')
}

function rentItem(item_id,username,rented){
    return db('items')
           .returning(['item_id','item_name','item_description','item_cost','item_image','owner_username','renter_username'])
           .where('item_id',item_id)
           .update({
               item_isRented:rented,
               renter_username:username
           })
}

function findRentedItemById(item_id){
    return db('items')
    .returning(['item_id','item_name','item_description','item_cost','item_image'])
    .where('item_id',item_id)
    .first()
}

module.exports={
    available,
    rented,
    rentItem,
    findRentedItemById
}
