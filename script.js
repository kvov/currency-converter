const fromCurrencyBtns = document.querySelectorAll('.fromCurrency'); //all 5 currency buttons from
const toCurrencyBtns = document.querySelectorAll('.toCurrency'); //all 5 currency buttons to
const fromCurrencySelectBtn = document.querySelector('.fromCurrencySelect'); //select btn from
const toCurrencySelectBtn = document.querySelector('.toCurrencySelect'); //select btn to
const fromCurrencyFixedBtns = document.querySelectorAll('.fromCurrencyFixed'); //4 fixed curreny btns from
const toCurrencyFixedBtns = document.querySelectorAll('.toCurrencyFixed'); //4 fixed curreny btns to

const currenciesAllFrom = document.querySelector('.currenciesAllFrom');
const currenciesAllTo = document.querySelector('.currenciesAllTo')

const inputFrom = document.querySelector('.input-from');
const outputTo = document.querySelector('.output-to');
const exchangeRate1 = document.querySelector('.rate-input');
const exchangeRate2 = document.querySelector('.rate-output');

const reverseCalc = document.querySelector('#sign');

let fromCurrency = 'RUB';
let toCurrency = 'USD';

let exchangeFromTo = 0;
let exchangeToFrom = 0;

let amount = 1;

//Loader
let mask = document.querySelector('.mask');

window.addEventListener('load', () => {
    setTimeout(() => {
        mask.classList.remove("hide");
        setTimeout(() =>{
          mask.classList.add("hide");
        }, 1000);
      }, 500); // delay 500 ms    
});

//API 
const getFromCurrency = async () => {
    if (fromCurrency === toCurrency) {
        console.log('Выберите разные валюты');
    }
    try {
        const response = await fetch(`https://api.ratesapi.io/api/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        const data = await response.json();
        exchangeFromTo = data.rates[toCurrency];
    } catch (err) {
        console.error(err);
        alert('Что-то пошло нет так');
    }
    exchangeRate1.innerHTML = `1 ${fromCurrency} = ${exchangeFromTo.toFixed(4)} ${toCurrency}`;
    exchangeRate2.value = exchangeRate1.value * exchangeFromTo.toFixed(4);
    calcInputFromTo();
}

const getToCurrency = async () => {
    if (fromCurrency === toCurrency) {
        console.log('Выберите разные валюты');
    }
    try {
        const response = await fetch(`https://api.ratesapi.io/api/latest?base=${toCurrency}&symbols=${fromCurrency}`)
        const data = await response.json();
        exchangeToFrom = data.rates[fromCurrency];
        
    } catch (err) {
        console.error(err);
        alert('Что-то пошло нет так');
    }
    exchangeRate2.innerHTML = `1 ${toCurrency} = ${exchangeToFrom.toFixed(4)} ${fromCurrency}`;
    calcInputFromTo();
}

// Purple for 4 fixed From buttons on click
fromCurrencyFixedBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        fromCurrency = elem.innerHTML
        fromCurrencyBtns.forEach((el) => {
            el.classList.remove('purpleSelected')
         })     
        elem.classList.add('purpleSelected');
        console.log(fromCurrency)
    })
})

//Calculating rates for 4 From fixed buttons on click
fromCurrencyFixedBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        getFromCurrency();
        getToCurrency();       
    })
})

//Purple and rates for Select From btns on change
fromCurrencySelectBtn.addEventListener('change', () => {
    fromCurrency = fromCurrencySelectBtn.value;
    getFromCurrency();
    getToCurrency();
    
    fromCurrencyBtns.forEach((el) =>{
        el.classList.remove('purpleSelected')
    })     
    fromCurrencySelectBtn.classList.add('purpleSelected');
    console.log(fromCurrency)
})

// Purple for 4 fixed To buttons on click
toCurrencyFixedBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        toCurrency = elem.innerHTML
        toCurrencyBtns.forEach((el) => {
            el.classList.remove('purpleSelected')
         })     
        elem.classList.add('purpleSelected');
        console.log(toCurrency)
    })
})

//Calculating rates for 4 fixed To buttons on click
toCurrencyFixedBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        getFromCurrency();
        getToCurrency();
    })
})

//Purple and rates for Select To btns on change
toCurrencySelectBtn.addEventListener('change', () => {
    toCurrency = toCurrencySelectBtn.value;
    getFromCurrency(); 
    getToCurrency(); 
    
    toCurrencyBtns.forEach((el) =>{
        el.classList.remove('purpleSelected')
    })     
    toCurrencySelectBtn.classList.add('purpleSelected');
    console.log(toCurrency)
})

//Input From value
inputFrom.addEventListener('input', () => {
    calcInputFromTo();
    getFromCurrency();
    getToCurrency();
})

function calcInputFromTo() {
    outputTo.value = (inputFrom.value * exchangeFromTo).toFixed(4);
}

//Input To value
outputTo.addEventListener('input', () => {
    calcInputToFrom()    
})

function calcInputToFrom() {
    inputFrom.value = (outputTo.value * exchangeToFrom).toFixed(4);
}

reverseCalc.addEventListener('click', () => {
    let a = fromCurrency;
    let b = toCurrency;
    fromCurrency = b;
    toCurrency = a;

   let selectFromIndex = fromCurrencySelectBtn.selectedIndex;
   let selectToIndex = toCurrencySelectBtn.selectedIndex;

   fromCurrencySelectBtn.getElementsByTagName('option')[selectToIndex].selected = 'selected';
   toCurrencySelectBtn.getElementsByTagName('option')[selectFromIndex].selected = 'selected';

   fromCurrencyBtns.forEach(el =>  
        el.classList.remove('purpleSelected'))
        fromCurrencyFixedBtns.forEach(el => {
        if (el.innerHTML === fromCurrency) {
            el.classList.add('purpleSelected');
        }          
    })

   if (document.querySelectorAll('.currenciesAllFrom div.purpleSelected').length === 0) {
        fromCurrencySelectBtn.classList.add('purpleSelected');
   }
   toCurrencyBtns.forEach(el => {
        el.classList.remove('purpleSelected')
    })
    toCurrencyFixedBtns.forEach(el => {
        if (el.innerHTML === toCurrency) {
            el.classList.add('purpleSelected');
        } 
    })

   if (document.querySelectorAll('.currenciesAllTo div.purpleSelected').length === 0) {
        toCurrencySelectBtn.classList.add('purpleSelected');
   }

    getFromCurrency();
    getToCurrency();
    
})
