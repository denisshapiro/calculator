let displayValue = "";
let displayArr = [];
const operators = ["+", "−", "÷", "×"];
const realOperators = ["+", "-", "/", "*"]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const clearButton = $("#C");
const display = $("h1");
const backspaceButton = $("#backspace");
const decimalButton = $("#decimal");
const operatorButtons = $(".no-equal");
const equalsButton = $("#equals");
let afterEquals = false;

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (a/b === Infinity){
        display[0].textContent = "Division By Zero";
        display.fadeOut(1000);
          display.fadeIn(20, function() {
            clear();
        });
    }
    else{
        return a / b;
    }
}

function operate(a,operator, b){
    if (operator == "+"){
        return add(a, b);
    }
    else if (operator == "-"){
        return subtract(a, b);
    }
    else if (operator == "*"){
        return multiply(a, b);
    }
    else if (operator == "/"){
        return divide(a, b);
    }
}

$("button.number").on("click", function(e){
    if(afterEquals == true){
        clear();
        afterEquals = false;
    }
    if((display[0].textContent).length <= 17){
        display[0].textContent += this.textContent;
        displayArr.length == 0 ? displayArr.push(this.textContent) :  displayArr[displayArr.length -1]+= this.textContent;
        console.log(displayArr);
    }
});

clearButton.on("click", clear);

function clear(){
    display[0].textContent = "";
    decimalButton.prop('disabled', false);
    displayArr = [];
}

backspaceButton.on("click", function(){
    if((display[0].textContent).length > 0){
        temp = display[0].textContent;
        display[0].textContent = temp.substring(0, temp.length-1);
        if(displayArr[displayArr.length - 1] == ""){
            displayArr.pop();
            displayArr.pop();
        }
        else if(displayArr[displayArr.length - 1].length == 1 || operators.indexOf(displayArr[displayArr.length - 1]) > -1){
            displayArr.pop();
        }
        else{
            displayArr[displayArr.length - 1] = displayArr[displayArr.length - 1].substring(0, temp.length-1);
        }
        console.log(displayArr);
    }
});

decimalButton.on("click", function(){
    if(afterEquals == true){
        clear();
        afterEquals = false;
    }
    decimalButton.prop('disabled', true);
    if((display[0].textContent).length <= 17){
        display[0].textContent += this.textContent;
        if (displayArr.length == 0) {
            displayArr.push("0" + this.textContent);
         } 
         else if((displayArr[displayArr.length - 1] == "")){
            displayArr[displayArr.length - 1] += "0" + this.textContent;
         }
         else{
             displayArr[displayArr.length -1] += this.textContent;
         }
        console.log(displayArr);
    }
});

operatorButtons.on("click", function(){
    if(afterEquals == true){
        clear();
        afterEquals = false;
    }
    decimalButton.prop('disabled', false);
    if((display[0].textContent).length <= 16){
        display[0].textContent += this.textContent;
        if(this.textContent == "−"){
            if(displayArr.length == 0){
                displayArr.push(this.textContent);
            }
            else if(operators.indexOf(displayArr[displayArr.length - 1]) > -1){
                displayArr.push(this.textContent);
            }
            else if (displayArr[displayArr.length - 1] == ""){
                displayArr[displayArr.length - 1] += "−"
            }
            else{
                displayArr.push(this.textContent);
                displayArr.push("");
            }
        }
        else{
        displayArr.push(this.textContent);
        displayArr.push("");
        }
        
    }
    console.log(displayArr);
});

equalsButton.on("click", function(){
    clean(displayArr);
    afterEquals = true;
    if(!isValid(displayArr)){
        display[0].textContent = "Invalid Operation";
        display.fadeOut(1000);
          display.fadeIn(20, function() {
            clear();
        });
    }
    else{
        result = evaluate(displayArr)[0];
        display[0].textContent = result;
    }
});

function isValid(arr){
    if (realOperators.indexOf(arr[0]) > -1 || realOperators.indexOf(arr[arr.length - 1]) > -1 || arr[arr.length - 1] == "" ){
        console.log("false");
        return false;
    }
    for (let i = 0; i < arr.length - 1; i++){
        if(realOperators.indexOf(arr[i]) > -1){
            if ((isNaN(arr[i-1]) || isNaN(arr[i-1]))){
                console.log("false");
                return false;
            }
        }   
    }
    console.log("true");
    return true;
}

function clean(arr){
    for (let i = 0; i < arr.length; i++){
        if((arr[i].split(""))[0] == "−"){
            arr[i] = "-" + arr[i].substring(1);
        }
        else if (operators.indexOf(arr[i]) > -1){
            arr[i] = realOperators[operators.indexOf(arr[i])];
        }
    }
    console.log(arr);
}

function evaluate(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == "/" || arr[i] == "*"){
            let result = operate(Number(arr[i-1]), arr[i], Number(arr[i+1]));
            arr.splice(i-1, 3, result.toString());
        }
    }
    console.log(arr);
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == "+" || arr[i] == "-"){
            let result = operate(Number(arr[i-1]), arr[i], Number(arr[i+1]));
            arr.splice(i-1, 3, result.toString());
        }
    }
    console.log(arr);
    if(arr.length != 1) evaluate(arr);
    return arr;
}