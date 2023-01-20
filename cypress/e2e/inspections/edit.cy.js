describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
    cy.fixture(`data/${data_path}/inspections/create/data`).then(function(data) {
        this.create_data = data;
    })
    cy.fixture(`data/${data_path}/inspections/edit/data`).then(function(data) {
        this.edit_data = data;
    })
})
describe("To verify Edit Inspection button functionality.", function() {
    it('Fc-1328 Edit new inspection <smoke>', function() {
        cy.visit()
        cy.wait(3000)
        cy.get(".icon-menu-work-order").click()
        cy.contains('a', 'Create Inspections').click({ force: true })
        cy.wait(3000)
        cy.execute('script/inspections/create', this.create_data)
        cy.wait(3000)
        cy.contains("Documents").click()
        cy.contains('a', 'Inspections').click({ force: true })
        cy.get('#js-react-InspectionFilterModalToggle').find('i').click()
        cy.wait(5000)
        cy.on('uncaught:exception', (err, runnable) => { return false })
        cy.execute('script/inspections/edit', this.edit_data)

    });
});
});