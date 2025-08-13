const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

const validPatterns = [
  /^1\s\d{3}-\d{3}-\d{4}$/,        
  /^1\s\(\d{3}\)\s\d{3}-\d{4}$/,   
  /^1\(\d{3}\)\d{3}-\d{4}$/,       
  /^1\s\d{3}\s\d{3}\s\d{4}$/,      
  /^\d{3}-\d{3}-\d{4}$/,           
  /^\d{10}$/,                      
  /^\(\d{3}\)\d{3}-\d{4}$/         
];


checkBtn.addEventListener('click', () => {
  const number = userInput.value.trim();

  if(!number){
    alert("Please provide a phone number");
    return;
  }

  const isValid = validPatterns.some(pattern => pattern.test(number));

  if(isValid){
    resultsDiv.textContent = `Valid US number: ${number}`;
  } else {
    resultsDiv.textContent = `Invalid US number: ${number}`;
  }
});

clearBtn.addEventListener('click', () => {
  userInput.value = "";
  resultsDiv.textContent = "";
});
