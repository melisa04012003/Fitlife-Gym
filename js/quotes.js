document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        "Every rep, every step—you're building the strongest version of yourself.",
        "Consistency is your greatest ally; progress is your ultimate reward.",
        "Show up, push through, and let the results speak for themselves.",
        "Fuel your body with health, and it will fuel your dreams.",
        "What you eat today defines how you perform tomorrow.",
        "Nourish your body, and watch your energy soar.",
        "Discipline in the gym creates freedom in life.",
        "Strength is not just physical; it's a mindset.",
        "Push through limits here to overcome challenges everywhere.",
        "Small steps today lead to giant leaps in your health tomorrow.",
        "Every decision counts, and every effort adds up.",
        "The journey is long, but the rewards last a lifetime."
    ];

    let currentQuote = 0;
    const quoteElement = document.getElementById('quote-text');
    
    function updateQuote() {
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = quotes[currentQuote];
            quoteElement.style.opacity = '1';
            currentQuote = (currentQuote + 1) % quotes.length;
        }, 500);
    }

    // Initial quote
    if (quoteElement) {
        quoteElement.textContent = quotes[0];
        // Change quote every 5 seconds
        setInterval(updateQuote, 5000);
    }
});
