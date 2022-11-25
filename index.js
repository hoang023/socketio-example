const { Socket } = require('dgram')
const express = require('express') // Apply thư viện 
const app = express() // Tạo một server

const http = require('http') // Tạo http server

const server = http.createServer(app) //Để cái app vào http server 
const { Server } = require('socket.io') // Gọi thư viện Socket.io
const io = new Server(server) // Khai báo như 1 websocket instance trên server

// Khi người dùng truy cập vào thì trả về file html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Hàm lắng nghe phía người dùng. Khi người dùng khởi tạo một socket đến server thì hay hàm trong hàm
io.on('connection', (socket) => {
    console.log('USER CONNECTED')
    // Server nhận được socket, thực hiện hàm trong on()
    socket.on('on-chat', data => {
        console.log({ data })
        // Hàm emit gửi gói tin đến toàn bộ User có kết nối với Server
        io.emit('chat-channel', data)
    })
})

// Xem server đã được tạo hay chưa
server.listen(3000, () => {
    console.log(
        'listening on port 3000'
    )
})