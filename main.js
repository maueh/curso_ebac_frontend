// Array de alunos
const listaAlunos = [
  {
    nome: "Aline",
    nota: 6,
  },
  {
    nome: "Bia",
    nota: 9,
  },
  {
    nome: "Carlos",
    nota: 5.5,
  },
  {
    nome: "Davi",
    nota: 6,
  },
  {
    nome: "Elena",
    nota: 9.5,
  },
  {
    nome: "Fábio",
    nota: 4.5,
  },
  {
    nome: "Giovana",
    nota: 8.5,
  },
  {
    nome: "Heitor",
    nota: 7,
  },
  {
    nome: "Iara",
    nota: 6,
  },
  {
    nome: "Julio",
    nota: 2.5,
  },
  {
    nome: "Katia",
    nota: 1,
  },
  {
    nome: "Lucas",
    nota: 3,
  },
  {
    nome: "Miriam",
    nota: 5,
  },
  {
    nome: "Nadia",
    nota: 5.5,
  },
  {
    nome: "Oscar",
    nota: 2,
  },
  {
    nome: "Paulo",
    nota: 7,
  },
  {
    nome: "Quiteria",
    nota: 7,
  },
  {
    nome: "Rodrigo",
    nota: 4.5,
  },
  {
    nome: "Sara",
    nota: 10,
  },
  {
    nome: "Tiago",
    nota: 4,
  },
  {
    nome: "Ursula",
    nota: 8,
  },
  {
    nome: "Vitor",
    nota: 9.5,
  },
  {
    nome: "Wesley",
    nota: 5,
  },
  {
    nome: "Xandy",
    nota: 6.5,
  },
  {
    nome: "Yago",
    nota: 10,
  },
  {
    nome: "Zania",
    nota: 8,
  },
];

console.log("Lista de alunos:");
listaAlunos.forEach((aluno) =>
  console.log(`● ${aluno.nome} - Nota: ${aluno.nota} `)
);

// Função para listar alunos com notas maior ou igual a 6
function Aprovados(lista) {
  const alunosAprovados = lista.filter((aluno) => aluno.nota >= 6);
  return alunosAprovados;
}

// Lista de alunos aprovados
console.log(`\nLista de alunos aprovados:`);
Aprovados(listaAlunos).forEach((aluno) =>
  console.log(`● ${aluno.nome} - Nota: ${aluno.nota} `)
);
