const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Store the correct API key here
const CORRECT_API_KEY = "EMP_SECURE_TOKEN_8829_X";
// dont use the key restricted area
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve key.html
app.get('/key', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'key.html'));
});

// Serve data.html
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data.html'));
});

// API endpoint to validate the key
app.post('/api/validate-key', (req, res) => {
    const { key, userType } = req.body;

    console.log('Key validation attempt:', { key, userType });

    if (key === CORRECT_API_KEY) {
        res.json({ 
            success: true, 
            message: `Welcome ${userType}! Key is correct.`,
            apiKey: CORRECT_API_KEY
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Incorrect key. Access denied.'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Frontend server running on http://localhost:${PORT}`);
});

