let input = document.querySelector(".input");
let figure = document.querySelector(".calculator-figure");

let input_value = "0"; // input başlangıç değeri
let first_value = null; // değerlerin saklandığı değişken
let operator = null;
let waitingForSecondValue = false; // ikinci değer girilmeden önce kontrol eden değişken


function updateInput(){
    input.value = input_value;
}
updateInput ();


figure.addEventListener('click', function(e) {
    let element = e.target;

    // buton olmayan elementlerde kod çalıştırmaz
    if(!element.matches('button')) return;

    if(element.classList.contains('operator')){
        // console.log('operator', element.value);
        handleOperator(element.value);
        updateInput();
        return;
    }
    if(element.classList.contains('clear')){
        // console.log('clear', element.value);
        clear();
        updateInput();
        return;
    }
    if(element.classList.contains('delete')){
        del();
        updateInput(element.value);
        return;
    }
    if(element.classList.contains('decimal')){
        // console.log('decimal', element.value);
        inputDecimal(element.value);
        updateInput();
        return;
    }
    
    // console.log('number', element.value);
    inputNumber(element.value); // girilen sayı bilgisini vermesi için
    updateInput();
});

function handleOperator(nextOperator){
    const value = parseFloat(input_value);

    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if(first_value === null){
        first_value = value;
    }else if(operator){
        const result = calculate(first_value, value, operator); // işlemlerde alınacak bilgiler

        input_value = `${parseFloat(result.toFixed(4))}`; // virgülden sonra 4 rakam yazdırır
        first_value = result; // firstvalue ile tekrar işlem yapılabilsin diye sonuç oraya aktarılır
    }

    waitingForSecondValue = true; // ikinci değer bekleniyor
    operator = nextOperator;

    console.log(input_value, first_value, operator, waitingForSecondValue);

}

// işlem alanı
function calculate(first, second, operator){
    if(operator === "+"){
        return first + second;
    }else if(operator === "-"){
        return first - second;
    }else if (operator === "X"){
        return first * second;
    }else if(operator === "%"){
        return first / second;
    }
    return second; // operatörlerden eşittire tıklandığında tekrar kendi değerini döndürür
}

function inputNumber(num){ // ikinci değer girilirken çalışan fonk.
    if(waitingForSecondValue){
        input_value = num; // ikinci değer
        waitingForSecondValue = false;
    }else{
        input_value = input_value === "0" ? num: input_value +num; // inputtaki başlangıç değeri (0) yerine girilen sayıyı yazdırması için
    }

    console.log(input_value, first_value, operator, waitingForSecondValue);
}

function inputDecimal(){
    if(!input_value.includes(",")){ // , operatörünün daha önce gönderilip gönderilmediğini kontrol edip yalnızca 1 defa göndermek için kontrol sağlar 
        input_value += ",";
    }
}

function clear(){
    input_value = "0";
}

function del(){
    input_value = input_value.toString().slice(0,-1); // inputtan en son sayıyı siler
}