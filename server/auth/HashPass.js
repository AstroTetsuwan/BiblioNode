var crypto = require('crypto');

var HashPass = {

    getHash: function(password){
        const hash = crypto.createHmac('sha256', password)
                           .update('I love U')
                           .digest('hex');

        return hash;
    }

}

module.exports = HashPass;