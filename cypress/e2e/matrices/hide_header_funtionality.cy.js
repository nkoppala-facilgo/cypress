describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.fixture(`data/${data_path}/matrices/schedule_inspection/data`).then(function (data) {
        this.data = data;
      })
    });
  
    describe("Documents -> Project/Matrices -> Matrices", function () {
      it("fc-3868 Hide Header Button : To Verify Hide Header funtionality from Matrices filter page <smoke>", function () {
        cy.execute('script/matrices/matrices_page',this.data);
        cy.select_by_placeholder('Matrices',this.data.Matrix_Name);
        cy.wait(5000);
        cy.get('#js-react-TurnMatrix').contains('button','Hide Header').click({force: true});
      });
    });
});
  
