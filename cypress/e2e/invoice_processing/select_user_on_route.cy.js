describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/select_user_on_route/data`).then(function (data) {
		    this.data = data;
		});
    });
    describe("To verify user is able to select user on 'ROUTE TO(by User Name)' field on Form Exception pop up", function () {
        it("FC-6890 Verify User Is able to select user on route to <smoke>", function () {
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
            cy.contains('button', 'Manage Exceptions').click({force: true});
            cy.select_by_label_new('(by User Name):', this.data['user_name'], 5000);
        });
    });
});
