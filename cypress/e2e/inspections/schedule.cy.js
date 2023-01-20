describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
    cy.fixture(`data/${data_path}/inspections/schedule/data`).then(function(data) {
        this.data = data;
    })
})
describe("Create Inspection from dashboard", function() {
    it('FC-1129 schedule the inspection <smoke> ', function() {
        cy.visit()
        cy.wait(3000)
        cy.contains('Schedule Inspection').click({ force: true })
        cy.wait(3000)
        cy.execute('script/inspections/schedule', this.data)

    });
});
});