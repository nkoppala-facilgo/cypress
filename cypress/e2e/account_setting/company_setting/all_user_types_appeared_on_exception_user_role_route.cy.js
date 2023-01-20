describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });

    describe("To verify company setting 'Exception User Role Route' is appeared on 'company setting screen' & To verify all user types is appeared on 'Exception User Role Route’ setting dropdown", function () {
        it("FC-8634 & FC-8632 company setting 'Exception User Role Route' is appeared on 'company setting screen' & all user types is appeared on 'Exception User Role Route’ setting dropdown <regression>", function () {
            cy.visit();
            cy.wait(3000);
            cy.get("span[class=caret]").first().click({force: true});
            cy.contains("Account Settings").click({force: true});
            cy.contains("Company Settings").click({force: true});
            cy.get("#company_company_setting_attributes_default_inv_form_exception_user_type_id").select("Regional Maintenance Manager");
        });
    });
});
