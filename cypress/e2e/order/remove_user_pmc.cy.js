describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/order/remove_user_pmc/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("pmc", function () {
    it(" FC-5063 login", function () {
      cy.visit().wait(4000);
      cy.execute("script/order/add_user_pmc", this.data);
      cy.get('div[class="Select-control"]')
        .find(".Select-value-icon")
        .contains("×")
        .click();
      cy.contains("button", "Save").click();
    });
  });
});
