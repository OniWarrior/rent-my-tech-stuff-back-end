const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const {restricted} = require('./auth/auth-middleware')

const authRouter = require('./auth/auth-router')
const ownerRouter = require('./owners/owner-router')
const renterRouter = require('./renters/renter-router')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use('/api/auth',authRouter)
server.use('/api/owner',ownerRouter,restricted)
server.use('/api/renter',renterRouter,restricted)

module.exports=server