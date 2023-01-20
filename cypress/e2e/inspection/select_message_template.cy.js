describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(
      `data/${data_path}/inspection/select_message_template/data`
    ).then(function (data) {
      this.data = data;
    });
  });

  describe("To Verify 'Select Message Template' Functionality.", function () {
    it("FC-5434 To Verify 'Select Message Template' Functionality. <smoke>", function () {
      cy.visit();
      cy.wait(7000);
      cy.contains("Documents").click({ force: true });
      cy.contains("a", "Inspections").click({ force: true });
      cy.wait(5000);
      cy.contains("a", "Create Inspection").click({ force: true });
      cy.wait(5000);
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
      cy.contains("label", "INSPECTION TITLE:").parent().find(`input`).click({ force: true }).type(generateString(6));
      cy.wait(5000);
      cy.execute("/script/inspection/select_message_template", this.data);
    });
  });
});
