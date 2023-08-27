let box = document.getElementById("box");
let buttons = document.querySelectorAll("button");

let string = "";
let array = Array.from(buttons);
array.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '='){
            string = eval(string);
            box.value = string;
        }
        else if(e.target.innerHTML == 'AC'){
            string = '';
            box.value = string;
        }
        else if(e.target.innerHTML == 'DEL'){
            string = string.substring(0 , string.length-1);
            box.value = string;
        }
        else{string += e.target.innerHTML;
        box.value = string;}
    })
})