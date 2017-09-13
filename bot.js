'use strict';
var config = require('./config')
var Twit = require('twit')
var T = new Twit(config)
function tweetIt(status) {
    var tweet = {
        status: status
    }
    T.post('statuses/update', tweet, function (err, data, response) {
        if (err) console.log('something went wrong')
        else console.log('it worked!')
    })
}
var stream = T.stream('user');
stream.on('follow', function (eventMsg) {
    var name = eventMsg.source.name
    var screen_name = eventMsg.source.screen_name
    tweetIt("hi @" + screen_name + "!")
})
var mail = require('./mail')
mail.start(function (err, data) {
    if (err) {
        console.log('error message')
        return 'error message'
    }
    console.log(data)
});
