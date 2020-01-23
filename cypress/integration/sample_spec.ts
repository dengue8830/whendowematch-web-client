describe('My First Test', function() {
  it('Does not do much!', function() {
    cy.server();
    cy.route({
      method: 'post',
      url: 'http://localhost:3001/api/auth/register',
      response: {
        token: 'sometoken',
        user: {
          id: '1',
          name: 'morty',
          color: 'teal',
          connectionStatus: 'connected'
        }
      }
    }).as('registerAPI');

    cy.visit('http://localhost:3000/');
    cy.get('input[name="username"]').type('morty');
    cy.get('button[name="go"]').click();

    cy.wait('@registerAPI');

    cy.get('.rbc-day-slot.rbc-time-column')
      .first()
      .trigger('mousedown', { which: 1, force: true })
      .trigger('mousemove', { clientX: 100, clientY: 500, force: true })
      .trigger('mouseup', { force: true });
  });
});
