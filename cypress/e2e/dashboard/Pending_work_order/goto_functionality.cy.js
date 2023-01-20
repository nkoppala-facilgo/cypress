describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.fixture(`data/${data_path}/dashboard/pending_work_order/data`).then(
        function (data) {
          this.data = data;
        }
      );
    });
    describe("PendApproval Work Orders - User should be able to land on the expected page using the Goto Page functionality.", function () {
      it("User should be able to land on the expected page using the Goto Page functionality. <smoke>", function () {
        cy.visit();
        cy.get("#assign-inspection-tab-tab-recently_completed").click();
        cy.select_by_placeholder('Inspection Lists','gilang');
        cy.contains('label','Within the last').parent().find('input').clear().wait(3000).type('3');
        cy.get("#assign-inspection-tab").parent().find(".btn.btn-success").contains("Submit").click({ force: true });
        cy.get('#assign-inspection-tab-pane-recently_completed  nav  .pagination  .btn-last-page a').click()
      });
    });
  });

  
