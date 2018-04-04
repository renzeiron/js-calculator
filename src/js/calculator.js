const 
    CHAR_LIMIT = 17,
    CHAR_AUX = 7,
    SCREEN = {
        primary: document.getElementById('text-primary'),
        secondary: document.getElementById('op'),
        memory: document.getElementById('mem'),
        fitToWidth: (number) => number.toString().length > CHAR_LIMIT ? number.toPrecision(CHAR_LIMIT - CHAR_AUX) : number
    };

let firstOperand = '', 
    secondOperand = '', 
    currentOperation = '',
    bracketsExpression = '',
    operationOver = true,
    newEntryFlag = false,
    bracketsFlag = false,
    inv = false,
    hyp = false,
    memory = 0;

//#region Mode Select

function mode() {
    if (document.getElementById('basic').checked)
        document.querySelector('.scientific').style.display = 'none';
    else
        document.querySelector('.scientific').style.display = 'grid';
};

mode();

Array.from(document.querySelectorAll('.b-s-switch > input[type="radio"]')).forEach((element) => {
    element.addEventListener('click', () => { mode() })
});

//#endregion

//#region Single Event Listener

// document.querySelector('.basic').addEventListener('click', (event) => {
//     if (event.target.classList.contains('numeric')) {
//         if ((event.target.value == '.' && SCREEN_PRIMARY.innerHTML.indexOf('.') > 0) || SCREEN_PRIMARY.innerHTML.length == CHAR_LIMIT) 
//             return;

//         if (SCREEN_PRIMARY.innerHTML == '0' && event.target.value != '.')
//             SCREEN_PRIMARY.innerHTML = event.target.value;
//         else
//             SCREEN_PRIMARY.innerHTML += event.target.value;

//         return;
//     }

//     if (event.target.id == 'backspace') {
//         SCREEN_PRIMARY.innerHTML = SCREEN_PRIMARY.innerHTML.slice(0, -1);
//         if (SCREEN_PRIMARY.innerHTML == '') SCREEN_PRIMARY.innerHTML = '0';

//         return;
//     }
// });

//#endregion

//#region Basic Controls

// Numeric Buttons
Array.from(document.querySelectorAll('.numeric')).forEach((element) => {
    element.addEventListener('click', () => {
        if ((element.value == '.' && SCREEN.primary.innerHTML.indexOf('.') > 0)
            || (SCREEN.primary.innerHTML.length == CHAR_LIMIT && !newEntryFlag))
            return;

        if (operationOver && currentOperation !='') {
            // firstOperand = '';
            currentOperation = '';
        }

        if ((SCREEN.primary.innerHTML == '0' && element.value != '.') || newEntryFlag) {
            SCREEN.primary.innerHTML = element.value;
            newEntryFlag = false;
        }
        else
            SCREEN.primary.innerHTML += element.value;
    })
});

// Clear Buttons
document.getElementById('clear-all').addEventListener('click', () => {
    firstOperand = '';
    secondOperand = '';
    currentOperation = '';
    operationOver = null;
    SCREEN.secondary.innerHTML = '';
    SCREEN.primary.innerHTML = '0';
});

document.getElementById('clear').addEventListener('click', () => {
    SCREEN.primary.innerHTML = '0';
});

document.getElementById('backspace').addEventListener('click', () => {
    SCREEN.primary.innerHTML = SCREEN.primary.innerHTML.slice(0, -1);
    if (SCREEN.primary.innerHTML == '') SCREEN.primary.innerHTML = '0';
});

// Memory Buttons
document.getElementById('memory-clear').addEventListener('click', () => {
    memory = 0;
    SCREEN.memory.innerHTML = '';
});

document.getElementById('memory-read').addEventListener('click', () => {
    SCREEN.primary.innerHTML = SCREEN.fitToWidth(memory);
});

document.getElementById('memory-save').addEventListener('click', () => {
    memory = parseFloat(SCREEN.primary.innerHTML);
    SCREEN.memory.innerHTML = 'mem';
});

