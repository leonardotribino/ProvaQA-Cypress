import { faker } from '@faker-js/faker';

let boardId = '';
let cardId = '';

describe('Testes API do Trello', () => {

  it('CT01 - Deve criar um novo board com nome Válido', () => {
    const newBoard = faker.company.name();
    cy.createBoard(newBoard)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).be.not.null;
        expect(response.body.name).to.eq(newBoard);
    });
  });

  it('CT02 - Deve criar um novo board com nome vazio', () => {
    cy.createBoard('')
      .then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('CT03 - Deve criar um card no board com dados válidos', () => {
    const newBoard = faker.company.name();
    const cardName = faker.commerce.productName();
    cy.createBoard(newBoard).then((response) => {
      expect(response.status).to.eq(200);
      boardId = response.body.id;
      cy.returnIdListBoard(boardId).then((listId) => {  
        cy.createCard(cardName, listId)
          .then((response) => {
            expect(response.status).to.eq(200);
            cardId = response.body.id;
        });
      })
    })
  });

  it('CT04 - Deve criar um card no board com lista inexistente', () => {
    const cardName = faker.commerce.productName();
    cy.createCard(cardName, null)
      .then((response) => {
        expect(response.status).to.eq(400);
        cardId = response.body.id;
    });
  });

  it('CT05 - Deve excluir o card com Id válido', () => {
    const newBoard = faker.company.name();
    const cardName = faker.commerce.productName();
    cy.createBoard(newBoard).then((response) => {
      expect(response.status).to.eq(200);
      boardId = response.body.id;
      cy.returnIdListBoard(boardId).then((listId) => {  
        cy.createCard(cardName, listId)
          .then((response) => {
            expect(response.status).to.eq(200);
            cardId = response.body.id;          
            cy.deleteCard(cardId).then((response) => {
              expect(response.status).to.eq(200);
            });
        });
      })
    })
  });

  it('CT06 -Deve excluir o card com Id inválido', () => {
    cy.deleteCard(9999999999).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('CT07 - Deve excluir o board com Id válido', () => {
    const newBoard = faker.company.name();
    cy.createBoard(newBoard).then((response) => {
      expect(response.status).to.eq(200);
      boardId = response.body.id;
      cy.deleteBoard(boardId).then((response) => {
        expect(response.status).to.eq(200);
      })
    })
  });

  it('CT08 - Deve excluir o board com Id inválido', () => {
    cy.deleteBoard(999999999).then((response) => {
      expect(response.status).to.eq(400);
    })
  });

  it('CT09 - Tenta criar um board com tentativa de SQL Injection', () => {
    cy.createBoard("'; DROP TABLE users; --").then((response) => {
      expect(response.status).to.not.eq(500);
      expect(response.status).to.be.oneOf([200, 400]); 
    });
  });
});
