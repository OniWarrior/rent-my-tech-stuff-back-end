const owner = {role_id:1,role_name:'owner'}
const renter = {role_id:2,role_name:'renter'}

exports.seed=function(knex){
    return knex('roles').insert(owner)
    .then(()=>{
        return knex('roles').insert(renter)
    })

}