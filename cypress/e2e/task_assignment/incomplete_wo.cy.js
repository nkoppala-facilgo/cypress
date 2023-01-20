describe("Session Login", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/task_assignment/incomplete_wo/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });

  describe("Verify when Efficient scheduling suggestions includes all the incomplete WOs for the properties associated to the WOs on the left sections of the Task Assignment Grid page", function () {
    it("fc-5092 Verify when Efficient scheduling suggestions includes all the incomplete WOs for the properties associated to the WOs on the left sections of the Task Assignment Grid page <smoke>", function () {
      cy.visit();
      cy.execute("/script/task_assignment/incomplete_wo", this.data);
    });
  });
});
