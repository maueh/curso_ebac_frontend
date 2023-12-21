function Personagem(nome) {
  let _nome = nome;
  let _hp = 100;
  let _xp = 1;
  let _isDead = false;

  this.getNome = function () {
    return _nome;
  };

  this.setHp = function (novoHp) {
    _hp = novoHp;
  };

  this.getHp = function () {
    return _hp;
  };

  this.setXp = function (valor) {
    _xp = valor;
  };

  this.getXp = function () {
    return _xp;
  };

  this.setIsDead = function () {
    _isDead = true;
  };

  this.getIsDead = function () {
    return _isDead;
  };

  this.showStatus = function () {
    console.log(`${_nome} está com ${_hp} pontos de HP e ${_xp} pontos de XP`);
  };

  this.atacar = function (personagemAtacado) {
    console.log(`${_nome} atacou ${personagemAtacado.getNome()}`);
    personagemAtacado.receberDano(this);
  };

  this.receberDano = function (personagemAtacando) {
    let hp_perdido = Math.floor(personagemAtacando.getXp() * 0.75 + 1);
    this.setHp(_hp - hp_perdido);
    console.log(`${_nome} perdeu ${hp_perdido} pontos de vida.`);

    if (_hp <= 0) {
      _hp = 0;
      this.setIsDead();
      this.aoMorrer(personagemAtacando);
    }
  };

  this.aoMorrer = function (personagemAtacando) {
    console.log(`O personagem morreu!`);
  };
}

// Construtor da Classe Heroi que herda Classe Personagem
function Heroi(nome) {
  Personagem.call(this, `🦸‍ ${nome}`);

  // Método para gerenciar o XP do herói
  this.ganharXp = function (personagemDerrotado) {
    let xp_ganhos = Math.ceil(personagemDerrotado.getXp() * 0.25);
    this.setXp(this.getXp() + xp_ganhos);
    console.log(`Você ganhou ${xp_ganhos} pontos de experiência!\n`);
  };

  this.aoMorrer = function (personagemAtacando) {
    console.log(
      `\nGAME OVER!\n${personagemAtacando.getNome()} ganhou de você.`
    );
  };
}

// Construtor da Classe Inimigo que herda Classe Personagem
function Inimigo(nome, xp) {
  Personagem.call(this, `${nome}`);
  this.setXp(xp);
  this.setHp(xp * 4);

  this.aoMorrer = function (personagemAtacando) {
    console.log(`\n${this.getNome()} foi derrotado!`);
    personagemAtacando.ganharXp(this);
  };
}

// Construtor da Classe Chefao que herda Classe Inimigo
function Chefao(nome) {
  Inimigo.call(this, `🧛 ‍${nome}`);
  this.setHp(50);
  this.setXp(10);

  this.exibirMensagemAoMorrer = function (personagemAtacando) {
    console.log(`\nO chefão ${this.getNome()} foi derrotado!`);
    personagemAtacando.ganharXp(this);
  };
}

// Criacao da instancia heroi
const heroi = new Heroi("Super-Dev");

// Criacao de array com instancias dos inimigos
const inimigosMin = 5;
const inimigosMax = 16;
const qtdeInimigos = Math.round(
  Math.random() * (inimigosMax - inimigosMin) + inimigosMin
);
let frotaInimigos = [];
for (i = 0; i < qtdeInimigos; i++) {
  frotaInimigos[i] = new Inimigo(
    `🧟‍ Capanga ${i + 1}`,
    Math.floor(i / 2) + Math.round(Math.random())
  );
}
console.log(
  `\nOlá ${heroi.getNome()}!\nVocê está com ${heroi.getHp()} pontos de vida e ${heroi.getXp()} ponto de experiência.`
);
console.log(
  `\nObjetivo da missão: Derrotar o Drácula e seus ${qtdeInimigos} capangas.\n\nPrepase-se, aí vem o primeiro.\n`
);

// Inicio do jogo
let fimJogo = false;
let indice = 0;
do {
  heroi.atacar(frotaInimigos[indice]);
  if (frotaInimigos[indice].getIsDead()) {
    indice++;
  } else {
    frotaInimigos[indice].atacar(heroi);
    if (heroi.getIsDead()) {
      fimJogo = true;
    }
  }
} while (indice < qtdeInimigos && !fimJogo);

heroi.showStatus();
if (!fimJogo) {
  console.log(`\nVocê derrotou todos os capangas do Drácula!`);
  console.log(`Agora, prepare-se para enfrentá-lo cara a cara:\n`);
}

// Chefao final
const boss = new Chefao("Drácula");

while (!fimJogo) {
  boss.atacar(heroi);
  if (heroi.getIsDead()) {
    console.log(`☠ ☠ ☠\n`);
    fimJogo = true;
  } else {
    heroi.atacar(boss);
    if (boss.getIsDead()) {
      heroi.showStatus();
      console.log(`\n🎉 QUE VITÓRIA! Você derrotou o terrível Drácula!\n`);
      fimJogo = true;
    }
  }
}
