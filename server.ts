import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { evaluateWithLlmJudge, generateWithGemini } from './src/server/geminiHandler.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API endpoints
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
    version: '1.0.0-cranium-core'
  });
});

app.post('/api/judge', async (req: Request, res: Response) => {
  try {
    const result = await evaluateWithLlmJudge(req.body);
    res.json(result);
  } catch (err: any) {
    console.error('Judge route error:', err);
    res.status(500).json({ error: err.message || 'Error evaluating contradiction' });
  }
});

app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const result = await generateWithGemini(req.body);
    res.json(result);
  } catch (err: any) {
    console.error('Generate route error:', err);
    res.status(500).json({ error: err.message || 'Error generating content' });
  }
});

// Serve static assets in production
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cranium Core Substrate Server running on http://0.0.0.0:${PORT}`);
});
