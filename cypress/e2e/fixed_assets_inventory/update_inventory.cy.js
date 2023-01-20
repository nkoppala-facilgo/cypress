describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/update_inventory/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Cypress Automation || Update Inventory Types. ", function () {
    it("FC-1212 Update Inventory Types.  <smoke> ", function () {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      this.data.inventory_type_name=generateString(5);
      cy.visit("/inventory_types");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/update_inventory", this.data);
    });
  });
});
