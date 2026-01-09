async function loadData() {
    const foundApiKey = "EMP_SECURE_TOKEN_8829_X";
    // use this api key to access the data 

    try {
        const response = await fetch('https://ctf2-0-exposed-api-backend.onrender.com/api/employees', {
            method: 'GET',
            headers: { 
                'x-api-key': foundApiKey,
                'Content-Type': 'application/json'
            }
        });

        console.log('API Response Status:', response.status);
        console.log('API Key Used:', foundApiKey);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Response:', errorData);
            throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        const employees = await response.json();
        console.log('Employees Data:', employees);
        
        // Store employees data in sessionStorage
        sessionStorage.setItem('employees', JSON.stringify(employees));
        
        // Navigate to data.html
        window.location.href = 'data.html';

    } catch (error) {
        console.error('Error fetching data:', error, 'plese check the js or 1st commit for api key or try again later');
        alert('Could not fetch employee data. Please try again the button or... Please check the console for more details.');
    }
}

// Attach event listeners to buttons
document.getElementById('userBtn').addEventListener('click', loadData);
document.getElementById('adminBtn').addEventListener('click', loadData);