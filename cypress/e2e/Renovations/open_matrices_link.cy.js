describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
    });
    cy.fixture(`data/${data_path}/renovations/renovations_page/data`).then(function (data) {
      this.data = data;
    });
  });
  
  describe("Documents -> Project/Matrices -> Renovation", function () {
    it("fc-4256 To Verify User is able to open Matrices Link <Smoke>", function () {
      cy.execute('script/Renovations/renovations_page',this.data);
      cy.contains(this.data['project_name']).parent().find('td').eq(2).find('a').invoke('removeAttr', 'target').click({force: true});
      cy.wait(10000);
      cy.contains('h1','Matrices').should('exist');
    });
  });
});