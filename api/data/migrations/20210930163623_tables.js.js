
exports.up = function(knex) {
    return knex.schema
    .createTable('owners',owners=>{
        owners.increments('owner_id')
        owners.string('owner_username').notNullable().unique()

    })
    .createTable('renters',renters=>{
        renters.increments('renter_id')
        renters.string('renter_username').unique()

    })
    .createTable('roles',roles=>{
        roles.increments('role_id')
        roles.string('role_name',32).notNullable().unique()
    })
    .createTable('users',users=>{
        users.increments('user_id')
        users.string('username',128).notNullable().unique()
        users.string('password',128).notNullable()
        users.string('role_name')
         .references('role_name')
         .inTable('roles')
         .onUpdate('CASCADE')
         .onDelete('CASCADE')
    })
    .createTable('items',items=>{
        items.increments('item_id')
        items.string('item_name').notNullable().unique()
        items.string('item_description',1000)
        items.decimal('item_cost',10,2).notNullable()
        items.string('item_image')
        items.bool('item_isRented').default(0)
        items.string('owner_username')
         .references('owner_username')
         .inTable('owners')
         .onUpdate('CASCADE')
         .onDelete('CASCADE')
        items.string('renter_username')
         .references('renter_username')
         .inTable('renters')
         .onUpdate('CASCADE')
         .onDelete('CASCADE')

    })


  
};

exports.down = function(knex) {
    return knex.schema
     .dropTableIfExists('items')
     .dropTableIfExists('users')
     .dropTableIfExists('roles')
     .dropTableIfExists('renters')
     .dropTableIfExists('owners')
  
};
