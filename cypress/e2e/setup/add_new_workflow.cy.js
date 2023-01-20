describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Setup -Workflow|| User is able to add new workflow for Transaction.", function () {
    it("FC-5611 Setup -Workflow|| User is able to add new workflow for Transaction.<smoke>", function () {
      cy.visit("/workflows");
      cy.contains("button", "New Workflow").click({ force: true });
      cy.wait(3000);
      const characters = "0123456789";
      function generateString(length) {
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        const common_str = Cypress.env(`common_string`);
        return common_str + result;
      }
      cy.get("#workflow_workflow_name").type(generateString(6));
      cy.get("#workflow_weight").type(generateString(6));
      cy.get("input[value=Save]").click();
    });
  });
});
