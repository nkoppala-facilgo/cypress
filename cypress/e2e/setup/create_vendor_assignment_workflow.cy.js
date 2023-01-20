describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(
      `data/${data_path}/setup/create_vendor_assignment_workflow/data`
    ).then(function (data) {
      this.data = data;
    });
  });
  describe("Setup- Workflow|| User is able to Create new 'Vendor Assignment' workflow.", function () {
    it("FC-1382 User is able to Create new 'Vendor Assignment' workflow.<smoke>", function () {
      cy.visit("/workflows");
      cy.execute("/script/setup/create_vendor_assignment_workflow", this.data);
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
      cy.get("#workflow-weight").type(generateString(6));
      cy.get("#workflow-name").type(generateString(6));
      cy.contains("button", "Save").click();
      cy.contains("button", "OK").click();
      cy.contains("button", "Save").click();
    });
  });
});
