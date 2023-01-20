describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/create_wo_with_project/data`).then(function (data) {
        this.data = data;
      });
  });
  describe("To verify user is able to search and select project while creating work order from left nav. ", function () {
    it("FC-7461 creating work order with project name <smoke>", function () {
      cy.execute("/script/work_order/create_wo_with_project", this.data);
    });
  });
});
