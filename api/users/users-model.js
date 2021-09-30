const db = require('../data/dbConfig')

async function findByToken(token){
    const user = await db('users as u')
                  .returning(['u.user_id','u.username','u.password','u.role_name'])
                  .where('u.password',token)
                  .first()
    return user
}

function addOwner(username){
    return db('owners')
    .returning(['owner_id','owner_username'])
    .insert(username)


}

function addRenter(username){
    return db('renters')
    .returning(['renter_id','renter_username'])
    .insert(username)
}

async function findById(user_id){
    const user = await db('users')
                 .returning(['users.user_id','users.username','users.password','users.role_name'])
                 .where('users.user_id',user_id)
                 .first()
    return user
}

async function findByUsername(username){
    const user = await db('users')
                 .returning(['users.username','users.password','users.role_name'])
                 .where('users.username',username)
                 .first()
    return user
}

function add(user){
    return db('users')
           .returning(['username','password','role_name'])
           .insert(user)
}

module.exports={
    findByToken,
    addOwner,
    addRenter,
    findById,
    findByUsername,
    add
}