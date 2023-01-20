describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To verify Parent WO should appear on first row on 'Hierarchy table'", function () {
    it("FC-7126 To verify Parent WO should appear on first row on 'Hierarchy table' <smoke>", function () {
      cy.execute("/script/work_order/create", this.data);
      cy.execute("/script/work_order/next_step", this.data);
      cy.execute("/script/work_order/parent_wo_appear_on_hierarchytable");
    });
  });
});
