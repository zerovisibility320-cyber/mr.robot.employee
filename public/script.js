function loadData(userType) {
    // Store user type and redirect to key page
    sessionStorage.setItem('userType', userType);
    window.location.href = 'key.html';
}

// Attach event listeners to buttons
document.getElementById('userBtn').addEventListener('click', function() {
    loadData('user');
});

document.getElementById('adminBtn').addEventListener('click', function() {
    loadData('admin');
});