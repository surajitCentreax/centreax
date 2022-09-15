const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const user_router = require('./routes/user-routes')
const emp_router = require('./routes/emp-routes')
const event_router = require('./routes/event-routes')
// const router = require('./routes/user-routes')

        /*------------ Middleware setup -------------*/
app.use(cors());
// middleware - body-perser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// url middlewares
// app.use('/auth', auth_router)
app.get('/', (req, res) => {
    res.send("Hello World :)");
})

app.use('/emp', emp_router)
app.use('/event', event_router)
app.use('/user', user_router)
// app.use('/admin', admin_router)

module.exports = app;