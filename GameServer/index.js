const dgram = require('dgram')

const receiveingSocket = dgram.createSocket('udp4')

receiveingSocket.on('error', (err) => {
    console.log(`server error:\n${err.stack}`)
    receiveingSocket.close()
})

receiveingSocket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)

    // send data to localhost:45999
    const message = Buffer.from(msg)
    const sendingSocket = dgram.createSocket('udp4')
    sendingSocket.send(message, 45998, 'localhost', (err) => {
        if (err) throw err
        console.log('sent! ')
        sendingSocket.close()
    })
    const sendingSocket2 = dgram.createSocket('udp4')
    sendingSocket2.send(message, 45999, 'localhost', (err) => {
        if (err) throw err
        console.log('sent! ')
        sendingSocket2.close()
    })
})

receiveingSocket.on('listening', () => {
    var address = receiveingSocket.address()
    console.log(`server listening ${address.address}:${address.port}`)
})

receiveingSocket.bind(20547)
