const controller = {};

const tableName = 'customers';

controller.view = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM ${tableName}`, (err, customers) => {
            if (err) {
                res.json(err);
                return;
            }
            res.render('customer_view', {
                data: customers
            });
        });
    });
};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM ${tableName}`, (err, customers) => {
            if (err) {
                res.json(err);
                return;
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    const phoneNumber = data.phone;
    req.getConnection((err, connection) => {
        if (err) {
            res.json(err);
            return;
        }
        connection.query('SELECT * FROM Customers WHERE phone = ?', [phoneNumber], (err, results) => {
            if (err) {
                res.json(err);
                return;
            }
            if (results.length > 0) {
                res.status(400).send('Phone number already exists');
                return;
            }
            connection.query(`INSERT INTO ${tableName} SET ?`, data, (err, customer) => {
                if (err) {
                    res.json(err);
                    return;
                }
                res.redirect('/customerview');
            });
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from database');
            return;
        }
        conn.query(`SELECT * FROM ${tableName} WHERE customer_id = ?`, [id], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data from database');
                return;
            }
            if (rows.length === 0) {
                res.status(404).send('Customer not found');
                return;
            }
            const customer = rows[0]; 
            res.render('customers_edit', {
                customer: customer 
            });
        });
    });
};




controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        conn.query(`UPDATE ${tableName} SET ? WHERE customer_id = ?`, [newCustomer, id], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
                return;
            }
            res.redirect('/');
        });
    });
};


controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) {
            return res.json(err);
        }
        deleteRelatedRows(connection, 'dressbooking', id)
            .then(() => deleteRelatedRows(connection, 'blouse', id))
            .then(() => deleteRelatedRows(connection, 'chudi', id))
            .then(() => deleteCustomer(connection, id))
            .then(() => res.redirect('/customerview'))
            .catch(err => res.json(err));
    });
};
function deleteRelatedRows(connection, tableName, id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${tableName} WHERE customer_id = ?`, [id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
function deleteCustomer(connection, id) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM Customers WHERE customer_id = ?', [id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}


module.exports = controller;
