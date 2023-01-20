describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/user/update/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/user/create/data`).then(function (data) {
      this.create_data = data;
    });
  });
  describe("able to update user", function () {
    it("search user and update them", function () {
      cy.visit("/user_management");
      cy.wait(8000);
      cy.get(".fa-filter").parent().click();
      cy.execute("script/user/search", this.data);
      cy.get('li[class = "text-center dropdown"]')
        .its("length")
        .should("be.gt", 0);
      cy.get("#fixed-asset-item-actions").first().click();
      cy.wait(4000);
      cy.contains("Edit").click();
      cy.wait(5000);
      cy.execute("script/user/update", this.data);
      cy.contains("Success").should("exist");
      cy.contains("OK").click();
    });
  });
});
