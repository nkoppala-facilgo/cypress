
describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/save_comment_as_template/data`).then(function (data) {
          this.data = data;
        })
        })
    describe("WO  Save Comment as Template button functionality", function() {
        it('fc-6897 Verify Save Comment as Template button functionality <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains("Documents").click();
            cy.contains("a", "Work Orders").click({ force: true });
            cy.wait(4000)
            cy.get('.btn-show-work-order').first().click()
            cy.wait(4000)
            cy.get('#js-react-WorkOrderConversationHistory').contains('Conversation History').should('exist')
            cy.get('textarea[placeholder=\"Type here...\"]').type(this.data['notes'])
            cy.get('.btn-default ').contains('button','Save Comment as Template').click()
            cy.get('#template-name').type(this.data['template_name'])
            cy.get('.modal-footer  .btn-primary').contains('Save to Template').click()
            cy.contains('Template was created.').should('exist')
        });
    });
});