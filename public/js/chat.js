const socket = io()

const form = document.querySelector('form')
const message = document.querySelector('input')

socket.on('message', (text) => {
    console.log(text)
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('sendMessage', message.value.toString())
})