const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./index');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
