describe("Session Login", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(
      `data/${data_path}/inspection/list_item_based_on_filter/data`
    ).then(function (data) {
      this.data = data;
    });
  });

  describe("To Verify that user can able list out items based on filter search.", function () {
    it("FC-5437 To Verify that user can able list out items based on filter search. <smoke>", function () {
      cy.execute(
        "/script/inspection/list_item_based_on_filter.json",
        this.data
      );
    });
  });
});
