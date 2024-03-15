// global variable ( global değişken)
const calculator = {
    displayValue: '0', 
    firstEnteredValue: null,
    waitingForSecondValue: false,
    operator: null,
  };
  

  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    console.log(event);
    const { target } = event;
    // console.log(target);

    if (!target.matches('button')) { //  "button dışındaki yerlere tıklandığında bu if çalışır.
      // console.log('matches')
      return;
    }
  
    // Eğer tıklanan elementin class listesinde 'operator' sınıfı varsa,
    if (target.classList.contains('operator')) { 
      handleOperator(target.value); // target'ın içindeki attributte olan value olan yere erişiyor
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay(); 
      return;
    }
  
    // console.log('value', target.value)
    // console.log('type',typeof(target.value))
    inputDigit(target.value);
    console.log(target.value);
    updateDisplay();
  });



  function inputDigit(digit) {
    // console.log("digit", digit)
    const { displayValue, waitingForSecondValue } = calculator; // Destructuring assignment (yapısal atama), 
    
    if (waitingForSecondValue === true) {
      calculator.displayValue = digit;
      // console.log('displayValue',calculator.displayValue);
      calculator.waitingForSecondValue = false;
      // debugger
    } else {
      // ternary (üçlü) operatör
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
      // Eğer displayValue değişkeninin değeri '0' (string '0')'a eşitse, o zaman calculator.displayValue'ya digit değeri atanır.
      // Eğer displayValue değişkeninin değeri '0' değilse, o zaman calculator.displayValue'ya displayValue + digit ifadesi atanır.
 // debugger
    }
  }

  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  function inputDecimal(dot) {
    // 'displayValue' ondalık nokta içermiyorsa
    if (!calculator.displayValue.includes(dot)) {
      // Ondalık noktayı ekle
      calculator.displayValue += dot;
      // calculator.displayValue = calculator.displayValue + dot // kısaltımı
    }
  }
  
  function handleOperator(nextOperator) {
    console.log('nextOperator' , nextOperator)
    const { firstEnteredValue, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondValue)  {
      calculator.operator = nextOperator;
      return;
    }
    console.log('gectiiii')
  
    if (firstEnteredValue == null) {
      calculator.firstEnteredValue = inputValue; // Bu durum, kullanıcının ilk sayıyı girdiği durumu temsil eder.
      console.log('calculator.firstEnteredValue', calculator.firstEnteredValue)
    } else if (operator) {
      const currentValue = firstEnteredValue || 0;
      console.log('currentValue', currentValue)
                                              // nullish coalescing(nullish birleştirme) 
                                              //  Eğer firstEnteredValue bir truthy değere sahipse, firstEnteredValue değeri currentValue'ya atanır. 
                                              //Eğer firstEnteredValue bir falsy değere sahipse (null, undefined, false, 0, vb.), 0 değeri currentValue'ya atanır.
      const result = performCalculation[operator](currentValue, inputValue);
      calculator.displayValue = String(result);
      calculator.firstEnteredValue = result;
      
    }
  
    calculator.waitingForSecondValue = true;
    calculator.operator = nextOperator;
    console.log("calculator ", calculator)
  }
  
  const performCalculation = {
    // key: (value (string, number, function)
    '/': (firstValue, secondValue) => firstValue / secondValue,
  
    '*': (firstValue, secondValue) => firstValue * secondValue,
  
    '+': (firstValue, secondValue) => firstValue + secondValue,
  
    '-': (firstValue, secondValue) => firstValue - secondValue,
  
    '=': (firstValue, secondValue) => secondValue // eşittir operatörüne tıklanması durumunda, ikinci value'nın bir sonraki işlemde birinci value olarak kullanılması anlamına gelir.
  };
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstEnteredValue = null;
    calculator.waitingForSecondValue = false;
    calculator.operator = null;
  }