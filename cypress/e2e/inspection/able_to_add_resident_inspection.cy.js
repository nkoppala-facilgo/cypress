describe("Session Login", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/inspection/able_to_add_resident_inspection/data`).then(function(data) {
        this.data = data;
    })
  });

  describe("To verify if the user is able to click the resident from the Inspectio", function () {
    it("FC-8157  user is able to click the resident from the Inspectio <regression>", function () {
      cy.visit();
      cy.execute("script/inspection/able_to_add_resident_inspection",this.data);
    });
  });
});
