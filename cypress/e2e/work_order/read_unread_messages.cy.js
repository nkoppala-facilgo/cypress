describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              cy.on('uncaught:exception', (err, runnable) => { return false })
              });
          })
         describe("read unread messages on WO", function () {
           it('fc-6730 verify user is able to read unread messages on WO without any error. <smoke>', function () { 
                cy.on('uncaught:exception', (err, runnable) => {return false;});
                cy.visit()
                cy.wait(3000)
                cy.get('.unread-messages-icon').click()
                cy.wait(20000)
                cy.get('.modal-body a').first().should('have.attr', 'href')
                  .then((href) => {
                   cy.visit(href)
                })
                cy.wait(4000)
                cy.get('#js-react-WorkOrderConversationHistory .doc-messages-contaier  .title-container').contains('Conversation History').should('exist')
                cy.get('#tab-wo-conversation-history-tab-Supplier').click()
                cy.contains('button','Mark as Read').first().click({ force: true })
                cy.wait(2000)
                cy.contains('button','Mark as Unread').first().should('exist')
            });
    });
});
