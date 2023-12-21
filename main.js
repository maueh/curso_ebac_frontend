function Personagem(nome) {
  let _nome = nome;
  let _hp = 100;
  let _xp = 1;
  let _isDead = false;

  this.showStatus = function () {
    console.log(`${_nome} | ❤ Vida: ${_hp} | 💪 XP: ${_xp}`);
  };

  this.getNome = function () {
    return _nome;
  };

  this.getXp = function () {
    return _xp;
  };

  this.getHp = function () {
    return _hp;
  };

  this.setXp = function (valor) {
    _xp = valor;
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
      if (this instanceof Heroi) {
        console.log(`\n`);
        this.showStatus();
        console.log(`\nGAME OVER!`);
      } else {
        console.log(`\n${_nome} foi derrotado!`);
        personagemAtacando.ganharXp(this);
      }
    }
  };

  this.setHp = function (novoHp) {
    _hp = novoHp;
  };

  this.ganharXp = function (personagemDerrotado) {
    let xp_ganhos = Math.ceil(personagemDerrotado.getXp() * 0.25);
    _xp = _xp + xp_ganhos;
    console.log(`Você ganhou ${xp_ganhos} pontos de experiência!\n`);
  };

  this.status = function () {
    console.log(`${_nome} - HP: ${_hp} - XP: ${_xp} - Defesa: ${_modoDefesa}`);
  };

  this.setIsDead = function () {
    _isDead = true;
  };

  this.getIsDead = function () {
    return _isDead;
  };
}

// Construtor da Classe Heroi que herda Classe Personagem
function Heroi(nome) {
  Personagem.call(this, `🦸‍ ${nome}`);
}

// Construtor da Classe Inimigo que herda Classe Personagem
function Inimigo(nome, xp) {
  Personagem.call(this, `${nome}`);
  this.setXp(xp);
  this.setHp(xp * 4);
}

// Construtor da Classe Chefao que herda Classe Inimigo
function Chefao(nome) {
  Inimigo.call(this, `🧛 ‍${nome}`);
  this.setHp(50);
  this.setXp(10);
}

// Criacao da instancia heroi
const heroi = new Heroi("Super-Dev");

// Criacao de array com instancias dos inimigos
let frotaInimigos = [];
for (i = 0; i < 10; i++) {
  frotaInimigos[i] = new Inimigo(
    `🧟‍ Capanga ${i + 1}`,
    Math.floor(i / 2) + Math.round(Math.random())
  );
}
console.log(
  `\nOlá ${heroi.getNome()}!\nVocê está com ${heroi.getHp()} pontos de vida e ${heroi.getXp()} ponto de experiência.`
);
console.log(
  `\nObjetivo da missão: Derrotar o Drácula e seus capangas.\n\nPrepase-se, aí vem o primeiro.\n`
);

// Inicio do jogo
let fimJogo = false;
let x = 0;
do {
  heroi.atacar(frotaInimigos[x]);
  if (frotaInimigos[x].getIsDead()) {
    x++;
  } else {
    frotaInimigos[x].atacar(heroi);
    if (heroi.getIsDead()) {
      fimJogo = true;
    }
  }
} while (x < 10 && !fimJogo);

heroi.showStatus();
if (!fimJogo) {
  console.log(`\nVocê derrotou todos os capangas do Drácula!`);
  console.log(`Agora, prepare-se para enfrentá-lo cara a cara:\n`);
}

// Chefao final
const boss = new Chefao("Drácula");

do {
  boss.atacar(heroi);
  if (heroi.getIsDead()) {
    console.log(`☠  QUE PENA! O Drácula aniquilou você!\n`);
    fimJogo = true;
  } else {
    heroi.atacar(boss);
    if (boss.getIsDead()) {
      heroi.showStatus();
      console.log(`\n🎉 PARABÉNS! Você derrotou o terrível Drácula!\n`);
      fimJogo = true;
    }
  }
} while (!fimJogo);
