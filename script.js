function insert(num) {
    //se houver erro de sintaxe, retorna a função
    if(SyntaxError) { 
        return
    }
    
    //inserir um numero no display
    if(display.value.length < 20) {
      
        if(isNaN(num)) {
            display.value += num
        }
        else if(display.value.length == 1 && display.value[0] == 0) {
            display.value = num
        }
        else {
            display.value += num
        }
    }
    else {
        return
    }
}

function clean() {
    //se houver um erro de sintaxe, alterne a variável para false (reset)
    SyntaxError = false
    //clear the display value 
    display.value = "0";

}

function equal() {
    var exp = display.value
    var flag = false //variável booleana para verificar condicionais

    for(i = 0; i < exp.length; i++) {
        if(isNaN(exp[i]) && isNaN(exp[i+1])) {
            if(exp[i] != "+" && exp[i] != "-") {
               //se houver dois operadores juntos, alterne o erro de sintaxe para verdadeiro
                display.value = "Syntax Error"
                SyntaxError = true
            }

        }
    }

    if(flag == false) { //se não houver erros, calcula a expressão normalmente
        var answer = eval(exp)

        if(isFinite(answer)) {
            display.value = answer
        }
        else {
            display.value = "Math Error" //se é infinito
            SyntaxError = true
        }
    }
   
    
}

function back() {
    //se houver erro de sintaxe, retorna a função
    if(SyntaxError) {
        return
    }

    display.value = display.value.substring(0,display.value.length-1)
    
    if(display.value == "") {
        display.value = "0"
    }

}

//selecionando exibição
const display = document.querySelector('.display')
//selecting all numbers
const numbers = document.querySelectorAll('.number')
//adding event listener for each number in "numbers"
numbers.forEach( (button) => {
    button.addEventListener('click', calculate)
})
//selecionando todos os operadores
const operators = document.querySelectorAll('.operator')
//adding event listener for each operator in "operators"
operators.forEach( (button) => {
    button.addEventListener('click', calculate)
})
//adicionando ouvinte de evento ao teclado
window.addEventListener('keypress', check)
function check(key) {
    let keyValue = key.key
    if (key.keyCode) {
        if(!isNaN(keyValue)) {
            insert(keyValue)
        } else { 
            if(display.value.length == 1 && display.value[0] == 0) {
                return
            } else {
                for(i = 0; i < operators.length; i++) {
                    if(keyValue == operators[i].value) {
                        if (keyValue == "c") {
                            clean()
                        } else if (keyValue == "<") {
                            back()
                        } else if (keyValue == "=") {
                            equal()
                        } else {
                            display.value += keyValue
                        }
                    }
                }
            } 
        }
    }
}

//variável booleana para verificar se há erro de sintaxe
var SyntaxError = false

function calculate(event) {
    var buttonValue = event.target.value;

    if (!isNaN(buttonValue) || (isNaN(buttonValue) && buttonValue != "=" && buttonValue != "<" && buttonValue != "c")) {
        if (buttonValue == "x") {
            buttonValue = "*"; // Alterando "x" para "*" para calcular normalmente
        }

        // Inserir o buttonValue
        insert(buttonValue);
    } else if (buttonValue == '=') {
        equal(); // Chamar a função equal() para calcular o resultado
    } else if (buttonValue == "<") {
        back(); // Chamar a função back() para apagar o último caractere
    } else if (buttonValue == ">") {
        // Tratar a operação representada por ">"
    } else if (buttonValue == "c") {
        clean(); // Chamar a função clean() para limpar o visor
    } else if (buttonValue == "^") {
        // Tratar a operação de exponenciação (^)
        display.value += "^";
    } else if (buttonValue == "√") {
        // Tratar a operação de raiz quadrada (√)
        display.value += "√";
    } else if (buttonValue == "%") {
        // Tratar a operação de porcentagem (%)
        display.value += "%";
    }
}


