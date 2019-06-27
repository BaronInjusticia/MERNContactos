const express = require('express');
const router = express.Router();

//@route     GET api/auth
//@desc       EL usuario inicia sesion
//@acesss    Private
router.get('/', (req, res) => {
  res.send('Iniciar sesion');
});

//@route     POST api/auth
//@desc       EL usuario inicia sesion obtener token
//@acesss    Public
router.post('/', (req, res) => {
  res.send('Loginear');
});

module.exports = router;
