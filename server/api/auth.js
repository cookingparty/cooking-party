const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware');
const path = require('path')
const jwt = require('jsonwebtoken');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

// prefix is /api/auth
app.get('/', async(req, res, next)=> {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  }
  catch(ex){
    next(ex);
  }
});


app.post('/register', async(req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user); 
  }
  catch(ex){
    next(ex);
  }
});

app.put('/', isLoggedIn, async(req, res, next)=> {
  try {
    const user = req.user;
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/:token', async(req, res, next)=> {
  try{
    const user = await User.findByToken(req.params.token);
    await user.update(req.body);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/facebook', async(req, res, next)=> {
  try{
    const { token } = await User.authenticateFacebook(req.query.code);
    res.send(`
      <script>
        window.localStorage.setItem('token', '${ token }');
        window.location = '/';
      </script>
    `);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/:token', async(req, res, next)=> {
  try{
    res.send(await User.findByToken(req.params.token));
  }
  catch(ex){
    next(ex);
  }
});
