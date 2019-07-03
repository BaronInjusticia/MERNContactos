const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../models/User');

//@route     POST api/users
//@desc       Registrar un usuario
//@acesss    Public
router.post(
  '/',
  [
    check('name', 'se necesita nombre')
      .not()
      .isEmpty(),
    check('email', 'un email valido por favor').isEmail(),
    check('password', 'una contraseña con 6 o mas caracteres').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'El usuario ya existe :(' });
      }
      user = new User({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(11);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
