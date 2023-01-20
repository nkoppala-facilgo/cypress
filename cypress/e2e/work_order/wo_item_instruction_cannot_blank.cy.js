describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/wo_item_instruction_cannot_blank/data`).then(function (data) {
            this.data = data;
        });
    });
	
    describe("To verify 'Work order items instruction can't be blank' validation should not display after user enters instruction on line item when create Child WO from next step WO ", function () {
        it("FC-9348 'Work order items instruction can't be blank' validation should not display after user enters instruction on line item when create Child WO from next step WO <regression>", function () {
            cy.visit();
            cy.wait(3000);
            cy.execute("/script/work_order/create", this.data);
            cy.execute("/script/work_order/wo_item_instruction_cannot_blank", this.data);
        });
    });
});
