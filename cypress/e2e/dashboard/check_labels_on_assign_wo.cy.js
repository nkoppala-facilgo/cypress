describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
      });
     cy.fixture(`data/${data_path}/dashboard/check_labels_on_assign_wo/data`).then(function (data) {
        this.data = data;
     })
  });

  describe("Assign Work Orders", function () {
    it("UnAssigned Work Order Tab <smoke>", function () {
      cy.visit()
      cy.wait(7000)
      for(let i=0;i<this.data['labels'].length;i++)
      {
        cy.get(".assign-work-order").contains('th',this.data.labels[i]).should('be.exist')
      }
    });

    it("UnScheduled Work Order Tab <smoke>", function () {
      cy.visit()
      cy.wait(7000)
      cy.get(".assign-work-order").contains("a", "Unscheduled").click();
      for(let i=0;i<this.data['labels'].length;i++)
      {
        cy.get(".assign-work-order").contains('th',this.data.labels[i]).should('be.exist')
      }
    });

    it("Completed Work Order Tab <smoke>", function () {
      cy.visit()
      cy.wait(7000)
      cy.get(".assign-work-order").contains("a", "Completed").click();
      for(let i=0;i<this.data['labels1'].length;i++)
      {
        cy.get(".assign-work-order").contains('th',this.data.labels[i]).should('be.exist')
      }
    });
  });
});


