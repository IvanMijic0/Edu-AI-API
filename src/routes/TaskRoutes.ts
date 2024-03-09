import express, { Request, Response } from 'express';
import { TaskService } from '../services';

const router = express.Router();

router.post('/task', async (req: Request, res: Response) => {
    try {
        const newTask = await TaskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/tasks', async (_req: Request, res: Response) => {
    try {
        const tasks = await TaskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.get('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const task = await TaskService.getTaskById(req.params.id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.json(task);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.put('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const updatedTask = await TaskService.updateTaskById(req.params.id, req.body);
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.json(updatedTask);
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

router.delete('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const deletedTask = await TaskService.deleteTaskById(req.params.id);
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    } catch (error) {
        error instanceof Error && res.status(500).json({ message: error.message });
    }
});

export default router;
