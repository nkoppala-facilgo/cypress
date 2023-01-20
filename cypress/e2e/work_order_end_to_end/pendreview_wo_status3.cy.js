describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.visit();
            cy.execute('script/login/login', data.supplier)
         });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sentTosupplier_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is PendReview", function () {
        it("FC-10578 Verify WO Status is PendReview", function () {
            cy.visit("/work_orders/");
            cy.get(".fa-filter").click();
            cy.select_by_label("WO#(s)", this.data.num_no, 1500);
            cy.contains("button", "Search").click();
            cy.wait(3000);
            cy.get(".media").first().click();
            cy.wait(2000);
            cy.contains("button", "VerCompleted").click();
            cy.get('i[class="fa fa-keyboard-o"]').click();
            cy.get('input[placeholder="type your signature in here"]').type(this.data.sign);
            cy.get('#btnDocumentPage').find('button').last().click({force: true});
            cy.get('.js-userguiding-complete-work-order-button').click();
            cy.contains("Notes and pictures must be entered by the supplier on every line item before the work order can be completed").should("exist");
            cy.get('.confirm').click();
            cy.wait(3000);
            cy.reload();
            cy.get('.js-userguiding-edit-work-order-button').click();
            cy.reload();
            cy.get('.font-size-double').click({force:true});
            cy.get('li[role=\"presentation\"]').find('span').eq(1).click({force:true});
            cy.get('textarea[placeholder="Notes"]').type(this.data['notes']);
            cy.get('.grouped-items__view-container').contains('p','Attach Image(s)').parent().last().find('input[type=file]').attachFile(this.data['file_path']);
            cy.get('.grouped-items__table-form').contains('button', 'Save').click({force: true});
            cy.contains("button", "Complete").click();
            cy.contains("PendReview").should("exist");
        });
    });
});
