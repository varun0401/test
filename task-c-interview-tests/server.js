require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const supabase = require('./lib/supabaseClient');
const validateInterviewTest = require('./utils/validation');

const app = express();
app.use(bodyParser.json());

app.get('/interview-tests', async (req, res) => {
  const { field_3 } = req.query;
  let query = supabase.from('Interview_Tests').select('*');

  if (field_3 !== undefined) query = query.eq('field_3', field_3 === 'true');

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

app.get('/interview-tests/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('Interview_Tests').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'Not Found' });
  res.status(200).json(data);
});

app.post('/interview-tests', async (req, res) => {
  const body = req.body;
  const errors = validateInterviewTest(body);
  if (errors.length) return res.status(400).json({ errors });

  const { data, error } = await supabase.from('Interview_Tests').insert([body]).select();
  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data[0]);
});

app.put('/interview-tests/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const errors = validateInterviewTest(body);
  if (errors.length) return res.status(400).json({ errors });

  const { data, error } = await supabase.from('Interview_Tests').update(body).eq('id', id).select();
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data[0]);
});

app.delete('/interview-tests/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('Interview_Tests').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
