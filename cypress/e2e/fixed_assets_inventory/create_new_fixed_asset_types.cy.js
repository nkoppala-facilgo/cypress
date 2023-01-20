describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/create_new_fixed_asset_types/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || Create new Fixed Asset Types.", function () {
    it("FC-1203 Create new Fixed Asset Types.", function () {
      cy.visit("/fixed_asset_types");
      cy.execute("/script/fixed_assets_inventory/create_new_fixed_asset_types",this.data);
      cy.wait(3000);
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      function generateString(length) {
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      cy.get("#asset-type").type(generateString(10), { force: true });
      cy.contains('button.btn.btn-primary','Create').click();
      cy.contains('Fixed Asset Type created successfully').should('be.visible');
    });
  });
});
