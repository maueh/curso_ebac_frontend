$(document).ready(function () {
    
    $('form').on('submit', function (e) {
        e.preventDefault();
    });

 	//Declaração de máscara para CPF   
    $('#cpf').mask('000.000.000-00', {
        placeholder: '000.000.000-00'
    });

   	//Declaração de máscara para CEP
    $('#cep').mask('00000-000',
    {
        placeholder: '00000-000'
    });
    
    //Declaração de máscara para telefones
    var opcoesTelefone = {
        onKeyPress: function (telefone, e, field, opcoes) {
            var masks = ['(00) 00000-0000', '(00) 0000-00009'];
            var mask = (telefone.replace(/\D/g, '').length === 11) ? masks[0] : masks[1];
            $('.phone').mask(mask, opcoes);
        },
        placeholder: 'DDD + Telefone fixo ou móvel'
    };
    $('.phone').mask('(00) ', opcoesTelefone);

    $('form').on('submit', function(e){
        console.log(e.target);
    });
})