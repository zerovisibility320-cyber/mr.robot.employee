// Get user type from sessionStorage
const userType = sessionStorage.getItem('userType') || 'guest';
// find the commit
// Display user type
document.getElementById('userType').innerHTML = `<p class="user-label">Accessing as: <strong>${userType.toUpperCase()}</strong></p>`;

// Submit button handler
document.getElementById('submitBtn').addEventListener('click', async function() {
    const key = document.getElementById('keyInput').value.trim();
    const messageDiv = document.getElementById('message');

    if (!key) {
        messageDiv.innerHTML = '<p class="error">❌ Please enter a key</p>';
        messageDiv.classList.add('show');
        return;
    }

    // https://github.com/zerovisibility320-cyber/mr.robot.employee.git

    try {
        const response = await fetch('/api/validate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key, userType })
        });

        const data = await response.json();

        if (data.success) {
            messageDiv.innerHTML = '<p class="success">✅ ' + data.message + '</p>';
            messageDiv.classList.add('show');
            
            // Store the API key and fetch employee data
            sessionStorage.setItem('apiKey', data.apiKey);
            
            // Redirect to data page after 1 second
            setTimeout(() => {
                window.location.href = 'data.html';
            }, 1000);
        } else {
            messageDiv.innerHTML = '<p class="error">❌ ' + data.message + '</p>';
            messageDiv.classList.add('show');
        }
    } catch (error) {
        console.error('Error validating key:', error);
        messageDiv.innerHTML = '<p class="error">❌ Error validating key. Please try again.</p>';
        messageDiv.classList.add('show');
    }
});

// Back button handler
document.getElementById('backBtn').addEventListener('click', function() {
    const messageDiv = document.getElementById('message');
    
    if (userType === 'user') {
        messageDiv.innerHTML = '<p class="permission-denied">⛔ ACCESS DENIED: You don\'t have permission to go back without entering the correct key!</p>';
        messageDiv.classList.add('show');
    } else {
        messageDiv.innerHTML = '<p class="warning">⚠️ ADMIN: Are you sure you want to go back? Click "Go Back" again to confirm.</p>';
        messageDiv.classList.add('show');
        
        // Change handler for second click
        document.getElementById('backBtn').onclick = function() {
            window.location.href = 'index.html';
        };
    }
});

// Allow Enter key to submit
document.getElementById('keyInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('submitBtn').click();
    }
});

