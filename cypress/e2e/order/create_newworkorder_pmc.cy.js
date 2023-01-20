describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/order/create_newworkorder_pmc/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe(" Work Order Type/Subtype", function () {
    it("FC-5264 to verify user is able to create new WO Type/ Subtype <smoke>", function () {
      cy.visit().wait(3000);
      cy.execute("script/order/create_newworkorder_pmc", this.data).wait(4000);
      cy.get("button[title=Send]").click({ force: true });
      cy.contains("Work Order Type successfully created.")
        .should("exist")
        .wait(7000);
    });
  });
});
