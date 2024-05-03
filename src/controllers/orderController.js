const controller4 = {};

controller4.renderDashboard = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        conn.query(`
            SELECT dressbooking.*, Customers.name AS customer_name
            FROM dressbooking
            INNER JOIN Customers ON dressbooking.customer_id = Customers.customer_id
        `, (err, orders) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
                return;
            }
            res.render('dashboard', {
                data: orders
            });
        });
    });
};

controller4.view4 = (req, res) => {
    const orderId = req.query.orderId; 
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        conn.query(`
            SELECT dressbooking.*, Customers.name AS customer_name, Customers.address, Customers.phone
            FROM dressbooking
            INNER JOIN Customers ON dressbooking.customer_id = Customers.customer_id
            WHERE dressbooking.order_id = ?
        `, [orderId], (err, orders) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
                return;
            }
            const data = orders.length ? [orders[0]] : null;
            const customerId = orders.length ? orders[0].customer_id : null;
            res.render('order_view', {
                data: data,
                orderId: orderId,
                customerId: customerId 
            });
        });
    });
};


controller4.selectuser = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
            return;
        }
        const customerId = req.query.customeId;
        conn.query(`SELECT * FROM Customers`, (err, customers) => {
            if (err) {
                res.json(err);
                return;
            }
            res.render('select_user', {
                data: customers,
                customeId: customerId
            });
        });
    });
};

controller4.list4 = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json(err);
            return;
        }
        conn.query('SELECT * FROM dressbooking', (err, orders) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
                return;
            }
            res.render('orders', {
                data4: orders,
                customerId: req.query.customerId
            });
        });
    });
};

controller4.save4 = (req, res) => {
    const data4 = req.body;
    console.log(req.body);
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error connecting to database');
            return;
        }
        connection.query('INSERT INTO dressbooking SET ?', data4, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error inserting data into DressBooking');
                return;
            }
            console.log(result);
            res.redirect('/');
        });
    });
};

controller4.edit4 = (req, res) => {
    const orderId = req.params.id;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error connecting to database');
            return;
        }
        conn.query("SELECT * FROM dressbooking WHERE order_id = ?", [orderId], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data from database');
                return;
            }
            res.render('order_edit', {
                data: { id: orderId },
                data4: rows[0], 
            });
        });
    });
};


controller4.update4 = (req, res) => {
    const { id } = req.params;
    const newOrder = req.body;
    console.log("Updating order with ID:", id);
    console.log("New order data:", newOrder);
    req.getConnection((err, conn) => {
        if (err) {
            console.error("Error establishing database connection:", err);
            res.status(500).send('Error connecting to database');
            return;
        }
        const sql = 'UPDATE dressbooking SET ? WHERE order_id = ?';
        conn.query(sql, [newOrder, id], (err, result) => {
            if (err) {
                console.error("Error updating DressBooking:", err);
                res.status(500).send('Error updating data in database');
                return;
            }
            console.log("Update successful:", result);
            res.redirect('/');
        });
    });
};

controller4.delete4 = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error connecting to database');
            return;
        }
        connection.query('DELETE FROM dressbooking WHERE order_id = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error deleting data from database');
                return;
            }
            console.log('Deleted records for Order ID:', id);
            res.redirect('/');
        });
    });
};

module.exports = controller4;
