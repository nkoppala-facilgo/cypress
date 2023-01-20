describe("Session Login", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(
      `data/${data_path}/task_assignment/verify_calender_and_map_display/data`
    ).then(function (data) {
      this.data = data;
    });
  });

  describe("Verify the calendar and the map display the user total time worked and the map displays the technician route based on WOs assigned and scheduled for applicable day", function () {
    it("fc-5095 Verify the calendar and the map display the user total time worked and the map displays the technician route based on WOs assigned and scheduled for applicable day <smoke>", function () {
      cy.visit();
      cy.wait(3000);
      cy.execute("/script/task_assignment/verify_calender_and_map_display", this.data);
    });
  });
});
