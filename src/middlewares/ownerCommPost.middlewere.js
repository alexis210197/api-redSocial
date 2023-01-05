const {findCommentsById} = require('../comments/comments.controllers')

const ownerCommPost = (req,res,next)=>{
    const commentId = req.params.comment_id
    const userId = req.user.id
    findCommentsById(commentId)
    .then(data=>{
        if (data.userId == userId || data.post.userId == userId) { //? si el id del que esta logueado es igual al id del que creo el post se puede borrar || si el id del que creo el post  == al id del que esta logueado se puede borrar
            next()
        }else{
            res.status(400).json({message: 'you are not allowed to perform this action'})
        }
    })
    .catch(err=> res.status(400).json({message: err.message}))
}

module.exports = ownerCommPost