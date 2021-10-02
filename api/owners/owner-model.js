const db = require('../data/dbConfig')


function addItem(item){
    return db('items')
           .returning(['item_id','item_name','item_description','item_cost','item_image'])
           .insert(item)
}

function findItemsOfOwner(owner_username){
    return db('items')
           .returning(['item_id','item_name','item_description','item_cost','item_image'])
           .where('owner_username',owner_username)
           .orderby('item_id') 

}

function findById(item_id){
    return db('items')
           .returning(['item_id','item_name','item_description','item_cost','item_image'])
           .where('item_id',item_id)
           .first()
}

function updateItem(item_id,updatedItem){
    return db('items')
           .returning(['item_id','item_name','item_description','item_cost','item_image'])
           .update({
               item_name:updatedItem.item_name,
               item_description:updatedItem.item_description,
               item_cost:updatedItem.item_cost,
               item_image:updatedItem.item_image,
               item_isRented:updatedItem.item_isRented,
               renter_username:updatedItem.renter_username               
           })
           .where("item_id",item_id)
           .returning(['item_id','item_name','item_description','item_cost','item_image','item_isRented','renter_username'])
}

function removeItem(item_id){
    return db('items')
           .where('item_id',item_id)
           .returning(['item_id','item_name','item_description','item_cost','item_image','item_isRented','renter_username'])
           .del()
}

module.exports={
    addItem,
    findItemsOfOwner,
    findById,
    updateItem,
    removeItem
}