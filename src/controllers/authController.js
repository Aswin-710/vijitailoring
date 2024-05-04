const controller3 = {};
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt

controller3.postRegister = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username already exists
    req.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            // If username already exists, return an error
            if (results.length > 0) {
                console.log('Username already exists');
                return res.status(409).send('Username already exists');
            }

            // If username is unique, proceed with registration
            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }

                    // Registration successful
                    res.redirect('/login');
                });
            });
        });
    });
};
controller3.getRegister = (req, res) => {
    res.render('register');
};

controller3.getLogin = (req, res) => {
    res.render('login');
};

// controller3.postLogin function
controller3.postLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Convert to string if they're not already strings
    if (typeof username !== 'string') {
        username = String(username);
    }

    if (typeof password !== 'string') {
        password = String(password);
    }

    req.getConnection((err, connection) => {
        if (err) {
            console.log('Database connection error:', err);
            return res.sendStatus(500);
        }

        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                console.log('Database query error:', err);
                return res.sendStatus(500);
            }

            if (results.length === 0) {
                // User not found
                console.log('User not found');
                return res.sendStatus(404);
            }
            const hashedPasswordFromDB = results[0].password;

            // Ensure both password and hashed password are strings
            if (typeof password !== 'string' || typeof hashedPasswordFromDB !== 'string') {
                console.log('Invalid password or hashed password format');
                return res.sendStatus(500);
            }

            // Compare the hashed password
            bcrypt.compare(password, hashedPasswordFromDB, (bcryptErr, bcryptResult) => {
                if (bcryptErr) {
                    console.log('Bcrypt error:', bcryptErr);
                    return res.sendStatus(500);
                }

                if (!bcryptResult) {
                    // Incorrect password
                    console.log('Incorrect password');
                    return res.sendStatus(401);
                }

                // Login successful
                console.log('Login successful');
                req.session.user = results[0];
                res.redirect('/dashboard');
            });
        });
    });

};

// Logout controller function
controller3.logout = (req, res) => {
    // Destroy session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.sendStatus(500);
        }
        res.redirect('/');
    });
};


module.exports = controller3;
