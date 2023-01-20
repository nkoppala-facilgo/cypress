describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/mandatory_fields_on_non_catalog_order/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("To verify 'Product Name', 'Quantity', 'Unit Price', 'Gl Code', 'Unit Of Measure', 'Fiscal Period', 'Property' fields are displayed as mandatory field on line item on 'Create non-catalog order' modal from next step WO ", function () {
        it("FC-9909 verify 'Product Name', 'Quantity', 'Unit Price', 'Gl Code', 'Unit Of Measure', 'Fiscal Period', 'Property' fields as mandatory field on line item on 'Create non-catalog order' <regression>", function () {
            cy.execute("/script/work_order/create", this.data);
            cy.execute("/script/work_order/mandatory_fields_on_non_catalog_order", this.data);
        });
    });
});
