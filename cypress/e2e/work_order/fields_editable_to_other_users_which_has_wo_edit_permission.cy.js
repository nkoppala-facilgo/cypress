describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.maintenanceManager.username, data.maintenanceManager.password);
        });
        cy.fixture(`data/${data_path}/work_order/fields_editable_to_other_users_which_has_wo_edit_permission/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("To verify field ('Category/Subcategory', 'Named Natural Disaster' and 'Priority') should editable to other users which has WO edit permission", function () {
        it('FC-9356 Fields(Category/Subcategory,Named Natural Disaster and Priority)should editable to other users which has WO edit permission <regression>', function () {
            cy.execute('script/work_order/create', this.data);
            cy.wait(6000);
            cy.execute('script/work_order/non_catalog', this.data);    
            cy.wait(5000);
            cy.contains('button.btn.btn-default', 'Goto Summary').click({force: true});
            cy.get('.confirm').click();
            cy.wait(5000);
            cy.contains('button.btn.btn-default', 'Goto Summary').click({force: true});
            cy.get('.confirm').click();
            cy.execute('script/work_order/category_subcategory_priority_fields_editable_on_wo_status', this.data); 
        });
    });
});
