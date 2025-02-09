import express from 'express';
import TestAPI from '../../src/pages/TestAPI.jsx';
import { API } from 'aws-amplify';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Local multiplication service
app.get('/local-multiply', (req, res) => {
    const { a, b } = req.query;
    if (a && b) {
        const result = parseFloat(a) * parseFloat(b);
        res.json({ result });
    } else {
        res.status(400).send('Missing parameters');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});