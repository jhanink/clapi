var express = require('express');
var router = express.Router();

/* test */
router.get('/hello', function(req, res) {
  res.send("hello")
});


module.exports = router;