describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/renovations/create/data`).then(function (data) {
            this.data = data;
          });
        });       
        describe("Automation || new renovation", function () {
          it("fc-6040 To verify user is able to remove Renovation ", function () {
            cy.execute('script/Renovations/renovations_page',this.data);
            cy.wait(4000)
            cy.get('.fa-sort-down').first().click()
            cy.contains('a','Remove').click()
            cy.contains('Remove Confirmation').should('exist')

            cy.contains('button','Yes').first().click()
          });
        });
});