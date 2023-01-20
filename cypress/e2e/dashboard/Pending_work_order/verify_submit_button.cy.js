describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/dashboard/pending_work_order/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("PendApproval Work Orders-: To Verify the submit button.", function () {
    it("To Verify the submit button <smoke>", function () {
      cy.visit();
      cy.get("#pending-work-order-tab").click();
      cy.execute("script/dashboard/verify_submit_button", this.data);
      cy.get("#pending-work-order-tab")
        .parent()
        .find(".btn.btn-success")
        .contains("Submit")
        .click({ force: true });
    });
  });
});
