describe("Session Login", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/task_assignment/filter/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });

  describe("user is able to change Calendar Date on Task Assignment Page", function () {
    it("fc-4259 user is able to change Calendar Date on Task Assignment Page", function () {
      cy.visit();
      cy.wait(7000);
      cy.get('i[title="Go to the Task Assignment"]').parent().click({ force: true });
      cy.execute("/script/task_assignment/filter", this.data);
      cy.contains("button", "Filter Tasks").click({ force: true });
      cy.wait(7000);
      cy.contains("button", "Map").click({ force: true });
      cy.get(".MicrosoftMap").should("be.visible");
    });
  });
});
