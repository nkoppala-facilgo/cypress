describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspections/create/data`).then(function(data) {
            this.data = data;
        })
    });
    describe("after creating inspection attach the files", function() {
        it('complete new inspection ', function() {
            cy.visit();
            cy.wait(7000);
            cy.contains("Documents").click()
            cy.contains('a', 'Inspections').click({ force: true });
            cy.on('uncaught:exception', (err, runnable) => {return false})
            cy.contains('a', 'Create Inspection').click({ force: true })
            cy.wait(3000)
            cy.get('i[class=\'clickable-icon fa fa-chevron-circle-down\']').click();
            cy.execute('script/inspections/create', this.data)
            cy.wait(5000)
            cy.execute('script/inspection/complete',this.data)
        });
    });
});