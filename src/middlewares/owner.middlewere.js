const {findCommentsById} = require('../comments/comments.controllers')

const ownerValidate = (req,res,next)=>{
    const commentId = req.params.id
    const userId = req.user.id
    findCommentsById(commentId)
    .then(data=>{
        if (data.userId == userId ) {
            next()
        }else{
            res.status(400).json({message: 'you are not allowed to perform this action'})
        }
    })
    .catch(err=> res.status(400).json({message: err.message}))
}

module.exports = ownerValidate