import express, { Request, Response } from 'express';
import { UserService } from '../services';

const router = express.Router();

router.post('/users', async (req: Request, res: Response) => {
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/users', async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const updatedUser = await UserService.updateUserById(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(updatedUser);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const deletedUser = await UserService.deleteUserById(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;
