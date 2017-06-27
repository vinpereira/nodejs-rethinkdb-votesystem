let express = require('express')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)
let path = require('path')
let bodyParser = require('body-parser')
let config = require('./config')
let model = require('./models/movies')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

let routes = require('./controllers/index')(app)

server.listen(config.port, () => {
    console.log('Server up and listening on port %d', config.port)

    model.setup((data) => {
        if((data.new_val !== null) && (data.old_val !== null)) {
            // like/unlike update
            io.emit('updates', data.new_val)
        } else if ((data.new_val !== null) && (data.old_val === null)) {
            // new movie
            io.emit('movies', data.new_val)
        }
    })
})