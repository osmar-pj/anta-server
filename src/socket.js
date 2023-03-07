import { Server } from 'socket.io'
import axios from 'axios'

const socket = {}
let io

function connect(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.ORIGIN_URL_CLIENT
        }
    })
    socket.io = io
    let USERS = {}
    io.on('connection', socket => {
        console.log(`${socket.id} connected`)
        USERS[socket.id] = socket
        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`)
            delete USERS[socket.id]
        })
    }) 
    setInterval(async () => {
        try {
            const report = await axios.get(`${process.env.ORIGEN_URL_SERVER}/api/v1/report`)
            io.emit('data', report.data)
        } catch (error) {
            console.error(error)
        }
    }, 300000)

    setInterval(async () => {
        try {
            const position = await axios.get(`${process.env.ORIGEN_URL_SERVER}/api/v1/position`)
            io.emit('position', position.data)
        } catch (error) {
            console.error(error)
        }
    }, 10000)

    setInterval(async () => {
        try {
            const realtime = await axios.get(`${process.env.ORIGEN_URL_SERVER}/api/v1/realtime`)
            io.emit('realtime', realtime)
        } catch (error) {
            console.error(error)
        }
    }, 30000)
}

module.exports = {
    connect,
    socket
}

// PARA LLAMAR AL SOCKET DESDE DONDE SEA DEL BACKEND

/*
    const socket = require($route of socket.js$).socket
    const {socket} = require($route of socket.js$)
    socket.io.emit('data', data)
*/