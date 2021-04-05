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

let flag = false;

//Loader
let mask = document.querySelector('.mask');

const showLoader = function() {
    setTimeout(function() {
        if (!flag) { 
        mask.style.display = "flex";
        }
      }, 500); 

}
      
//API 
const fetchData = async () => {
    if (fromCurrency === toCurrency) {
        exchangeFromTo = 1;
        exchangeToFrom = 1;
        alert('Выберите разные валюты');
    } else try {
        showLoader();
        const response = await fetch(`https://api.ratesapi.io/api/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        const data = await response.json();
        exchangeFromTo = data.rates[toCurrency];
        
        const resp = await fetch(`https://api.ratesapi.io/api/latest?base=${toCurrency}&symbols=${fromCurrency}`)
        const data2 = await resp.json();
        exchangeToFrom = data2.rates[fromCurrency];
        flag = true;
        mask.style.display = "none";
        exchangeRate1.innerHTML = `1 ${fromCurrency} = ${exchangeFromTo.toFixed(4)} ${toCurrency}`; 
        exchangeRate2.innerHTML = `1 ${toCurrency} = ${exchangeToFrom.toFixed(4)} ${fromCurrency}`; 
        calcInputFromTo();  
    } catch (err) {
        console.error(err);
        alert('Что-то пошло нет так');
    }
    
    
    
}

fetchData();

// Purple for 4 fixed From buttons on click
fromCurrencyFixedBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        fromCurrency = elem.innerHTML
        fromCurrencyBtns.forEach((el) => {
            el.classList.remove('purpleSelected')
         })     
        elem.classList.add('purpleSelected');
    })
})

//Calculating rates for 4 From fixed buttons on click
fromCurrencyFixedBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        fetchData();       
    })
})

//Purple and rates for Select From btns on change
fromCurrencySelectBtn.addEventListener('change', () => {
    fromCurrency = fromCurrencySelectBtn.value;
    fetchData();
    
    fromCurrencyBtns.forEach((el) =>{
        el.classList.remove('purpleSelected')
    })     
    fromCurrencySelectBtn.classList.add('purpleSelected');
})

// Purple for 4 fixed To buttons on click
toCurrencyFixedBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        toCurrency = elem.innerHTML
        toCurrencyBtns.forEach((el) => {
            el.classList.remove('purpleSelected')
         })     
        elem.classList.add('purpleSelected');
    })
})

//Calculating rates for 4 fixed To buttons on click
toCurrencyFixedBtns.forEach((elem) => {
    elem.addEventListener('click', () => {
        fetchData();
    })
})

//Purple and rates for Select To btns on change
toCurrencySelectBtn.addEventListener('change', () => {
    toCurrency = toCurrencySelectBtn.value;
    fetchData(); 
    
    toCurrencyBtns.forEach((el) =>{
        el.classList.remove('purpleSelected')
    })     
    toCurrencySelectBtn.classList.add('purpleSelected');
    console.log(toCurrency)
})

//Input From value

function validate() {
    inputFrom.value = inputFrom.value.replace(/,/g, ".");
    console.log(inputFrom.value);
}

inputFrom.addEventListener('input', () => {
    calcInputFromTo();
    fetchData();
})

function calcInputFromTo() {
    outputTo.value = ((parseFloat(inputFrom.value)) * exchangeFromTo).toFixed(4);
}

//Input To value

function validate2() {
    outputTo.value = outputTo.value.replace(/,/g, ".");
    
}

outputTo.addEventListener('input', () => {
    calcInputToFrom();    
})

function calcInputToFrom() {
    inputFrom.value = ((parseFloat(outputTo.value)) * exchangeToFrom).toFixed(4);
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
   fetchData();   
})
