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
    // keep the differences at the same index as the friend data in friends list
    var unsortedDiffs = calculateDiff(newFriend.scores);
    // returns least value in sorted diffs
    var matchVal = findMatch(unsortedDiffs);
    // index of matchedVal in unsorted friends list
    var matchIndex = unsortedDiffs.indexOf(matchVal);
    // match data
    var match = friends[matchIndex];
    // add new data to friends list -- done last to avoid user matching with his/herself
    friends.push(newFriend);
    // sends the match's data to client
    res.send(match);
})

function calculateDiff (userScores) {
    // takes an array -- current user's scores
    var scoreList = [];
    // iterate through friends list, capture their scores and put into an array
    for (var i=0; i < friends.length; i ++) {
        scoreList.push(friends[i].scores);
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
    
    return differences;
}

// finds friend with most compatibility -- least difference in score
function findMatch (differences) {
    // takes in an array of differences
    // find least value in array and return that value
    var leastDiff;
    for (var i=0; i < differences.length; i++) {
        // if there's no initial value or the current least value is greater than the current value, reassign.
        if (leastDiff > differences[i] || (!leastDiff && i===0)) {
            leastDiff = differences[i];
        }
    }
    return leastDiff;
}

module.exports = router;