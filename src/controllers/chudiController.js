const controller2 = {};
controller2.view2 = (req, res) => {
    const customerId = req.query.customerId; 
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        conn.query('SELECT * FROM chudi WHERE customer_id = ?', [customerId], (err, chudis) => {
            if (err) {
                console.error('Error querying: ' + err.stack);
                return;
            }
            res.render('chudi_view', {
                customerId: customerId, 
                data2: chudis[0] 
            });
        });
    });
};
controller2.list2 = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM chudi', (err, chudis) => {
            if (err) {
                res.json(err);
            }
            res.render('chudis', {
                data2: chudis,
                customerId: req.query.customerId
            });
        });
    });
};

controller2.save2 = (req, res) => {
    const newData = req.body;
    const customerId = newData.customer_id;
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error connecting to database');
        }
        connection.query('SELECT * FROM chudi WHERE customer_id = ?', customerId, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error checking customer_id in chudi table');
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
                connection.query('UPDATE chudi SET ? WHERE customer_id = ?', [updatedData, customerId], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error updating data in chudi table');
                    }
                    console.log(result);
                    res.redirect('/customerview');
                });
            } else {
                connection.query('INSERT INTO chudi SET ?', newData, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error inserting data into chudi table');
                    }
                    console.log(result);
                    res.redirect('/customerview');
                });
            }
        });
    });
};

controller2.delete2 = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM chudi WHERE customer_id = ?', [id], (err, rows) => {
            res.redirect('/customerview');
        });
    });
};

module.exports = controller2;
