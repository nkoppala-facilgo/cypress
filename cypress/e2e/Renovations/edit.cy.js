describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/renovations/edit/data`).then(function (data) {
            this.data = data;
          });
        });       
        describe("Automation || To verify user is able to edit 'Renovation project'.", function () {
          it("fc-1539 edit renovation <Smoke>", function () {
            cy.execute('script/Renovations/renovations_page',this.data);
            cy.wait(10000);
            cy.execute('script/Renovations/edit',this.data);
          });
        });
});