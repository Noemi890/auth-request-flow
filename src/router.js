const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    const { username, profile, password} = req.body

    const checkUsername = username === mockUser.username
    const checkPassword = password === mockUser.password
    try {
    if (!checkPassword || !checkUsername) throw 'username/password not correct'
    const userEncoded = jwt.sign({ username, password, profile}, 'mysecretkey')
    res.json(userEncoded)
    }
    catch (e) {
        res.json(e)
    }

});

router.get('/profile', (req, res) => {
  const authorization = req.get('authorization')
  try {
    const user = jwt.verify(authorization, 'mysecretkey')
    res.json(user)
  } catch (e) {
    res.json( e.message )
  }
});


module.exports = router;
