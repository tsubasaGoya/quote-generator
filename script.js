const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newQuote');
const loader = document.getElementById('loader');
let apiQuotes = [];
function showLoadingSpinner() {
    loader.style.display = 'block';
    quoteContainer.hidden = true;
}
function removeLoadingSpiner() {
    loader.style.display = 'none';
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuotes() {
    showLoadingSpinner();
    // Pick a random wuote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author is blank and replace it with Unknown
    if (!quote.author) {
        authorText.innerHTML = 'Unknown';
    } else {
        authorText.innerHTML = quote.author;
    }
    // Check Quote length to detarmine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.innerHTML = quote.text;
    removeLoadingSpiner();
}
// Get Quote From API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    } catch (error) {
        console.log('Something went wrong');
    }
}
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();