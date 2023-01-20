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
    it("fc-4256 To verify user is able to open 'Renovation Rent Comparison <Smoke>", function () {
      cy.execute('script/Renovations/renovations_page',this.data);
      cy.get('#js-react-RenovationTable').find('table').find('tbody').find('tr').first().find('td').first().find('i').eq(0).click({force: true});
      cy.wait(2000);
      cy.contains('Renovation Rent Comparison').invoke('removeAttr', 'target').click({force: true});
      cy.wait(10000);
      cy.contains('RENOVATION RENT COMPARISON').should('exist');
    });
  });
});