describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc2.username,data.pmc2.password);
        });
        cy.fixture(`data/${data_path}/matrices/goto_page_functionality/data`).then(function (data) {
          this.data = data;
        })
    });
  
    describe("Documents -> Project/Matrices -> Matrices", function () {
        it("fc-3872 Goto Page Functionality : User should be able to land on the expected page using the Goto Page functionality <smoke>", function () {
            cy.execute('script/matrices/matrices_page',this.data);
            cy.execute('script/matrices/goto_page_functionality',this.data);
        });
    });
});
  