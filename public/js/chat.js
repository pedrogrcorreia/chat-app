const socket = io()

const form = document.querySelector('form')
const message = document.querySelector('input')

socket.on('message', (text) => {
    console.log(text)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message

    socket.emit('sendMessage', message)
})