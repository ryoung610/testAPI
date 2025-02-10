import express from 'express';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','https://main.d18i25mwkucv07.amplifyapp.com'], // or use '*' for all origins
    methods: ['GET', 'POST'], // specify the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // specify headers if needed
}));
// Local multiplication service
app.get('/local-multiply', (req, res) => {
    try {
        const { a, b } = req.query;
        if (a && b) {
            const result = parseFloat(a) * parseFloat(b);
            if (isNaN(result)) {
                throw new Error('Invalid numbers provided');
            }
            res.json({ result });
        } else {
            res.status(400).send('Missing parameters');
        }
    } catch (error) {
        console.error('Error in local-multiply:', error);
        res.status(500).send('Error processing request');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});