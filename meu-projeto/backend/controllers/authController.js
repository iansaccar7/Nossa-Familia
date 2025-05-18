const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config');

// Função de registro
const register = (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });

        db.query('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    });
};

// Função de login
const login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });

        bcrypt.compare(password, result[0].password_hash, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err });
            if (!isMatch) return res.status(401).json({ message: 'Senha incorreta' });

            const token = jwt.sign({ id: result[0].id, email: result[0].email }, 'secrect_key', { expiresIn: '1h' });
            res.json({ message: 'Login realizado com sucesso!', token });
        });
    });
};

module.exports = { register, login };
