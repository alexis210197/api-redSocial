const router = require('express').Router()
const ownerMiddlewere = require('../middlewares/owner.middlewere')

const postServices = require('./posts.services')
const likeServices = require('../likes/likes.services')
const passportJWT = require('../middlewares/auth.middleware')
const commentsServices = require('../comments/comments.services')
const ownerCommPost = require('../middlewares/ownerCommPost.middlewere')

router.route('/')
    .get(postServices.getAllPosts)
    .post(passportJWT.authenticate('jwt', {session: false}), postServices.postNewPost)

router.route('/:id')
    .get(postServices.getPostById)
    .patch(passportJWT.authenticate('jwt', {session: false}), postServices.patchPost)
    .delete(passportJWT.authenticate('jwt', {session: false}), ownerMiddlewere, postServices.deletePost)

router.route('/:id/likes')
    .get(likeServices.getAllLikesByPost)
    .post(passportJWT.authenticate('jwt', {session: false}), likeServices.postLike)

router.route('/:id/comments')
    .get(commentsServices.getAllCommentsByPost)
    .post(passportJWT.authenticate('jwt', {session: false}), commentsServices.postNewComment)


router.route('/:id/comments/:comment_id')
    .get(commentsServices.getCommentById)
    .patch(passportJWT.authenticate('jwt', {session: false}), ownerMiddlewere, commentsServices.patchComments)
    .delete(passportJWT.authenticate('jwt', {session: false}), ownerCommPost, commentsServices.deleteComment)


module.exports = router