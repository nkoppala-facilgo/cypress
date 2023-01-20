describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
      });
  });

  describe("Filter Assign Work Orders", function () {
    it("To Verify that user can able to filter the CB Amount Inspection based on Show Has CB Amount Only Check box <smoke>", function () {
      cy.visit();
      cy.wait(7000);
      cy.get(".assign-work-order").contains("a", "Completed").click();
      cy.get(".fa-square-o").click();
    });
  });
});

