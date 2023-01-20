describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Assign Work Orders : User can able to click the each tap and varify that it's gives the correct result.", function () {
    it("User can able to click the each tap and varify that it's gives the correct result. <smoke>", function () {
      cy.visit();
      cy.get("#assign-work-order-tab").click();
      cy.get("#assign-work-order-tab-tab-unassigned").click();
      cy.get("#assign-work-order-tab-tab-unassigned").should(
        "have.attr",
        "aria-selected",
        "true"
      );
      cy.get("#assign-work-order-tab-tab-unscheduled").click();
      cy.get("#assign-work-order-tab-tab-unscheduled").should(
        "have.attr",
        "aria-selected",
        "true"
      );
      cy.get("#assign-work-order-tab-tab-completed").click();
      cy.get("#assign-work-order-tab-tab-completed").should(
        "have.attr",
        "aria-selected",
        "true"
      );
    });
  });
});
