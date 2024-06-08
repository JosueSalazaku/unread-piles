import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controller/users'; // Adjust the path as necessary

export const usersRoute = express.Router();

usersRoute.get('/', getAllUsers);
usersRoute.get('/:id', getUserById);
usersRoute.post('/', createUser);
usersRoute.put('/:id', updateUser);
usersRoute.delete('/:id', deleteUser);

export default usersRoute;