describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_asset_inventory/create_new_asset_item/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Verify user is able to Create new fixed asset item", function () {
    it("FC-5203 Create new fixed asset item ", function () {
      cy.execute("/script/fixed_asset_inventory/create_new_asset_item",this.data);
    });
  });
});
