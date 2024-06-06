import type { Request, Response } from 'express';
import { db } from '/Users/josuesalazaku/Developer/Projects/unread-piles/backend/db';
import { posts } from '/Users/josuesalazaku/Developer/Projects/unread-piles/backend/src/drizzle/schema';
import { validate } from 'uuid';
import { eq } from 'drizzle-orm/expressions';

export const getAllPosts = (req: Request, res: Response) => {
    db.select().from(posts).execute()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err.message }));
};

export const getPostById = (req: Request, res: Response) => {
    const postId = req.params.id;
    if (!validate(postId)) {
        return res.status(400).json({ error: 'Invalid UUID format' });
    }
    db.select().from(posts).where(eq(posts.id, postId)).execute()
        .then(data => {
            if (data.length > 0) {
                res.status(200).json(data[0]);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

export const createPost = (req: Request, res: Response) => {
    db.insert(posts).values(req.body).execute()
        .then(() => res.status(201).json({ message: 'Post created successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
};

export const updatePost = (req: Request, res: Response) => {
    const postId = req.params.id;
    if (!validate(postId)) {
        return res.status(400).json({ error: 'Invalid UUID format' });
    }
    db.update(posts).set(req.body).where(eq(posts.id, postId)).execute()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({ message: 'Post updated successfully' });
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        })
        .catch(err => res.status(400).json({ error: err.message }));
};

export const deletePost = (req: Request, res: Response) => {
    const postId = req.params.id;
    if (!validate(postId)) {
        return res.status(400).json({ error: 'Invalid UUID format' });
    }
    db.delete(posts).where(eq(posts.id, postId)).execute()
        .then(result => {
            if (result.length > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};
