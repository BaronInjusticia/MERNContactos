const express = require('express');
const router = express.Router();

//@route     GET api/users
//@desc       Registrar un usuario
//@acesss    Public
router.get('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
