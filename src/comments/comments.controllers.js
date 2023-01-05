const uuid = require('uuid')
const Post = require('../models/posts.models')
const Comments = require('../models/comments.models')

const findAllCommentsFromPost = async(postId) =>{
    const data = await Comments.findAll({
        where:{
            postId:postId
        }
    })
    return data
}

const findCommentsById = async(id) => {
    const data = await Comments.findOne({
        where: {
            id: id
        },
        include: {
            model: Post
        }
    })
    return data
}

const createComment = async(obj)=>{

    const data = await Comments.create({
        id:uuid.v4(),
        userId:obj.userId,
        postId:obj.postId,
        content: obj.content
    })
    return data
}

const deleteComment = async (id) => {
    const data = await Comments.destroy({
        where: {
            id: id
        }
    })
    return data
}

const updateComment = async(id, obj) => {
    const data = await Comments.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

module.exports = {
    findAllCommentsFromPost,
    findCommentsById,
    createComment,
    deleteComment,
    updateComment
}