$(document).ready(function () {
	$('form').on('submit', function (e) {
		e.preventDefault();
	})
	
	//_MÁSCARAS DE CAMPOS COM jQuery Mask Plugin
	//https://igorescobar.github.io/jQuery-Mask-Plugin/docs.html#on-the-fly-mask-changes
	
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
	
	//Declaração de máscara para CPF
	$('#cpf').mask('000.000.000-00', {
		placeholder: '000.000.000-00'
	});
	
	//Declaração de máscara para CEP
	$('#cep').mask('00000-000',
	{
		placeholder: '00000-000'
	});
	
	//_VALIDAÇÔES COM jQuery Validate Plugin
	
	// Adiciona método de validação de input de Nome Completo
	jQuery.validator.addMethod("nomeCompleto", function(value, element) {
		return this.optional(element) || /\D \D/.test(value);
	}, 
	"Informe seu nome completo"
	);
	
	// Adiciona método de validação de formato para o input de telefone fixo ou celular
	jQuery.validator.addMethod("telefone", function(value, element) {
		return this.optional(element) || /^\(\d\d\) \d?\d{4}-\d{4}$/.test(value);
	}, 
	"Telefone inválido"
	);
	
	// Adiciona método de validação de input de CPF
	jQuery.validator.addMethod("cpf", function(value, element) {
		/*
		//LOGS
		console.log("CPF:" + value + " element: " + element);
		console.log("otional: " + this.optional(element));
		console.log("test: " + /^\d{5}-\d{3}$/.test(value));
		console.log("return: " + this.optional(element) || /^\d{5}-\d{3}$/.test(value));
		*/
		let cpfValido = false;
		// Seleciona apenas os números do CPF informado
		let cpf = value.replace( /\D/g, "");
		// Realiza a validação do CPF apenas se o valor informado conter 11 dígitos numéricos
		if(cpf.length==11) {
			//console.log(`Seu CPF ${cpf} está sendo validado`);
			let d1 = validaDigito(cpf, 1);
			let d2 = validaDigito(cpf, 2);
			//console.log( d1, d2, dv);
			if( parseInt(cpf[9]) === d1 && parseInt(cpf[10]) === d2)
			cpfValido = true;
		}
		return this.optional(element) || ( /^\d{3}.\d{3}.\d{3}-\d{2}$/.test(value) && cpfValido );
	}, 
	"CPF inválido"
	);
	
	function validaDigito(cpf, posicaoDigito){
		let digito=0;
		for(i=0; i<8+posicaoDigito; i++){
			digito += parseInt(cpf[i]) * (9+posicaoDigito-i);
		}
		digito = digito % 11;
		if( digito === 1 ) digito = 0;
		else digito = 11 - digito;
		return digito;
	}
	
	// Adiciona método de validação de formato para o input de CEP
	jQuery.validator.addMethod("cep", function(value, element) {
		/*
		// Logs
		console.log("otional: " + this.optional(element));
		console.log("test: " + /^\d{5}-\d{3}$/.test(value));
		console.log("return: ", (this.optional(element) || /^\d{5}-\d{3}$/.test(value)));
		*/
		return this.optional(element) || /^\d{5}-\d{3}$/.test(value);
	}, 
	"Formato de CEP inválido"
	);
	
	// Declara as regras de validação do formulário e define o submit
	
	$('form').validate({
		rules: {
			nomeCompleto: {
				nomeCompleto: true,
				required: true
			},
			email: {
				email: true,
				required: true
			},
			telefone: {
				telefone: true,
				required: true
			},
			cpf: {
				cpf: true,
				required: true
			},
			endereco: {
				required: true
			},
			cep: {
				cep: true,
				required: true
			}
		},
		submitHandler: function(form) {
			const nome= $('#nomeCompleto').val();
			const email= $('#email').val();
			const telefone = $('#telefone').val();
			const cpf = $('#cpf').val();
			const endereco = $('#endereco').val();
			const cep= $('#cep').val();
			confirm(`Verifique se os dados estão corretos: \n\nNome: ${nome} \nE-mail: ${email} \nTelefone: ${telefone} \nCPF: ${cpf} \nEndereço: ${endereco} - CEP: ${cep} \n\nConfirmar?`);
			console.log(form);
			$('button[type=reset]').show();
		}
	});
	
	$('button[type=reset]').on('click', function (e) {
		console.log(e);
		$(e.target).hide();
		console.log($('input:first-of-type'));
		$('input:first-of-type')[0]	.focus();
	}); 
})