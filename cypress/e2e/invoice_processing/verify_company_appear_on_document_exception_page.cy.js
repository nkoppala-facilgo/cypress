describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.apSpecialistqc.username, data.apSpecialistqc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/verify_company_appear_on_document_exception_page/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("To Verify 'Company' is appear on 'Route to by(Asset Group)' field on filter pop up from 'Document Exception' page", function () {
        it("FC-8370 'Company' is appear on 'Route to by(Asset Group)' field on 'Document Exception' page <regression>", function () {
            cy.visit();
            cy.wait(7000);
            cy.execute("/script/invoice_processing/verify_company_appear_on_document_exception_page", this.data);
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({force: true});
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username, data.pmc.password);
            });
            cy.visit();
            cy.wait(7000);
            cy.execute("/script/invoice_processing/company_on_asset_type", this.data);
        });
    });
});
