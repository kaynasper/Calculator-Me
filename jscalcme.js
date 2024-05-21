//nasper
var buttons = Array.from((document.getElementsByClassName('button')));
var symbs = ['+','-','/','*','(',')','%'];
var operators = ['/','+','-','*'];
var aray = [];
var bracks = [')'];

var keep = document.getElementById('history');
var display = document.getElementById('screen');

const handleCase = (sym) => {
    if (symbs.includes(aray.at(-1)) || aray.at(-1) == 'Math Error') {
        aray = aray;
    } else {
        keep.innerHTML += (display.innerHTML + sym);
        display.innerHTML = '';
        aray.push(sym);
    }
}

buttons.map((currentButton) => {
    currentButton.addEventListener('click' , (evt) => {
        switch (evt.target.id) {
            case 'brs':
                if (symbs.includes(aray.at(-1)) || aray.at(-1) == 'Math Error') {
                    if (bracks.at(-1) == ')' && operators.includes(aray.at(-1))) { 
                            keep.innerHTML += display.innerHTML + '(';
                            display.innerHTML = '';
                            bracks.push('(');
                            break;
                    } else {
                        break;
                    }
                } else {
                    if (!(isNaN(aray.at(-1)))) { //if last element is a number
                        if (bracks.at(-1) == ')') {
                            keep.innerHTML += display.innerHTML + '*(';
                            display.innerHTML = '';
                            bracks.push('(');
                            break;
                        } else {
                            keep.innerHTML += display.innerHTML + ')';
                            display.innerHTML = '';
                            bracks.push(')');
                            break;
                        }
                    } else {
                        keep.innerHTML += display.innerHTML + '(';
                        display.innerHTML = '';
                        bracks.push('(');
                        break;
                    }
                }
            case 'dot':
                if (symbs.includes(aray.at(-1)) || aray.at(-1) == 'Math Error') {
                    break;
                } else {
                    display.innerHTML += '.';
                    aray.push('.');
                    break;
                }
            case '%':
                handleCase('%');
                break;
            case '+':
                handleCase('+');
                break;
            case '-':
                handleCase('-');
                break;
            case '*':
                handleCase('*');
                break;
            case '/':
                handleCase('/');
                break;
            case 'eq':
                try{
                    var storeEval = keep.innerHTML + display.innerHTML;
                    if(operators.includes(storeEval.at(-1))){
                        storeEval = storeEval.slice(0, -1);
                    }
                    display.innerHTML = eval(storeEval);
                    keep.innerHTML = '';
                    break;
                } catch {
                    keep.innerHTML += display.innerHTML;
                    display.innerHTML = 'Math Error';
                    break;
                }
            case 'numbers':
                display.outerHTML = display.outerHTML + display.innerHTML
            case 'ce':
                keep.innerHTML = '';
                display.innerHTML = '';
                aray = [];
                bracks = [')'];
                break;
            case 'bksp':
                if (aray.at(-1) == 'Math Error') {
                    break;
                } else {
                    var hold = ''; 
                    if(display.innerHTML == '') {
                        hold = keep.innerHTML.at(-1);
                        keep.innerHTML = keep.innerHTML.slice(0,-1);
                        aray = aray.slice(0,-1);
                    } else {
                        hold = display.innerHTML.at(-1)
                        display.innerHTML = display.innerHTML.slice(0,-1);
                        aray = aray.slice(0,-1);
                    }
                    if (hold == '(') {
                        bracks.push (')');
                    } else if (hold == ')') {
                        bracks.push ('(')
                    }
                    console.log(hold);
                    break;
                }
            default:
                if (aray.at(-1) == 'Math Error') {
                    break;
                } else {
                    var curSelect = evt.target.id;
                    if (bracks.at(-1) == ')' && bracks.length > 2 && (!(symbs.includes(aray.at(-1))))) {
                        curSelect = '*' + curSelect;
                        bracks = [bracks.at(-1)];
                    }
                    display.innerHTML += curSelect;
                    aray.push(evt.target.id);
                    break;
                };
        };
        if (display.innerHTML == 'Math Error') {
            if (aray.at(-1) == 'Math Error') {       
                aray = aray.slice(0,-1);
            }
            aray.push('Math Error');
        }
        if (aray.length > 3) {
            aray = aray.slice(1);
        }
        if (bracks.length > 5) {
            bracks = bracks.slice(1);
        }
        console.log(aray);
        console.log(bracks);
    });
})
