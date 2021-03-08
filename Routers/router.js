const express = require('express');
const router = express.Router();
const posts = require('../Posts');
const uuid = require('uuid')
const { parse } = require('handlebars');

// Read all posts 
router.get('/', (req,res)=> {
    res.json({posts});
})

// Find a single post
router.get('/:id', (req,res) => {
    // May be can change some to find array method 
    const isExist = posts.some(post=> post.id === req.params.id);
    if(isExist){
        const match = posts.filter(post=> post.id === req.params.id);
        res.json(match);
    }else{
        res.status(400).json({msg: `None of postings were found by given ID ${req.params.id}`});
    }
})

//Create a post 
router.post('/', (req,res) => {
    if(!req.body.title || !req.body.content){
        res.status(400).json(`Please include both title and content of your post`)
    }else{
         const newPost = {id:`${uuid.v4()}` , title:req.body.title , author:req.body.author , content:req.body.content , postdate:new Date()};
         posts.push(newPost);
         res.json({posts});
    }
}) 

// Update posts
router.put('/:id', (req,res)=> {
    const isExist = posts.some(post=> post.id === req.params.id);
    if(isExist){
        const updPost = req.body;
        posts.filter((post) => {
            if(post.id === req.params.id){
                post.title = updPost.title ? updPost.title : post.title  
                post.author = updPost.author ? updPost.author : post.author
                post.content = updPost.content? updPost.content : post.content  

                res.json(post)
            }
        })
    }else{
        res.status(400).json({msg: `None of postings were found by given ID ${req.params.id}`});
    }
})

// Delete a post 
router.delete('/:id', (req,res) => {
    const isExist = posts.some(post=> post.id === req.params.id)

    if(isExist){
        const unmatch = posts.filter(post=> post.id !== req.params.id);
        res.json({msg: `ID ${req.params.id} is deleted`, unmatch});
    }
    res.status(400).json({msg: `None of postings were found by given ID ${req.params.id}`});
});


module.exports = router;