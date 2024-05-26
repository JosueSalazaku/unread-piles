import express from 'express';
import dotenv from 'dotenv';

export const usersRoute = express.Router()
    .get('/users', (req, res) => {

        // Your code here
        // This is where you handle the logic for the '/user' endpoint
        // You can access request parameters using req.params
        // You can send a response using res.send() or res.json()
    });
//is this correct?
