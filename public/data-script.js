// Check if API key was validated
function verifyAccess() {
    const apiKey = sessionStorage.getItem('apiKey');
    
    if (!apiKey) {
        alert('Unauthorized access. Please enter the correct API key.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Fetch employee data from backend
async function fetchEmployeeData() {
    const apiKey = sessionStorage.getItem('apiKey');
    
    try {
        const response = await fetch('https://ctf2-0-exposed-api-backend.onrender.com/api/employees', {
            method: 'GET',
            headers: { 
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        console.log('API Response Status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error Response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const employees = await response.json();
        console.log('Employees Data fetched:', employees.length, 'records');
        
        // Store employees data in sessionStorage
        sessionStorage.setItem('employees', JSON.stringify(employees));
        
        // Display the data
        displayEmployeeData();

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Could not fetch employee data. Please check the console for details.');
    }
}

// Display employee data from sessionStorage
function displayEmployeeData() {
    const employees = JSON.parse(sessionStorage.getItem('employees'));
    
    if (!employees || employees.length === 0) {
        alert('No employee data found.');
        return;
    }

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear existing data

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #ddd';
        row.innerHTML = `
            <td style="border: 1px solid #ddd; padding: 12px;">${employee.name}</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${employee.position}</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${employee.contact}</td>
        `;
        tableBody.appendChild(row);
    });

    console.log('Total employees displayed:', employees.length);
}

// Back button handler
document.getElementById('backBtn').addEventListener('click', function() {
    sessionStorage.clear();
    window.location.href = 'index.html';
});

// On page load, verify access and fetch data
if (verifyAccess()) {
    fetchEmployeeData();
}

