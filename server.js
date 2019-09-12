const express = require('express');
const app = express();

var port = process.env.PORT || 3000;

app.use('/', express.static('ng-hnefatafl'));

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
