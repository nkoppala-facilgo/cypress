describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
      this.data = data;
    });
  });

  describe("Create a service type QR from workorder ", function () {
    it("FC-1141 Create a service type QR from workorder  <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.execute("/script/work_order/next_step", this.data);
    });
  });
});
