const router = require('express').Router();

const customerController = require('../controllers/customerController');
const blouseController = require('../controllers/blouseController');
const chudiController = require('../controllers/chudiController');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

router.get('/customerview', customerController.view);
router.get('/customer', customerController.list);
router.post('/add', customerController.save);
router.get('/update/:id', customerController.edit);
router.post('/update/:id', customerController.update);
router.get('/delete/:id', customerController.delete);

router.get('/blouseview', blouseController.view1);
router.get('/blouse', blouseController.list1);
router.post('/add1', blouseController.save1);
router.get('/delete1/:id', blouseController.delete1);

router.get('/chudiview', chudiController.view2);
router.get('/chudi', chudiController.list2);
router.post('/add2', chudiController.save2);
router.get('/delete2/:id', chudiController.delete2);

router.get('/', orderController.renderDashboard);
router.get('/selectuser', orderController.selectuser);
router.get('/orderview', orderController.view4);
router.get('/order', orderController.list4);
router.post('/add4', orderController.save4);
router.get('/update4/:id', orderController.edit4);
router.post('/update4/:id', orderController.update4);
router.get('/delete4/:id', orderController.delete4);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.getLogin);

module.exports = router;
