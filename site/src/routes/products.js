var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

//Requiriendo el controller
var productController = require('../controllers/productController');
// Requiriendo el middleware
const loginMiddleware = require('../middlewares/loginMiddleware');
const authAdmins = require('../middlewares/authAdmins');

//Métodos para guardar imagenes
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})
var upload = multer({ storage: storage })


// GET home page / index
router.get('/', productController.index);

// GET product list
router.get('/products', productController.list)

// GET product detail
router.get('/productDetail/:id', productController.productDetail);

// GET product cart
router.get('/productCart', productController.productCart);

//  GET product add
router.get('/product/create', authAdmins, productController.productAdd);
// POST product add
router.post('/product/add', upload.any(), productController.addingProduct);


// GET product edit
router.get('/product/:id/edit', authAdmins, productController.productEdit);
// PUT product edit
router.put('/product/:id', upload.any(), productController.editingProduct);

//DELETE
router.delete('/product/delete/:id', authAdmins, productController.delete);

// POST buscador
router.post('/product/search', productController.search);


module.exports = router;
