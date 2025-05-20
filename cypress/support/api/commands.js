const apiKey = Cypress.env('API_KEY_TRELLO');
const token = Cypress.env('TOKEN_TRELLO');

Cypress.Commands.add("returnIdListBoard",(boardId) => {
    cy.request({
      method: 'GET',
      url: `/1/boards/${boardId}/lists`,
      qs: {
        key: apiKey,
        token: token
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const listId = response.body[0].id;
      return listId
    });
});

Cypress.Commands.add("createBoard",(nameBoard) => {
  cy.request({
    method: 'POST',
    url: '/1/boards/',
    qs: {
      name: nameBoard,
      key: apiKey,
      token: token
    },
    failOnStatusCode: false
  }).then((response) => {
    return response
  });
});

Cypress.Commands.add("createCard",(nameCard, listId) => {
  cy.request({
    method: 'POST',
    url: '/1/cards',
    qs: {
      name: 'Meu Card',
      idList: listId,
      key: apiKey,
      token: token
    },
    failOnStatusCode: false
  }).then((response) => {
    return response
  });
});

Cypress.Commands.add("deleteCard",(cardId) => {
  cy.request({
    method: 'DELETE',
    url: `/1/cards/${cardId}`,
    qs: {
      key: apiKey,
      token: token
    },
    failOnStatusCode: false
  }).then((response) => {
    return response
  });
});

Cypress.Commands.add("deleteBoard",(boardId) => {
  cy.request({
  method: 'DELETE',
  url: `/1/boards/${boardId}`,
  qs: {
    key: apiKey,
    token: token
  },
  failOnStatusCode: false
  }).then((response) => {
    return response
  });
});