import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// Get all submissions
router.get('/', (req: Request, res: Response) => {
  res.send('quotes/ base');
});

// Sumbit quote
router.post('/', (req: Request, res: Response) => {
  res.send('quotes submit');
});

export default router;