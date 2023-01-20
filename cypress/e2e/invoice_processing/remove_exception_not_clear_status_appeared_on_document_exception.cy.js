describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.maintenanceManager.username, data.maintenanceManager.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/remove_exception_not_clear_status_appeared_on_document_exception/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("To verify Under notes 'Remove Exceptions' Button is appear on 'AP Manager' Account on document exception & To verify 'Filter' page is appear status is 'Not clear' on document exception & To verify 'Not Clear' option is appeared as status field on document exception ", function () {
        it("FC-8627,8628,8630 Under notes 'Remove Exceptions' Button is appear on 'AP Manager' & 'Not Clear' option is appeared as status field on document exception  <regression>", function () {
			cy.visit();
			cy.wait(5000);
			cy.execute("/script/invoice_processing/remove_exception_not_clear_status_appeared_on_document_exception", this.data);
			cy.get("span[class=caret]").eq(0).click({force: true});
			cy.contains("Logout").click({force: true});
			var data_path = Cypress.env("data");
			cy.fixture(`data/${data_path}/login/data`).then(function (data) {
				cy.login_with_session(data.ap_manager.username, data.ap_manager.password);
			});
			cy.visit("");
			cy.wait(5000);
			cy.contains("a", "Invoice Processing").click({force: true});
			cy.contains("span", "Document Exceptions").click({force: true});
			cy.get(".fa-filter").click({multiple: true});
			cy.select_by_label_new("Status:", this.data["status1"]);
			cy.contains("button", "Search").click().wait(4000);
        });
    });
});
