describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.visit();
            cy.execute('script/login/login', data.pmc)
         });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sentTosupplier_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is Completed", function () {
        it("FC-10823 Verify WO Status is Completed", function () {
            cy.visit("/work_orders/");
            cy.get(".fa-filter").click();
            cy.select_by_label("WO#(s)", this.data.num_no, 1500);
            cy.contains("button", "Search").click();
            cy.wait(3000);
            cy.get(".media").first().click();
            cy.wait(3000);
            cy.contains("PendReview").should('be.visible');
            cy.contains("button", "Complete").click();
            cy.wait(2000);
            cy.contains('Resolution:').parent().find('div[class=\"Select-placeholder\"]').parent().find(`.Select-input input`).click({ force: true }).wait(3000).type(this.data.resolution2, { force: true }).wait(3000).type('{enter}' ,{ force: true })
            cy.get('.modal-content').contains('button','Save').click({force: true});
            cy.get('.confirm').click();
            cy.get('textarea[placeholder="Type here..."]').type(this.data["template_note"])
            cy.contains("button", "Save As Note").click();
            cy.contains("button", "Complete").click();
            cy.contains('Resolution:').parent().find('div[class=\"Select-placeholder\"]').parent().find(`.Select-input input`).click({ force: true }).wait(3000).type(this.data.resolution3, { force: true }).wait(3000).type('{enter}' ,{ force: true })
            cy.get('.modal-content').contains('button','Save').click({force: true});
            cy.get('.confirm').click();
            cy.contains("Copy").should('be.visible');
            cy.contains("Return Items").should('be.visible');
            cy.contains("Re-Open").should('be.visible');
            cy.contains("button", "Re-Open").click();
            cy.get('.confirm').click();
            cy.get('.confirm').click();
            cy.contains("Reserved").should('be.visible');
        }); 
    });
});
