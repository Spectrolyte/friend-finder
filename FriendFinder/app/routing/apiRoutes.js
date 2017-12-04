// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results.
    // This route will also be used to handle the compatibility logic.

var express = require('express')
var router = express.Router();
var friends = require('./../data/friends.js');

router.get('/api/friends', function (req, res) {
    res.json(friends);
    console.log(router);
});

router.post('/api/friends', function (req, res) {
    var newFriend = req.body;
    // convert scores to integers
    for (var i = 0; i < newFriend.scores.length; i++) {
        newFriend.scores[i] = parseInt(newFriend.scores[i]);
    }
    // add new data to friends list
    friends.push(newFriend);
    res.end();
})

module.exports = router;