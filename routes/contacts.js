const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contacts');

//@route     GET api/contacts
//@desc       Obtener todos los contactos
//@acesss    Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});

//@route     POST api/contacts
//@desc       Agregar contacto
//@acesss    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Un nombre es requerido')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(er.message);
      res.status(500).send('Error de Servidor');
    }
  }
);

//@route     PUT api/contacts/:id
//@desc       Actualizar contacto
//@acesss    Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //BUild contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (email) contactFields.email = email;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ msg: 'Contacto no encontrado' });

    //Estar seguro que el usuario es dle contacto
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No estas autorizado carnal :)' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error de Servidor');
  }
});

//@route     DELETE api/contacts/:id
//@desc       Borrar contacto
//@acesss    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ msg: 'Contacto no encontrado' });

    //Estar seguro que el usuario es dle contacto
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No estas autorizado carnal :)' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contacto eliminado' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error de Servidor');
  }
});

module.exports = router;
