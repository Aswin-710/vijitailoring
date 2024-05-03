const controller1 = {};

controller1.view1 = (req, res) => {
    const customerId = req.query.customerId;
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        conn.query('SELECT * FROM blouse WHERE customer_id = ?', [customerId], (err, blouses) => {
            if (err) {
                console.error('Error querying: ' + err.stack);
                return;
            }
            res.render('blouse_view', {
                customerId: customerId, 
                data1: blouses[0] 
            });
        });
    });
};

controller1.list1 = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM blouse', (err, blouses) => {
            if (err) {
                res.json(err);
            }
            res.render('blouses', {
                data1: blouses,
                customerId: req.query.customerId
            });
        });
    });
};

controller1.save1 = (req, res) => {
    const newData = req.body;
    const customerId = newData.customer_id;
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error connecting to database');
        }
        connection.query('SELECT * FROM blouse WHERE customer_id = ?', customerId, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error checking customer_id in blouse table');
            }
            if (rows.length > 0) {
                const existingData = rows[0];
                const updatedFields = {};
                for (const [key, value] of Object.entries(newData)) {
                    if (value !== '' && key !== 'customer_id') {
                        updatedFields[key] = value;
                    }
                }
                const updatedData = { ...existingData, ...updatedFields };
                connection.query('UPDATE blouse SET ? WHERE customer_id = ?', [updatedData, customerId], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error updating data in blouse table');
                    }
                    console.log(result);
                    res.redirect('/customerview');
                });
            } else {
                connection.query('INSERT INTO blouse SET ?', newData, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error inserting data into blouse table');
                    }
                    console.log(result);
                    res.redirect('/customerview');
                });
            }
        });
    });
};

controller1.delete1 = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM blouse WHERE customer_id = ?', [id], (err, rows) => {
            res.redirect('/customerview');
        });
    });
};

module.exports = controller1;