describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/invoice_exception_appeared_on_document_exception_page/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("To Verify Invoice Exception is appeared on document exception page when user send 'Invoice Exception' to it self without select property", function () {
        it("FC-8371 Invoice Exception is appeared on document exception page when user send 'Invoice Exception' <regression>", function () {
            cy.visit();
            cy.wait(3000);
            cy.execute("script/invoice_processing/enable_invoice_processing_exception_void");
            cy.get('span[class=caret]').eq(0).click({force: true});
            cy.contains("Logout").click({force: true});
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute('script/login/login', data.techlevel1);
            }); 
            cy.visit();
            cy.wait(3000);
            cy.execute("script/invoice_processing/invoice_exception_appeared_on_document_exception_page", this.data);
            cy.get('span[class=caret]').eq(0).click({force: true}); 
            cy.contains("Logout").click({force: true});
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute('script/login/login', data.pmc);
            }); 
            cy.visit();
            cy.wait(3000);
            cy.execute("script/invoice_processing/enable_invoice_processing_exception_void");
        });
    });
});
