describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.fixture(`data/${data_path}/matrices/create_matrices/data`).then(function (data) {
        this.data = data;
      })
    });
  
    describe("Documents -> Project/Matrices -> Matrices", function () {
      it(" fc-3855 Create Matrices Button : Create Matrices from left menu navigation.", function () {
        cy.execute('script/matrices/matrices_page',this.data);
        cy.get('.content-header-fancy').contains('a','Create Matrix').click({force: true});
        cy.wait(2000)
        cy.execute('script/matrices/create_matrices',this.data);
      });
    });
});
  
