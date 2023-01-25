console.log("Script funcionando");

const form = document.querySelector('#form-numbers');
const caixaMensagem = document.querySelector('#message');


function validaCampos(a, b) {
    const fieldA = document.getElementById(a);
    const fieldB = document.getElementById(b);
    const numberA = parseInt(fieldA.value);
    const numberB = parseInt(fieldB.value);

    console.log(numberA);
    console.log(numberB);
    console.log(numberA < numberB);

    if(numberA < numberB) {
        console.log("Sucesso");
        caixaMensagem.classList.add('sucess');
        caixaMensagem.innerHTML = `<h2>Formulário válido!</h2><strong>Muito bem!</strong> O número <strong>${numberB}</strong> é maior que o número <strong>${numberA}</strong>.`;
        fieldA.value = '';
        fieldB.value = '';
    } else {
        console.log("Erro");
        caixaMensagem.classList.add('error');
        caixaMensagem.innerHTML = `<h2>Formulário inválido!</h2>O número <strong>${numberA}</strong> é maior ou igual ao número <strong>${numberB}</strong>.`;
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    caixaMensagem.classList.remove('sucess');
    caixaMensagem.classList.remove('error');
    validaCampos('number-a', 'number-b');
});
