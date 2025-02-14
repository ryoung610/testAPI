import React, { useState } from 'react';
import { generateClient } from 'aws-amplify'; // Use API from aws-amplify

const TestAPI = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleMultiply = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Check if running locally
            console.log('Current hostname:', window.location.hostname);
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            
            let response;
            if (isLocal) {
                console.log('Using local server');
                response = await fetchLocalServer(a, b);
            } else {
                console.log('Using AWS API Gateway');
                response = await fetchFromAWS(a, b);
            }

            if (response) {
                setResult(response.result);
            } else {
                setError('No response received');
            }
        } catch (err) {
            setError('An error occurred while processing your request: ' + err.message);
        }
        setLoading(false);
    };

    const fetchLocalServer = async (a, b) => {
        try {
            const response = await fetch(`http://localhost:3000/local-multiply?a=${a}&b=${b}`);
            if (!response.ok) throw new Error('Server response was not OK');
            const data = await response.json();
            return data; // Return the response data
        } catch (error) {
            console.warn('Local server check failed, falling back to AWS:', error);
            return null; // If local server fails, fall back to AWS
        }
    };

    const fetchFromAWS = async (a, b) => {
        try {
            // Using the Amplify API
            const response = await API.post('apiRestTest', '/dev', {
                body: { a: parseFloat(a), b: parseFloat(b) }
            });
            return response; // Return the full response from Lambda
        } catch (error) {
            console.error('AWS API Gateway error:', error);
            throw error;
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Multiplication Calculator</h1>
            <div>
                <input 
                    type="number" 
                    value={a} 
                    onChange={(e) => setA(e.target.value)} 
                    placeholder="First number"
                    style={{ marginRight: '10px' }}
                />
                <input 
                    type="number" 
                    value={b} 
                    onChange={(e) => setB(e.target.value)} 
                    placeholder="Second number"
                />
            </div>
            <br />
            <button 
                onClick={handleMultiply} 
                disabled={loading}
                style={{ padding: '10px', fontSize: '16px' }}
            >
                {loading ? 'Calculating...' : 'Multiply'}
            </button>
            {result !== null && <p style={{ marginTop: '20px', fontSize: '20px' }}>Result: {result}</p>}
            {error && <p style={{ color: 'red', marginTop: '20px' }}>Error: {error}</p>}
        </div>
    );
};

export default TestAPI;
