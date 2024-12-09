// BMI Calculator
document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        bmiForm.addEventListener('submit', calculateBMI);
    }
});

function calculateBMI(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
    const resultDiv = document.getElementById('bmiResult');
    
    if (weight > 0 && height > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        let category = '';
        let colorClass = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            colorClass = 'text-warning';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            colorClass = 'text-success';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            colorClass = 'text-warning';
        } else {
            category = 'Obese';
            colorClass = 'text-danger';
        }

        resultDiv.innerHTML = `
            <div class="alert alert-info">
                <h4>Your BMI: <span class="${colorClass}">${bmi}</span></h4>
                <p>Category: ${category}</p>
                <p>A healthy BMI ranges between 18.5 and 24.9</p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                Please enter valid weight and height values.
            </div>
        `;
    }
}
