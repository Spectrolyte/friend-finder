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
    // find best match
    calculateDiff([4,2,1,1,1,1,1,1,1,1], friends);
    findMatch([34,56,23,80]);
    // add new data to friends list
    friends.push(newFriend);
    res.end();
})

function calculateDiff (userScores, friendsData) {
    // takes in two arrays -- current user's scores and the current friends list
    var scoreList = [];
    // iterate through friends list, capture their scores and put into an array
    for (var i=0; i < friendsData.length; i ++) {
        scoreList.push(friendsData[i].scores);
    }

    // difference scores stores here
    var differences = [];

    for (var i=0; i < scoreList.length; i++) {
        // current friend being compared
        var friendScores = scoreList[i];
        // total diff is the amount of differences accumulated between current friend and current user
        var totalDiff = 0;
        // calculate difference between each question -- nested
        for (var j=0; j < userScores.length; j++) {
            var diff = userScores[j] - friendScores[j];
            // accounts for negative differences
            diff = Math.abs(diff);
            totalDiff += diff;
        }
        differences.push(totalDiff);
    }
    

    console.log('diffs: ' + differences);
}

// finds friend with most compatibility -- least difference in score
function findMatch (differences) {
    // takes in an array populated with the differences between the current user and potential matches
    // find the least value and return that person's info
    differences.sort(function compareNumbers(a, b) {
        return a - b;
    })
    
}

module.exports = router;