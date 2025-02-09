import React, {useState} from 'react'



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
                // First, try to get the result from the local server
                console.log('your in handlemultiply')
                const localResponse = await fetchLocalServer(a, b);
                console.log('you fetchedlocalserver = ' + fetchLocalServer(a, b))
                if (localResponse) {
                    setResult(localResponse);
                } else {
                    // If local server doesn't have the result, fall back to AWS API Gateway
                    const awsResponse = await fetchFromAWS(a, b);
                    setResult(awsResponse.result);
                }
            } catch (err) {
                setError('An error occurred while processing your request');
            }
            setLoading(false);
        };

        const fetchLocalServer = async (a, b) => {
            try {
                const response = await fetch(`http://localhost:3000/local-multiply?a=${a}&b=${b}`);
                if (!response.ok) throw new Error('Server response was not OK');
                const data = await response.json();
                return data.result; // Assuming your local server returns { result: ... }
            } catch (error) {
                console.warn('Local server check failed, falling back to AWS:', error);
                return null; // Indicates to check AWS
            }
        };
    
        const fetchFromAWS = async (a, b) => {
            const response = await API.post('apiRestTest', '/', {
                body: {
                    a: parseFloat(a),
                    b: parseFloat(b)
                }
            });
            if (response.statusCode !== 200) {
                throw new Error(response.body.error || 'AWS API error');
            }
            return response.body;
    };

   return(

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
}

export default TestAPI