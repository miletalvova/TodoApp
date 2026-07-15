import app from './app.js';
import type { Request, Response } from 'express';

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.json({ status: 'ok' })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})