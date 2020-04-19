const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/article');
const Quest = require('../models/discussion');
const Article = require('../models/article');
const Discussion = require('../models/discussion');
const db = 'mongodb://tanzeel_123:mydbpass@cluster0-shard-00-00-znt38.mongodb.net:27017,cluster0-shard-00-01-znt38.mongodb.net:27017,cluster0-shard-00-02-znt38.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
const jwt = require('jsonwebtoken');

mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false }, err => {
    if (err) {
        console.log('Error: ' + err);
    } else {
        console.log('Successfully connected to mongodb');
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payLoad = { subject: user._id };
                let token = jwt.sign(payLoad, 'secretKey');
                res.status(200).send({ token, userData, user });
            }
        }
    })
})

router.get('/fetchback/:id', (req, res) => {
    let articleId = req.params.id;
    Article.findOne({ articleid: articleId }, (error, article) => {
        if (error) {
            console.log(error)
        } else {
            if (!article) {
                res.status(401).send('something went wrong')
            } else {
                res.json(article);
            }
        }
    })
})

router.put('/update-article', (req, res) => {
    let articleData = req.body;
    let articleId = req.body.articleid;
    Article.findOneAndUpdate({ articleid: articleId }, { title: articleData.title, content: articleData.content }, useFindAndModify = false, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            console.log("successfully updated");
            res.status(200).send(true);
        }
    })
})

router.put('/update-upvotes/:id', (req, res) => {
    let upvoterId = req.params.id;
    let articleData = req.body;
    let articleId = req.body.articleid;
    Article.update({ articleid: articleId }, { $pull: { downvoters: upvoterId } }).then(opResult => console.log(opResult));
    Article.findOneAndUpdate({ articleid: articleId }, { upvotes: articleData.upvotes, upvoters: articleData.upvoters }, useFindAndModify = false, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            console.log("successfully updated");
            res.status(200).send(true);
        }
    })
})

router.put('/update-downvotes/:id', (req, res) => {
    let downvoterId = req.params.id;
    let articleData = req.body;
    let articleId = req.body.articleid;
    Article.update({ articleid: articleId }, { $pull: { upvoters: downvoterId } }).then(opResult => console.log(opResult));
    Article.findOneAndUpdate({ articleid: '5p4aqbryi' }, { downvotes: articleData.downvotes, downvoters: articleData.downvoters }, useFindAndModify = false, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            console.log("successfully updated");
            res.status(200).send(true);
        }
    })
})


router.get('/myarticles/:person', (req, res) => {
    let person = req.params.person;
    console.log(person);
    console.log('Get request for ' + person + ' articles');
    Article.find({ contributor: person }, (error, article) => {
        if (error) {
            console.log(error)
        } else {
            if (!article) {
                res.status(401).send('Invalid email')
            } else if (2 > 4) {
                console.log("test passed");
            } else {
                res.json(article);
            }
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    let articleId = req.params.id;
    console.log("to be dleted " + articleId);
    Article.deleteOne({ articleid: articleId }, (error, article) => {
        if (error) {
            console.log(error)
        } else {
            if (!article) {
                res.status(401).send('something went wrong')
            } else {
                console.log('successfully deleted');
            }
        }
    })
})


router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            let payLoad = { subject: registeredUser._id };
            let token = jwt.sign(payLoad, 'secretKey');
            res.status(200).send({ token });
        }
    })
})

router.post('/contribute', (req, res) => {
    console.log('Pushing new article');
    let userPost = req.body;
    let post = new Post(userPost);
    post.save((error, registeredPost) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(registeredPost);
        }
    })
})

router.post('/ask', (req, res) => {
    let userQuest = req.body;
    let post = new Quest(userQuest);
    post.save((error, registeredQuest) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(registeredQuest);
        }
    })
})

router.get('/articles', function(req, res) {
    console.log('Get request for all articles');
    Article.find({})
        .exec(function(err, article) {
            if (err) {
                console.log("Error retrieving articles");
            } else {
                res.json(article);
            }
        });
});

router.get('/discussions', function(req, res) {
    console.log('Get request for all discussions');
    Discussion.find({})
        .exec(function(err, discussion) {
            if (err) {
                console.log("Error retrieving discussions");
            } else {
                res.json(discussion);
            }
        });
});

module.exports = router;