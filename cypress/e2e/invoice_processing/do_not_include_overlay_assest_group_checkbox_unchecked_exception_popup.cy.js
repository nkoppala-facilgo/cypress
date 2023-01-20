describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/do_not_include_overlay_assest_group_checkbox_unchecked_exception_popup/data`).then(function (data) {
	    this.data = data;
	});
    });
    describe("To verify Do not include overlay asset group checkbox is unchecked on Form Exception pop up when company setting set as checked.", function () {
        it("FC-9031 Do not include overlay asset group checkbox is unchecked on Form Exception pop up when company setting set as checked <regression>", function () {
            cy.visit();
            cy.wait(3000);
            cy.get("span[class=caret]").first().click({force: true});
            cy.contains("Account Settings").click({force: true});
            cy.contains("Company Settings").click({force: true});
            cy.get("#company_company_setting_attributes_exclude_overlay_asset_groups_on_inv_form_exception_default_flag").select("Unchecked");
            cy.get('input[id="saveButton"]').click({force:true})
            cy.contains("Your settings has been saved.").should("be.exist")
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
            cy.visit();
            cy.waitUntil(()=>cy.contains("a", "Invoice Processing").click({ force: true }));
            cy.contains("a", "Invoice Images").click({ force: true });
            cy.wait(7000);
            cy.execute('/script/invoice_processing/do_not_include_overlay_assest_group_checkbox_unchecked_exception_popup', this.data);
        });
    });
});
