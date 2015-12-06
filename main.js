var express = require('express'),
  path = require('path'),
  app = express();

app.use(express.static(path.resolve('www')));
app.get('/', function(req, res) {
  res.sendFile(path.resolve('www/index.html'));
});

app.listen(process.env.PORT || 3000);
