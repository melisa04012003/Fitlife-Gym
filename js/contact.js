document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.error('Contact form not found');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Get form values directly
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Log the values
        console.log('Form Values:', {
            name,
            email,
            phone,
            subject,
            message
        });

        // Simple validation
        if (!name || !email || !subject || !message) {
            const missingFields = [];
            if (!name) missingFields.push('Name');
            if (!email) missingFields.push('Email');
            if (!subject) missingFields.push('Subject');
            if (!message) missingFields.push('Message');
            
            alert('Please fill in all required fields: ' + missingFields.join(', '));
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            console.log('Sending request to server...');
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message
                })
            });

            console.log('Response status:', response.status);
            const responseData = await response.json();
            console.log('Response data:', responseData);

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to send message');
            }

            // Clear form and show success message
            form.reset();
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error details:', error);
            alert('Failed to send message. Please try again. Error: ' + error.message);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});
