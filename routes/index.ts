
import express from 'express';
import quotes from './quotes';
import submissions from './submissions';

const router = express.Router();

router.use('/quotes', quotes)
router.use('/submissions', submissions)

export default router;
