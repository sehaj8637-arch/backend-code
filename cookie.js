const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/login', (req, res) => {
    res.cookie('username', 'Sehaj', {
        httpOnly: true,
        maxAge: 100 * 40 // 40s
    });
    res.send('Cookie created successfully');
});

app.get('/profile', (req, res) => {
    const username = req.cookies.username;

    if (username) {
        res.send(`
            <h1>Name: ${username}</h1>
        `);
    } else {
        res.send('<h1>Please login</h1>');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});