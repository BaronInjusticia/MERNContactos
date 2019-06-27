const express = require('express');

const app = express();

app.get('/', (req, res) =>
  res.json({ msg: 'Bievenido a la APP de contactos' })
);
//Definir rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`ESTA VIVO!!! en el puerto ... ${PORT}`));
