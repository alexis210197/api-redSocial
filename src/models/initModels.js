const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Posts = require('./posts.models')
const Likes = require('./likes.models')
const Comments = require('./comments.models')
const Follows = require('./follow.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //? Users - Posts
    Users.hasMany(Posts)
    Posts.belongsTo(Users)

    //? Users - Likes
    Users.hasMany(Likes)
    Likes.belongsTo(Users)

    //? Posts - Likes 
    Posts.hasMany(Likes)
    Likes.belongsTo(Posts)

    //? Post - Comments
    Posts.hasMany(Comments)
    Comments.belongsTo(Posts)

    //? Users - Comments
    Users.hasMany(Comments)
    Comments.belongsTo(Users)

    //? Users - Follows
    Users.hasMany(Follows)
    Follows.belongsTo(Users, {
        as: "following",
        foreingKey: "userId2"
    })

    Follows.belongsTo(Users, {
        as: 'followers',
        foreingKey:'userId'
    })
}

module.exports = initModels