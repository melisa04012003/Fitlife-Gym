document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/contacts');
        if (!response.ok) {
            throw new Error('Failed to fetch contact messages');
        }
        
        const contacts = await response.json();
        const tbody = document.getElementById('contactMessages');
        
        contacts.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(contact.date).toLocaleString()}</td>
                <td>${escapeHtml(contact.name)}</td>
                <td>${escapeHtml(contact.email)}</td>
                <td>${escapeHtml(contact.phone || '-')}</td>
                <td>${escapeHtml(contact.subject)}</td>
                <td>${escapeHtml(contact.message)}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading contact messages. Please try again later.');
    }
});

// Helper function to escape HTML and prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
