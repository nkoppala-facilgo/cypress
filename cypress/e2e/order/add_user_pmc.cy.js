describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/order/add_user_pmc/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Team", function () {
    it("FC-5062 Verify user is able to 'Add user & Skills' on created Team", function () {
      cy.visit().wait(4000);
      cy.execute("script/order/add_user_pmc", this.data);
    });
  });
});
