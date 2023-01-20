describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env(`data`);
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.fixture(`data/${data_path}/setup/edit_wo_file/data`).then(function (data) {
      this.data = data;
      });
    });
    describe("To verify user is able to edit Work Order Type", function () {
      it("FC- 3073 Setup- Work Order Type/Subtype|| To verify user is able to edit Work Order Type <smoke> ", function () {
        cy.visit("/work_order_types");
        cy.wait(7000);
        cy.execute("script/setup/edit_wo_file", this.data);
      });
    });
});
