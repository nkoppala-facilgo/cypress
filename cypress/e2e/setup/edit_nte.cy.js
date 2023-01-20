describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/edit_nte/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Setup- Workflow|| user is able to to 'Edit' workflow NTE/Vendor Assignment.", function () {
    it("FC-3059 user is able to to 'Edit' workflow NTE/Vendor Assignment.<smoke>", function () {
      cy.visit("/work_order_workflows");
      cy.execute("/script/setup/edit_nte", this.data);
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
      cy.get("#workflow-weight").clear().type(generateString(6));
      cy.get("#workflow-name").clear().type(generateString(6));
      cy.contains("button", "Save").click();
      cy.contains("button", "OK").click();
      cy.contains("button", "Save").click();
    });
  });
});
