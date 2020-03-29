
import express from 'express';
import quotes from './quotes';

const router = express.Router();

router.use('/quotes', quotes)

export default router;
