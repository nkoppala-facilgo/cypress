describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/create_wo/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify user is able to create next step order from WO summary page. ", function () {
    it("FC-7121 To verify user is able to create next step order from WO summary page.  <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.execute("/script/work_order/create_next_step_order_from_wo");
    });
  });
});
