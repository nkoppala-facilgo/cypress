describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username, data.supplier.password);
        });
    });

    describe("To verify ‘REFERENCED PO/CONTRACT#’ field is not display as mandatory on 'create invoice' page when company setting is disabled ", function () {
        it(" Set Reference PO as a mandatory field for suppliers when creating an invoice' - Company setting should No <regression>", function () {
			cy.visit();
			cy.wait(2000);
			cy.get("span[class=caret]").first().click({force: true});
			cy.contains("Account Settings").click({force: true});
			cy.contains("Company Settings").click({force: true});
			cy.get("#company_setting_is_send_order_tied_to_wo_changes_notification_flag").select("No");
			cy.get('input[value="Save"]').click({force: true});
			cy.contains("Company setting has been saved successfully.").should("be.exist");
        });
        it("FC-9036 ‘REFERENCED PO/CONTRACT#’ field is not display as mandatory on 'create invoice' page when company setting is disabled ", function () {
			cy.visit();
			cy.wait(2000);
			cy.contains("Documents").click();
			cy.contains("a", "Invoices").click();
			cy.get(".item-menu").eq(5).click();
			cy.get("#invoice-list").find('div[class="invoiceList"]').find("div").find("div").find("div").find("a").click();
        });
        it(" Set Reference PO as a mandatory field for suppliers when creating an invoice' - Company setting should yes <regression>", function () {
			cy.visit();
			cy.wait(2000);
			cy.get("span[class=caret]").first().click({force: true});
			cy.contains("Account Settings").click({force: true});
			cy.contains("Company Settings").click({force: true});
			cy.get("#company_setting_is_send_order_tied_to_wo_changes_notification_flag").select("Yes");
			cy.get('input[value="Save"]').click({force: true});
			cy.contains("Company setting has been saved successfully.").should("be.exist");
        });
    });
});
