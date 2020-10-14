const express = require('express');
const { get } = require('axios');

const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';

const app = express();

app
  .get(/hello/, (req, res) => {
    res.end('Hello world!');
  })
  .get(/users/, async (req, res) => {
    const { data: { users: items } } = await get(URL);
    res.render('list', { title: 'Users List', items })
  })
  .use((req, res) => res
    .status(404)
    .send('Still not here, sorry'))
  .use((e, req, res, next) => {
    res.status(500).end(`Error: ${e}`)
  })
  .set('view engine', 'pug')
  .listen(process.env.PORT || PORT);
