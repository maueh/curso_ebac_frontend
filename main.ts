// Função de multiplicação de dois argumentos recebidos
function multiplicacao(numero1: number, numero2: number): number {
  return numero1 * numero2;
}

// Função de saudação
function saudacao(nome: string): string {
  return "Olá " + nome;
}

let resultadoMultiplicacao = multiplicacao(3, 9);
console.log(resultadoMultiplicacao);

let minhaSaudacao = saudacao("Joselito");
console.log(minhaSaudacao);
