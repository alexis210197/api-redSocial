//? Dependencies
const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')

//? Files
const swaggerDoc = require('../swagger.json')
const config = require('../config')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const postsRouter = require('./posts/posts.router')
const followsRouter = require('./follows/follows.router')

//? Initial Configs

const app = express()
//? Enable incoming JSON data
app.use(express.json())
//? Enable CORS 
app.use(cors())

//? Authenticate DB
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch((err) => console.log(err))
//? Sync DataBase Models
db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

//? Initialize my models relations
initModels()

//? Routes v1
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Ok!',
        routes: {
            user: "/api/v1/users",
            login: "/api/v1/auth/login",
            posts: "/api/v1/post",
            post: "/api/v1/post/:id",
            comments: "/api/v1/post/:id/comments",
            comment: "/api/v1/post/:id/comments/:comment_id",
            likes: "/api/v1/post/:id/likes",
            follow:"/api/v1/users/:id/follow",
            follows: "/api/v1/follows",
            followers: "/api/v1/followers"
        }
    })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post', postsRouter)
app.use('/api/v1', followsRouter)


app.listen(config.api.port, () => {
    console.log(`Server started on ${config.api.host}`)
})
