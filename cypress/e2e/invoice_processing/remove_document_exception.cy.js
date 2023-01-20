describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.maintenanceManager.username, data.maintenanceManager.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/remove_document_exception/data`).then(function (data) {
		    this.data = data;
		});
    });
    describe("To verify Document exception is remove when user clicks on Remove exception button on document exception.", function () {
        it("FC-6891 Verify Document exception with Remove exception button <smoke>", function () {
            const characters ="0123456789";
            function generateString(length) {
                let result = "";
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                const common_str = Cypress.env(`common_string`);
                return common_str + result;
            }
            this.data.invoice_number = generateString(6);
            cy.visit('/invoice_processings');
            cy.wait(7000);
            cy.execute('/script/invoice_processing/select_user_on_route', this.data);
            cy.wait(3000);
            cy.get('span[class=caret]').eq(0).click({force: true}); 
            cy.wait(1000);
            cy.contains('Logout').click({force: true});
            cy.wait(5000);
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username,data.pmc.password);
            }); 
            cy.execute('/script/invoice_processing/remove_document_exception', this.data);
        });
    });
});

