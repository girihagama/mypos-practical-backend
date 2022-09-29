const express = require('express');
const router = express.Router();
const db = require('../config/database');

// route 'api/*'
router.use((req, res, next) => {
  next();
})

//Products API Endpoints
router.post('/product/create', (req, res) => {
  var data = req.body;

  var query = `INSERT INTO products (Products_id, Products_Name, Products_price, Products_qty) VALUES ('${data.Products_id}', '${data.Products_Name}', '${data.Products_price}', '${data.Products_qty}')`;
  db.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({
        action: 0,
        mesage: error.sqlMessage
      });
    } else {
      res.json({
        action: 1,
        message: 'Success'
      });
    };
  });
});

router.get('/product/read', (req, res) => {
  var query = 'Select * from products';
  db.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.post('/product/update', (req, res) => {
  var data = req.body;

  var query = `UPDATE products SET Products_id='${data.Products_id}', Products_Name='${data.Products_Name}', Products_price='${data.Products_price}', Products_qty='${data.Products_qty}' WHERE Products_id='${data.Products_id}'`;
  db.query(query, function (error, results, fields) {
    if (error) {
      res.json({
        action: 0,
        mesage: error.sqlMessage
      });
    } else if (results.changedRows == 0) {
      res.json({
        action: 0,
        message: "No updates were made"
      });
    } else if (results.changedRows > 0) {
      res.json({
        action: 1,
        message: "Updated"
      });
    };
  });
});

//Invoice API Endpoints
router.post('/invoiceHed/create', (req, res) => {
  var data = req.body;

  var query = `INSERT INTO invoice_hed (Invoice_Hed_id, Invoice_Hed_customer) VALUES ('${data.Invoice_Hed_id}', '${data.Invoice_Hed_customer}')`;
  db.query(query, function (error, results, fields) {
    if (error) {
      res.json({
        action: 0,
        message: error.sqlMessage
      })
    } else {
      res.json({
        action: 1,
        mesage: "Success"
      })
    }
  });
});

router.get('/invoiceHed/read', (req, res) => {
  var query = 'Select * from invoice_hed';
  db.query(query, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

router.post('/invoiceDetail/create', (req, res) => {
  var data = req.body;

  var query = `INSERT INTO invoice_details (Invoice_Details_qty, Invoice_Details_Amount, Invoice_Hed_Invoice_Hed_id, Products_Products_id) VALUES ('${data.Invoice_Details_qty}', '${data.Invoice_Details_Amount}', '${data.Invoice_Hed_Invoice_Hed_id}', '${data.Products_Products_id}')`;
  db.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({
        action: 0,
        message: error.sqlMessage
      })
    } else {
      res.json({
        action: 1,
        mesage: "Success"
      })
    }
  });
});

router.post('/invoiceDetail/delete', (req, res) => {
  var data = req.body;

  var query = `DELETE FROM invoice_details WHERE Invoice_Details_Id = '${data.Invoice_Details_Id}'`;
  db.query(query, function (error, results, fields) {
    console.log(results);
    if (error) {
      res.json({
        action: 0,
        mesage: error.sqlMessage
      });
    } else if (results.affectedRows == 0) {
      res.json({
        action: 0,
        message: "No deletions were made"
      });
    } else if (results.affectedRows > 0) {
      res.json({
        action: 1,
        message: "Deleted"
      });
    };
  });
});

module.exports = router;