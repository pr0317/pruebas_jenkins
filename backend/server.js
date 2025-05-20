const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;
const DATA_FILE = 'notas.json';

app.use(cors());
app.use(express.json());

// Obtener notas
app.get('/notas', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error leyendo las notas');
    res.json(JSON.parse(data || '[]'));
  });
});

// Agregar nota
app.post('/notas', (req, res) => {
  const nuevaNota = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    const notas = err ? [] : JSON.parse(data || '[]');
    notas.push(nuevaNota);
    fs.writeFile(DATA_FILE, JSON.stringify(notas, null, 2), err => {
      if (err) return res.status(500).send('Error guardando nota');
      res.status(201).send('Nota guardada');
    });
  });
});

// Eliminar nota por índice
app.delete('/notas/:index', (req, res) => {
  const index = parseInt(req.params.index);
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error leyendo notas');
    let notas = JSON.parse(data || '[]');
    if (index >= 0 && index < notas.length) {
      notas.splice(index, 1);
      fs.writeFile(DATA_FILE, JSON.stringify(notas, null, 2), err => {
        if (err) return res.status(500).send('Error eliminando nota');
        res.sendStatus(200);
      });
    } else {
      res.status(404).send('Nota no encontrada');
    }
  });
});

app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
