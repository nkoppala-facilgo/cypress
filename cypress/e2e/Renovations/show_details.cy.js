describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/renovations/show_details/data`).then(function (data) {
            this.data = data;
          });
        });       
        describe("Automation || To verify user is able to show details of created 'Renovation'.", function () {
          it("fc-1539 show details of created renovation <Smoke>", function () {
            cy.execute('script/Renovations/renovations_page',this.data);
            cy.wait(10000);
            cy.execute('script/Renovations/show_details',this.data);
          });
        });
});