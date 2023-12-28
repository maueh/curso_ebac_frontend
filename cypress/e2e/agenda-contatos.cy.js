/// <reference types="cypress" />

describe("Testes para as funcionalidades da Agenda de Contato", () => {
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app");
  });

  it("Checar inclusão de novo contato", () => {
    let qtdeContatos;
    cy.get(".contato")
      .its("length")
      .then((length) => {
        qtdeContatos = length;
        cy.get(".contato").should("have.length", qtdeContatos);

        cy.get("input[placeholder=Nome]").type("Vania");
        cy.get("input[placeholder=E-mail]").type("exemplo@foo.com.br");
        cy.get("input[placeholder=Telefone]").type("11 1234-5678");
        cy.get(".adicionar").click();
        qtdeContatos = qtdeContatos + 1;
        cy.get(".contato").should("have.length", qtdeContatos);
      });
  });

  it("Checar edição de contato", () => {
    const novosDadosContato = {
      nome: "Ana Fulana",
      email: "anafulana@exemplo.com",
      telefone: `55 11 98765-100${Math.round(Math.random() * 10)}`,
    };

    cy.get(".contato").last().find(".edit").click();
    cy.get("input[placeholder=Nome").clear().type(novosDadosContato.nome);
    cy.get("input[placeholder=E-mail]").clear().type(novosDadosContato.email);
    cy.get("input[placeholder=Telefone]")
      .clear()
      .type(novosDadosContato.telefone);
    cy.get(".alterar").click();

    cy.get(".contato")
      .last()
      .find("li")
      .first()
      .should("contain.text", novosDadosContato.nome);
    cy.get(".contato")
      .last()
      .find("li")
      .last()
      .should("contain.text", novosDadosContato.email);
    cy.get(".contato")
      .last()
      .find("li:nth-child(2)")
      .should("contain.text", novosDadosContato.telefone);
  });

  it("Checar remoção de contato", () => {
    let qtdeContatos;
    cy.get(".contato")
      .its("length")
      .then((length) => {
        qtdeContatos = length;
        cy.get(".contato").should("have.length", qtdeContatos);

        cy.get(".contato").last().find(".delete").click();
        qtdeContatos = qtdeContatos - 1;
        cy.get(".contato").should("have.length", qtdeContatos);
      });
  });
});
