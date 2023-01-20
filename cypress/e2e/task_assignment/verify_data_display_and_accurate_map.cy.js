describe("Session Login", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/task_assignment/verify_data_display_and_accurate_map/data`).then(function (data) {
      this.data = data;
    });
  });

  describe("Verify data display from Task Assignment Grid and Task Assignment Map is accurate and the same", function () {
    it("fc-5093 Verify data display from Task Assignment Grid and Task Assignment Map is accurate and the same <smoke>", function () {
      cy.visit();
      cy.execute("/script/task_assignment/verify_data_display_and_accurate_map", this.data);
    });
  });
});
