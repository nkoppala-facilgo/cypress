describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.fa.username, data.fa.password);
    });
    cy.fixture(`data/${data_path}/work_order/reschedule/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Create contract", function () {
    it(" FC-3880 Supplier Side- Create Contract type Quote from QR ", function () {
      cy.visit();
      cy.execute("/script/work_order/show_recently_created", this.data);
      cy.execute("/script/work_order/contact_history", this.data);
      cy.execute("/script/work_order/show_recently_created", this.data);
      cy.execute("/script/work_order/reshedule", this.data);
      cy.execute("/script/work_order/edit_wo", this.data);
    });
  });
})
