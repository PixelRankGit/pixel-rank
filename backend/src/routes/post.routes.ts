import express from 'express';

const router = express.Router();


import { getPosts, createPost } from '../controllers/post.controller';


router.get('/posts', getPosts);
router.post('/posts', createPost);

export default router;