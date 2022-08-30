const express = require('express');
const router = express.Router();

const mysqlConnection = require ('./database.js');

router.get('/documentos/', (req, res) => {
    mysqlConnection.query('SELECT * FROM documentos', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
      
    });  
  });

  router.get('/documentos/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM documentos WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE A HELP
  router.delete('/documentos/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM documentos WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Documento Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT A HELP
  router.post('/documentos/', (req, res) => {
    const {id, nombre, id_user, url} = req.body;
    console.log(id, nombre, id_user, url);
    const query = `
      CALL documentosAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, nombre, id_user, url], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Documento Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/documentos/:id', (req, res) => {
    const { nombre, id_user, url } = req.body;
    const { id } = req.params;
    const query = `
      CALL documentosAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, nombre, id_user, url], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Documento Updated'});
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;