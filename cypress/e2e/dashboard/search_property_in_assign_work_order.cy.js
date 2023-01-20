describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/dashboard/search_property_in_assign_work_order/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("Assign Work Orders", function () {
      it("UnScheduled Tab : Verify that user can able to search the property. <smoke>", function () {
        cy.visit();
        cy.wait(7000);
        cy.get(".assign-work-order").contains("a", "Unscheduled").click();
        cy.get("#assign-work-order-tab").parent().find('div[class="Select-placeholder"]').contains("Type to search property").parent().find(`.Select-input input`).click({ force: true }).clear({ force: true }).type(this.data['property'], { force: true });
        cy.get(`[class*="-menu"]`).contains(this.data['property']).click({ force: true });
        cy.get('#assign-work-order-tab').parent().find('.btn.btn-success').contains("Search").click({ force: true })
      });
    
      it("Completed Tab : Verify that user can able to search the property. <smoke>", function () {
        cy.visit()
        cy.wait(7000)
        cy.get(".assign-work-order").contains("a", "Completed").click();
        cy.get("#assign-work-order-tab").parent().find('div[class="Select-placeholder"]').contains("Type to search property").parent().find(`.Select-input input`).click({ force: true }).clear({ force: true }).type(this.data['property1'], { force: true });
        cy.get(`[class*="-menu"]`).contains(this.data['property1']).click({ force: true });
        cy.get('#assign-work-order-tab').parent().find('.btn.btn-success').contains("Search").click({ force: true })
        
      });
    });
});
