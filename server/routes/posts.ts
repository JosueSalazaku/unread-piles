import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controller/posts'; 

export const postsRoute = express.Router();

postsRoute.get('/', getAllPosts);
postsRoute.get('/:id', getPostById);
postsRoute.post('/', createPost);
postsRoute.put('/:id', updatePost);
postsRoute.delete('/:id', deletePost);

export default postsRoute;
