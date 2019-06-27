const express = require('express');
const router = express.Router();

//@route     GET api/contacts
//@desc       Obtener todos los contactos
//@acesss    Private
router.get('/', (req, res) => {
  res.send('Dar todos los contactos');
});

//@route     POST api/contacts
//@desc       Agregar contacto
//@acesss    Private
router.post('/', (req, res) => {
  res.send('Agregar contacto');
});

//@route     PUT api/contacts/:id
//@desc       Actualizar contacto
//@acesss    Private
router.put('/:id', (req, res) => {
  res.send('Actualizar contacto');
});

//@route     DELETE api/contacts/:id
//@desc       Borrar contacto
//@acesss    Private
router.delete('/:id', (req, res) => {
  res.send('Borrar contacto');
});

module.exports = router;
