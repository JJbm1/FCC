const form = document.getElementById("form");
const numberInput = document.getElementById("number");
const output = document.getElementById("output");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const num = parseInt(numberInput.value);

  if(isNaN(num)){
    output.textContent = "Please enter a valid number";
    return;
  }

  if(num < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  }

  if(num > 3999) {
    output.textContent =  "Please enter a number less than or equal to 3999";
    return;
  }
  output.textContent = converToRoman(num);
});

function converToRoman(num){
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" }
  ];

  let roman = "";
  for(let i = 0; i < romanNumerals.length; i++){
    while(num >= romanNumerals[i].value){
      roman += romanNumerals[i].symbol;
      num -= romanNumerals[i].value;
    }
  }
  return roman;
}