document.getElementById('memory-add').addEventListener('click', () => {
    memory += parseFloat(SCREEN.primary.innerHTML);
});

document.getElementById('memory-sub').addEventListener('click', () => {
    memory -= parseFloat(SCREEN.primary.innerHTML);
});

// +/-
document.getElementById('pos-neg').addEventListener('click', () => {
    if (SCREEN.primary.innerHTML < 0) {
        SCREEN.primary.innerHTML = Math.abs(SCREEN.primary.innerHTML);
    } 
    else {
        SCREEN.primary.innerHTML = SCREEN.primary.innerHTML * -1;
    }
});

// %
document.getElementById('percentage').addEventListener('click', () => {
    if (currentOperation != '') {
        SCREEN.secondary.innerHTML += SCREEN.primary.innerHTML + '%';
        SCREEN.primary.innerHTML = SCREEN.fitToWidth((firstOperand / 100) * SCREEN.primary.innerHTML);
    }
    else
        SCREEN.primary.innerHTML = SCREEN.fitToWidth(SCREEN.primary.innerHTML / 100);
});

// Power Operators
Array.from(document.querySelectorAll('.math-pow')).forEach((element) => {
    element.addEventListener('click', () => {
        SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math.pow(SCREEN.primary.innerHTML, element.value));
    })
});

// Binary Operations
Array.from(document.querySelectorAll('.math-binary')).forEach((element) => {
    element.addEventListener('click', () => {
        SCREEN.secondary.innerHTML += SCREEN.primary.innerHTML + element.innerHTML;
        
        if (bracketsFlag) {
            bracketsExpression += SCREEN.primary.innerHTML + element.value;
        }
        else {

            if (currentOperation != '' && currentOperation != 'Math.pow') {
                secondOperand = SCREEN.primary.innerHTML;
                SCREEN.primary.innerHTML = SCREEN.fitToWidth(eval(firstOperand + currentOperation + secondOperand));
            }

            firstOperand = SCREEN.primary.innerHTML;
            currentOperation = element.value;
            secondOperand = '';
        }
        
        operationOver = false;
        newEntryFlag = true;
    })
});

// =
document.getElementById('eval').addEventListener('click', () => {
    if (currentOperation != '') {
        if (secondOperand == '') secondOperand = SCREEN.primary.innerHTML;

        let result = currentOperation != 'Math.pow' ? 
            eval(firstOperand + currentOperation + secondOperand) : 
            !inv ? 
                eval(currentOperation + '(' + firstOperand + ',' + secondOperand + ')') :
                eval(currentOperation + '(' + firstOperand + ',' + 1 / secondOperand + ')');
        firstOperand = result;
        SCREEN.primary.innerHTML = SCREEN.fitToWidth(result);
    }

    operationOver = true;
    newEntryFlag = true;
    SCREEN.secondary.innerHTML = '';
});

//#endregion

//#region Scientific Controls
document.getElementById('inv').addEventListener('click', (event) => {
    inv = !inv;

    Array.from(document.querySelectorAll('.trigonometry')).forEach((element) => {
        inv ? element.innerHTML += '<sup><small>-1</small></sup>' : 
            hyp ? element.innerHTML = element.id + 'h' : element.innerHTML = element.id;
    });

    let logButton = document.getElementById('log'), 
        lnButton = document.getElementById('ln'),
        powButton = document.getElementById('pow-y');

    if (inv) {
        logButton.innerHTML  = '<small>10</small><sup><small>x</small></sup>';
        lnButton.innerHTML = 'e<sup><small>x</small></sup>';
        powButton.innerHTML = 'x<sup><small>1/y</small></sup>'
    }
    else {
        logButton.innerHTML  = logButton.id;
        lnButton.innerHTML = lnButton.id;
        powButton.innerHTML = 'x<sup><small>y</small></sup>';
    }
});

