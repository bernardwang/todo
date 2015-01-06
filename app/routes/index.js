///// frontend routes /////
var path = require('path');

module.exports = function(app) {
    app.get('*', function(req, res) {
        res.sendfile(path.resolve('./public/index.html'));
    });
}
