// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 
const quotes = [
  {text: "Life is what happens when you're busy making other plans.", author: "John Lennon"},
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" }
];

function App(){
  const [quote, setQuote] = React.useState(getRandomQuote());
  
  function getRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  function handleNew Quote() {
    let newQuote = getRandomQuote();
    while (newQuote.text === quote.text) {
      newQuote = getRandomQuote();
    }
    setQuote(newQuote);
  }
  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;
  
  return (
    <div id="quote-box">
      <div id="text">{quote.text}</div>
      <div id="author">- {quote.author}</div>
      <div className="buttons">
        <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
        <a id="tweet-quote" href={tweetURL} target="_blank" rel="noopener noreferrer">Tweet</a>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
