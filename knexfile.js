require('dotenv').config()

const pg = require('pg')

if (process.env.DATABASE_URL){
  pg.defaults.ssl={rejectUnauthorized: false}

}

const sharedConfig = {
  client:'pg',
  migrations: {directory:''},
  seeds: {directory:''}
}



module.exports={
  development:{
    ...sharedConfig,
    connection:process.env.DEV_DATABASE_URL
  },

  testing:{
    ...sharedConfig,
    connection:process.env.TESTING_DATABASE_URL
  },

  production:{
    ...sharedConfig,
    connectin:process.env.DATBASE_URL,
    pool:{min:2,max:10}
  }

}