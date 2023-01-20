describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });

  describe("Setup- Skills|| To verify user is able to create new skill", function () {
    it("fc-1500 To verify user is able to create new skill <smoke> ", function () {
      cy.visit("/skills");
      cy.execute("/script/setup/skills/create_new_skills");
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
      cy.get("#skill-name").type(generateString(6));
      cy.contains("button", "Create").click();
      cy.contains("h2", "Success").should("be.visible");
      cy.contains("button.confirm", "OK").click();
    });
  });
});
