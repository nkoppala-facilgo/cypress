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
      it("fc-3862 Refresh Button : To Verify Refresh Fuctionality from Matrices filter page <smoke>", function () {
        cy.execute('script/matrices/matrices_page',this.data);
        cy.select_by_placeholder('Matrices',this.data.Matrix_Name);
        cy.wait(5000);
       cy.get(':nth-child(1) > .btn-toolbar > .btn-success').click({force: true});
      });
    });
});
  
