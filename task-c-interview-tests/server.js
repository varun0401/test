require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const supabase = require('./lib/supabaseClient');
const validateInterviewTest = require('./utils/validation');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET all (optional filter by field_3)
app.get('/interview-tests', async (req, res) => {
  const { field_3 } = req.query;
  let query = supabase.from('Interview_Tests').select('*');

  if (field_3 !== undefined) query = query.eq('field_3', field_3 === 'true');

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

// GET by id
app.get('/interview-tests/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('Interview_Tests').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'Not Found' });
  res.status(200).json(data);
});

// CREATE
app.post('/interview-tests', async (req, res) => {
  const body = req.body;
  const errors = validateInterviewTest(body);
  if (errors.length) return res.status(400).json({ errors });

  const { data, error } = await supabase.from('Interview_Tests').insert([body]).select();
  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data[0]);
});

// UPDATE
app.put('/interview-tests/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const errors = validateInterviewTest(body);
  if (errors.length) return res.status(400).json({ errors });

  const { data, error } = await supabase.from('Interview_Tests').update(body).eq('id', id).select();
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data[0]);
});

// DELETE
app.delete('/interview-tests/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('Interview_Tests').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
