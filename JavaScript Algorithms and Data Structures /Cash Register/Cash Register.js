const priceElem = document.getElementById("price");
const cashElem = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueElem = document.getElementById("change-due");
let price = 1.87;
let cid = [  ['PENNY', 1.01],  ['NICKEL', 2.05],  ['DIME', 3.1],  ['QUARTER', 4.25],  ['ONE', 90],  ['FIVE', 55],  ['TEN', 20],  ['TWENTY', 60],  ['ONE HUNDRED', 100]];
const currencyUnit = {  "PENNY": 0.01,  "NICKEL": 0.05,  "DIME": 0.1,  "QUARTER": 0.25,  "ONE": 1,  "FIVE": 5,  "TEN": 10,  "TWENTY": 20,  "ONE HUNDRED": 100};
function formatMoney(amount) {  
  return parseFloat(amount.toFixed(2));
}
  purchaseBtn.addEventListener("click", () => {
      let cash = parseFloat(cashElem.value);  
      if (isNaN(cash)) return;  
      if (cash < price) {    
        alert("Customer does not have enough money to purchase the item");    
      return;
      }  
      if (cash === price) {    
        changeDueElem.textContent = "No change due - customer paid with exact cash";    
        return;  
      }  
      let changeDue = formatMoney(cash - price);
      let totalCid = formatMoney(cid.reduce((sum, [, amount]) => sum + amount, 0));  
      let changeArr = [];  
      let status = "";  
      if (changeDue > totalCid) {    
        changeDueElem.textContent = "Status: INSUFFICIENT_FUNDS";    
        return;  
      }  
      for (let i = cid.length - 1; i >= 0; i--) {    
        let coinName = cid[i][0];    
        let coinTotal = cid[i][1];    
        let coinValue = currencyUnit[coinName];
        let coinAmount = 0;    
        while (changeDue >= coinValue && coinTotal > 0) {      
          changeDue = formatMoney(changeDue - coinValue);      
          coinTotal = formatMoney(coinTotal - coinValue);      
          coinAmount = formatMoney(coinAmount + coinValue);    
        }    
        if (coinAmount > 0) {      
          changeArr.push(`${coinName}: $${coinAmount}`);    
        }    
        cid[i][1] = coinTotal;  
      }  
      if (changeDue > 0) {    
        changeDueElem.textContent = "Status: INSUFFICIENT_FUNDS";    
        return;  
      }  
      if (formatMoney(totalCid) === formatMoney(cash - price)) {    
        status = "CLOSED";    
        changeDueElem.textContent = `Status: ${status} ${changeArr.join(" ")}`;
      } 
      else {    
        status = "OPEN";    
        changeDueElem.textContent = `Status: ${status} ${changeArr.join(" ")}`; 
}});
