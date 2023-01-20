describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/renovations/setup_floorplan/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("Automation || To verify user is able to initiate 'Setup Floorplans & Units' ", function () {
    it("fc-1540 set up floorplans and units <Smoke>", function () {
      cy.execute("script/Renovations/renovations_page", this.data);
      cy.wait(10000);
      cy.execute("script/Renovations/setup_floorplan", this.data);
    });
  });
});
