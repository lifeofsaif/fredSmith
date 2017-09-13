function start(callback) {
    var notifier = require('mail-notifier');
    var imap = {
        user: "nuhaiscool@gmail.com",
        password: "ayd_J7P}",
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: {
            rejectUnauthorized: false
        }
    };
    var processText = function(text) {
        text = text.split(' ')
        var info = {}
        info.tweet = ""
        for (var i = 0; i < text.length - 1; i++) {
            if (i == 0)
                info.handle = text[i].slice(0, text[i].length - 1)
            else if (i == text.length - 2)
                info.url = text[i]
            else
                info.tweet = info.tweet + text[i] + " "
        }
        return info
    }
    notifier(imap).on('mail', function (mail) {
        if (mail.subject == 'New text message from 40404')
            var contin = true;
        var text = ""
        for (var i = 2; contin == true; i++) {
            var toprint = mail.text.split('\n')[i]
            if (toprint == 'YOUR ACCOUNT <https://www.google.com/voice/> HELP CENTER')
                contin = false;
            else
                text += toprint + " "
        }
        var info = processText(text)
        callback(null, info);
    }).start();
}
module.exports = {
    start: start
}
