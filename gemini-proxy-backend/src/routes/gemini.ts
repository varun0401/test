import express, { Request, Response } from 'express';
import axios from 'axios';
import { GeminiRequest, GeminiResponse } from '../types';

const router = express.Router();

router.post('/', async (req: Request<{}, {}, GeminiRequest>, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    key: 'AIzaSyDSKBupwR_jNNUTFeodQkOl26LlA0gjxcU'
                }
            }
        );

        const generatedContent: GeminiResponse = response.data;
        return res.status(200).json({ content: generatedContent });
    } catch (error) {
        return res.status(500).json({ error: 'Error generating content' });
    }
});

export default router;