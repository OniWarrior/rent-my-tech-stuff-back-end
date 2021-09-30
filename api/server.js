const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const {restricted} = require('./auth/auth-middleware')

const authRouter = require('./auth/auth-router')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use('/api/auth',authRouter)

module.exports=server