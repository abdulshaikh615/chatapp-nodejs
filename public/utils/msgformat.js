const moment = require('moment');


function msgformat(username, text){
    return {
        username: username,
        text: text,
        time: moment().format('h:mm a')
    }
}

module.exports = msgformat;