import express, { Request, Response } from "express";
import { AuthService } from "../services";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const newUser = await AuthService.registerUser(email, password, firstName, lastName);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await AuthService.loginUser(email, password);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
});

router.post("/validate", async (req: Request, res: Response) => {
    try {
        const token = req.body.token;
        const decoded = await AuthService.validateToken(token);
        res.status(200).json({ message: "Token is valid", decoded });
    } catch (error) {
        if (error instanceof Error) {
             console.error("Error validating token:", error);
             res.status(401).json({ message: error.message });
         } else {
             console.error("Error validating token:", error);
             res.status(401).json({ message: "An unknown error occurred" });
         }
    }
});

export default router;
