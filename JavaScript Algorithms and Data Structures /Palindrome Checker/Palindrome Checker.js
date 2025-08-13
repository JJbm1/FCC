document.getElementById("check-btn").addEventListener("click", function(){
  const input = document.getElementById("text-input").value;

  if(!input){
    alert("Please input a value.");
    return;
  }

  const cleaned = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");

  const result = document.getElementById("result");

  if(cleaned === reversed) {
    result.textContent = `${input} is a palindrome.`;
  } else {
    result.textContent = `${input} is not a palindrome.`;
  }
});
