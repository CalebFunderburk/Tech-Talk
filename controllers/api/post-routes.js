const router = require('express').Router()
const { Post, User } = require('../../models')
const withAuth = require('../../utils/auth')

// Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'body',
            'user_id',
            'created_at'
        ],
        include: [
            // {
            //     model: Comment,
            //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //     include: {
            //         model: User,
            //         attributes: ['username']
            //     }
            // },
            // {
            //     model: User,
            //     attributes: ['username']
            // }
        ]
    })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Get one post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'body',
            'user_id',
            'created_at'
        ],
        include: [
            // {
            //   model: Comment,
            //   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //   include: {
            //     model: User,
            //     attributes: ['username']
            //   }
            // },
            // {
            //     model: User,
            //     attributes: ['username']
            // }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' })
                return
            }
            res.json(postData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Create a post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id
    })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Update a post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' })
                return
            }
            res.json(postData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Delete a post
router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id)
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' })
                return
            }
            res.json(postData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router