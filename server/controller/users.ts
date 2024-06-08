import type { Request, Response } from 'express';
import { db } from '/Users/josuesalazaku/Developer/Projects/unread-piles/server/db';
import { users } from '/Users/josuesalazaku/Developer/Projects/unread-piles/server/src/drizzle/schema';
import { eq } from 'drizzle-orm';
import { validate } from 'uuid';

export const getAllUsers = (req: Request, res: Response) => {
    db.select().from(users).execute()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err.message }));
};

export const getUserById = (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!validate(userId)) {
        return res.status(400).json({ error: 'Invalid UUID format' });
    }
    db.select().from(users).where(eq(users.id, userId)).execute()
        .then(data => {
            if (data.length > 0) {
                res.status(200).json(data[0]);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

export const createUser = (req: Request, res: Response) => {
    db.insert(users).values(req.body).execute()
        .then(() => res.status(201).json({ message: 'User created successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
};

export const updateUser = (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!validate(userId)) {
        return res.status(400).json({ error: 'Invalid UUID format' });
    }
    db.update(users).set(req.body).where(eq(users.id, userId)).execute()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(err => res.status(400).json({ error: err.message }));
};

export const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!validate(userId)) {
        return res.status(400).json({ error: 'Invalid UUID format' });
    }
    db.delete(users).where(eq(users.id, userId)).execute()
        .then(result => {
            if (result.length > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};