document.getElementById('hyp').addEventListener('click', (event) => {
    hyp = !hyp;

    Array.from(document.querySelectorAll('.trigonometry')).forEach((element) => {
        if (hyp)
            element.innerHTML = inv? element.id + 'h<sup><small>-1</small></sup>' : element.id + 'h';
        else 
            element.innerHTML = inv? element.id + '<sup><small>-1</small></sup>' : element.id;

    });
});

// Unary Operations
document.getElementById('random').addEventListener('click', () => {
    SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math.random());
});

document.getElementById('round').addEventListener('click', () => {
    let floatingPointIndex = SCREEN.primary.innerHTML.indexOf('.');

    if (floatingPointIndex > 0)
        SCREEN.primary.innerHTML = parseFloat(SCREEN.primary.innerHTML)
            .toFixed(SCREEN.primary.innerHTML.length - floatingPointIndex - 2);
});

Array.from(document.querySelectorAll('.log')).forEach((element) => {
    element.addEventListener('click', (event) => {
        SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math[event.target.value](SCREEN.primary.innerHTML));
    });
});

function toRadians(angle) {
    if (document.getElementById('degrees').checked)
        angle = angle * Math.PI / 180;
    else if (document.getElementById('grads').checked)
        angle = angle * 63.662;

    return angle;
}

function outOfRadians(angle) {
    if (document.getElementById('degrees').checked)
        angle = angle * 180 / Math.PI;
    else if (document.getElementById('grads').checked)
        angle = angle / 63.662;

    return angle;
}

Array.from(document.querySelectorAll('.trigonometry')).forEach((element) => {
    element.addEventListener('click', (event) => {
        if (!inv)
            SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math[event.target.innerHTML](toRadians(SCREEN.primary.innerHTML)));
        else {
            let func = hyp ? 'a' + event.target.id + 'h' : 'a' + event.target.id;
            SCREEN.primary.innerHTML = SCREEN.fitToWidth(outOfRadians(Math[func](SCREEN.primary.innerHTML)));
        }
    });
});

function factorial(op) {
    // Lanczos Approximation of the Gamma Function
    // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)
    let z = op + 1;
    let p = [1.000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 1.208650973866179E-3, -5.395239384953E-6];
   
    let d1 = Math.sqrt(2 * Math.PI) / z;
    let d2 = p[0];
   
    for (var i = 1; i <= 6; ++i) d2 += p[i] / (z + i);
   
    let d3 = Math.pow((z + 5.5), (z + 0.5));
    let d4 = Math.exp(-(z + 5.5));
   
    return d1 * d2 * d3 * d4;
}

document.getElementById('factorial').addEventListener('click', () => {
    SCREEN.primary.innerHTML = SCREEN.fitToWidth(factorial(parseFloat(SCREEN.primary.innerHTML)));
});

// Yth-power Operation
document.getElementById('pow-y').addEventListener('click', () => {
    firstOperand = SCREEN.primary.innerHTML;
    secondOperand = '';
    newEntryFlag = true;
    currentOperation = 'Math.pow';
    SCREEN.secondary.innerHTML = firstOperand + (!inv ? 'ypow' : 'yroot');
});

// Constants
Array.from(document.querySelectorAll('.const')).forEach((element) => {
    element.addEventListener('click', (event) => {
        SCREEN.primary.innerHTML = SCREEN.fitToWidth(Math[event.target.value]);
    });
});

// Brackets
document.getElementById('bracket-open').addEventListener('click', () => {
    if (!SCREEN.secondary.innerHTML.includes('(') && bracketsExpression == '') {
        SCREEN.secondary.innerHTML += '(';
        bracketsFlag = true;
    }
});

document.getElementById('bracket-close').addEventListener('click', () => {    
    if (bracketsFlag) {
        let brtsExpResult = eval(bracketsExpression += SCREEN.primary.innerHTML);
        SCREEN.secondary.innerHTML += SCREEN.primary.innerHTML + ')';
        
        if (firstOperand == '') firstOperand = brtsExpResult;
        else if (secondOperand == '') secondOperand = brtsExpResult;

        bracketsExpression = '';
        bracketsFlag = false;
    }
});

//#endregion