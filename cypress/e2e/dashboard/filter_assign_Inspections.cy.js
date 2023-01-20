describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
        });
    });
  
    describe("Assign Inspections", function () {
      it("Completed Inspection-To Verify that user can able to filter the CB Amount Inspection based on Show Has CB Amount Only Check box <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-inspection").contains("a", "Completed").click();
        cy.get(".assign-inspection").find('label').last().find('input[type=checkbox]').click();
      });
    });
  });