
describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/save_as_note/data`).then(function (data) {
            this.data = data;
        })
    })
    describe("WO Save as Note button functionality.", function() {
        it('fc-6898 Verify Save as Note button functionality <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains("Documents").click();
            cy.contains("a", "Work Orders").click({ force: true });
            cy.wait(4000)
            cy.get('.btn-show-work-order').first().click()
            cy.wait(4000)
            cy.get('#js-react-WorkOrderConversationHistory').contains('Conversation History').should('exist')
            cy.get('textarea[placeholder=\"Type here...\"]').type(this.data['notes'])
            cy.get('.btn-toolbar .btn-primary').contains('Save As Note').click()
            cy.contains('Your note was saved.').should('exist')
        });
    });
});