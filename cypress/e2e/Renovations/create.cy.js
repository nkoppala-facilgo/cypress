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
        describe("Automation || To create new renovation", function () {
          it("fc-1539 create new renovation <Smoke>", function () {
            cy.execute('script/Renovations/renovations_page',this.data);
            cy.contains('span','Create New Renovation').click();
            cy.wait(10000);
            cy.execute('script/Renovations/create',this.data);
          });
        });
});