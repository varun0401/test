import express from 'express';
import bodyParser from 'body-parser';
import geminiRouter from './routes/gemini';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/ask-gemini', geminiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});