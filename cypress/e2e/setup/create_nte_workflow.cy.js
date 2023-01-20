describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/create_nte_workflow/data`).then(function (data) {
        this.data = data;
      });
  });
  describe("Setup- Workflow|| User is able to Create new NTE workflow.", function () {
    it("Fc-1381 User is able to Create new NTE workflow.<smoke>", function () {
      cy.visit("/workflows");
      cy.contains("a", "Work Order Workflows").click();
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
      cy.get("div.placeholder").eq(1).contains("User Type").click();
      cy.get("div.react-dropdown-menu").contains(this.data["user"]).click({ force: true });
      cy.get("i.fa.fa-remove").click();
      cy.get('input[placeholder="NTE limit"]').type("9999999");
      cy.get("#workflow-weight").type(generateString(6));
      cy.get("#workflow-name").type(generateString(6));
      cy.contains("button", "Save").click();
      cy.contains("button", "OK").click();
      cy.contains("button", "Save").click();
    });
  });
});
