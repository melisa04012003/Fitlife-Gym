// User ID - In a real app, this would come from user authentication
const USER_ID = 1;

// Function workout
async function logWorkout(workoutData) {
    try {
        const response = await fetch('http://localhost:5000/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: USER_ID,
                workout_type: workoutData.workoutType,
                duration: workoutData.duration,
                calories_burned: workoutData.calories
            })
        });

        if (!response.ok) {
            throw new Error('Failed to log workout');
        }

        await loadWorkoutHistory();
        return true;
    } catch (error) {
        console.error('Error logging workout:', error);
        return false;
    }
}

// Function to load workout history
async function loadWorkoutHistory() {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${USER_ID}/workouts`);
        if (!response.ok) {
            throw new Error('Failed to fetch workout history');
        }

        const workouts = await response.json();
        const workoutHistory = document.getElementById('workout-history');
        workoutHistory.innerHTML = '';

        workouts.forEach(workout => {
            const workoutElement = document.createElement('div');
            workoutElement.className = 'list-group-item';
            workoutElement.innerHTML = `
                <h5 class="mb-1">${workout.workout_type.charAt(0).toUpperCase() + workout.workout_type.slice(1)}</h5>
                <p class="mb-1">Duration: ${workout.duration} minutes</p>
                <p class="mb-1">Calories Burned: ${workout.calories_burned}</p>
                <small>${new Date(workout.date).toLocaleDateString()}</small>
            `;
            workoutHistory.appendChild(workoutElement);
        });
    } catch (error) {
        console.error('Error loading workout history:', error);
    }
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workoutForm');
    
    workoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const workoutData = {
            workoutType: document.getElementById('workout-type').value,
            duration: parseInt(document.getElementById('duration').value),
            calories: parseInt(document.getElementById('calories').value)
        };

        const success = await logWorkout(workoutData);
        if (success) {
            workoutForm.reset();
        }
    });

    // Load workout history when page loads
    loadWorkoutHistory();
});
