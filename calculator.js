let displayValue = "";
let displayArr = [];
const operators = ["+", "−", "÷", "×"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const clearButton = $("#C");
const display = $("h1");
const backspaceButton = $("#backspace");
const decimalButton = $("#decimal");
const operatorButtons = $(".no-equal");

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
    return a / b;
}

function operate(operator, a, b){
    if (operator == "+"){
        return add(a, b);
    }
    else if (operator == "−"){
        return subtract(a, b);
    }
    else if (operator == "×"){
        return multiply(a, b);
    }
    else if (operator == "÷"){
        return divide(a, b);
    }
}

$("button.number").on("click", function(e){
    if((display[0].textContent).length <= 17){
        display[0].textContent += this.textContent;
        displayArr.length == 0 ? displayArr.push(this.textContent) :  displayArr[displayArr.length -1]+= this.textContent;
        console.log(displayArr);
    }
});

clearButton.on("click", function(){
    display[0].textContent = "";
    decimalButton.prop('disabled', false);
});

backspaceButton.on("click", function(){
    if((display[0].textContent).length > 0){
        temp = display[0].textContent;
        display[0].textContent = temp.substring(0, temp.length-1);
    }
});

decimalButton.on("click", function(){
    decimalButton.prop('disabled', true);
    if((display[0].textContent).length <= 17){
        display[0].textContent += this.textContent;
        displayArr.length == 0 ? displayArr.push(this.textContent) : displayArr[displayArr.length -1]+= this.textContent;
        console.log(displayArr);
    }
});

operatorButtons.on("click", function(){
    decimalButton.prop('disabled', false);
    if((display[0].textContent).length <= 16){
        display[0].textContent += this.textContent;
        displayArr.push(this.textContent);
        displayArr.push("");
        console.log(displayArr);
    }
});