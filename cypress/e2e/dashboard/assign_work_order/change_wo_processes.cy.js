describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });

    cy.fixture(`data/${data_path}/dashboard/assign_work_order/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("Assign Work Orders : UnAssigned Work order <smoke>", function () {
    it("To Verify user can chage the work order process", function () {
      cy.visit();
      cy.get("#assign-work-order-tab").click();
      cy.get("#assign-work-order-tab-tab-unassigned").click();
      cy.get("#assign-work-order-tab-pane-unassigned")
        .parent()
        .find('div[class="Select-placeholder"]')
        .contains("Assignee..")
        .parent()
        .find(`.Select-input input`)
        .click({ force: true })
        .clear({ force: true })
        .type(this.data["assignee"], { force: true });
      cy.get(`[class*="-menu"]`)
        .contains(this.data["assignee"])
        .click({ force: true });
      cy.select_by_calendar("#due-date--0", this.data["due_date"]);
      cy.get("#assign-work-order-tab")
        .parent()
        .find(".btn.btn-success")
        .contains("Process Changes")
        .click({ force: true });
      cy.contains("button.confirm", "Yes").click();
      cy.contains("Work Orders were saved successfully").should("exist");
    });
  });
});
