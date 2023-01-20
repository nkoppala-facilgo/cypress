describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);

    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/send_msg_to_supplier/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });

  describe("send message to supplier", function () {
    it("FC-1320 send message to supplier  <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.wait(5000);
      cy.execute("/script/work_order/next_step", this.data);
      cy.execute("/script/work_order/send_msg_to_supplier", this.data);
    });
  });
});
