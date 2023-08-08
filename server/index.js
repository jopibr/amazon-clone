const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

const DB = ""

const authRouter = require('./routes/auth')

// MiddleWare
app.use(express.json())
app.use(authRouter)

// DB connection
mongoose.connect(DB).then(() => {
    console.log('DB connected!')
}).catch((e) => {
    console.log(e.message)
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando, porta: ${PORT}`)
})
