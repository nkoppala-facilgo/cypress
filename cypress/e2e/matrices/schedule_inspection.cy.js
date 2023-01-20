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
      it("fc-3855 Schedule Inspection Button : Create Schedule Inspection from Matrices", function () {
        cy.execute('script/matrices/matrices_page',this.data);
        cy.select_by_placeholder('Matrices',this.data.Matrix_Name);
        cy.wait(5000);
        cy.get('.content-header-fancy').contains('button','Schedule Inspection').click({force: true});
        cy.wait(5000)
        cy.execute('script/matrices/schedule_inspection',this.data);
      });
    });
});
  
