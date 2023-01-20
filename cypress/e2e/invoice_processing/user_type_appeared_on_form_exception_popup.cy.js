describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice_processing/user_type_appeared_on_form_exception_popup/data`).then(function (data) {
	        this.data = data;
	    });
    });
    
    describe("To verify default user type is appeared as selected on 'Form Exception' pop up ", function () {
        it("Exception user Role Route dropdown settings <regression>", function () {
            cy.visit();
            cy.wait(3000);
            cy.get('span[class=caret]').first().click({force: true});
            cy.contains('Account Settings').click({force: true});
            cy.contains('Company Settings').click({force: true});
            cy.get('#company_company_setting_attributes_default_inv_form_exception_user_type_id').select('Regional Maintenance Manager');
            cy.get('input[id="saveButton"]').click({force: true});
            cy.contains("Your settings has been saved.").should("be.exist");
        });
        it("FC-8633 user type is appeared as selected on 'Form Exception' pop up ", function() {
            cy.visit();
            cy.wait(3000);
            cy.execute('/script/invoice_processing/user_type_appeared_on_form_exception_popup', this.data);
        });
        it("Exception user Role Route dropdown settings", function() {
            cy.visit();
            cy.wait(3000);
            cy.get('span[class=caret]').first().click({force: true});  
            cy.contains('Account Settings').click({force: true});
            cy.contains('Company Settings').click({force: true});
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.get('#company_company_setting_attributes_default_inv_form_exception_user_type_id').select('Technician2');
            }
            var data_path = Cypress.env(`data`)
            if(data_path=='preview'){
                cy.get('#company_company_setting_attributes_default_inv_form_exception_user_type_id').select('Maintenance Manager');
            }
            cy.get('input[id="saveButton"]').click({force: true});
            cy.contains("Your settings has been saved.").should("be.exist");
        });
    });
});
