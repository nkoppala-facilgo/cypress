describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
        cy.fixture(`data/${data_path}/invoice/supplier/unit_and_property/data`).then(function(data) {
                this.data = data;
        })
    })
describe("To verify that Unit list is fetching according to the Property field.", function() {
        it('FC-2246 To verify that Unit list is fetching according to the Property field.  <smoke>', function() {
                cy.visit()
                cy.contains("Begin Work Menu").click()
                cy.contains('a', 'Create Invoice').click({ force: true })
                cy.select_by_label('CUSTOMER NAME:',this.data['customer_name'])
                cy.contains('label','PROPERTY NAME:').parent().find('input[type=text]').type(this.data['property_name'])
                cy.contains('li',this.data['property_name']).should('be.visible')
        });
        it('fetch unit  <smoke>', function() {
                cy.visit()
                cy.contains("Begin Work Menu").click()
                cy.contains('a', 'Create Invoice').click({ force: true })
                cy.select_by_label('CUSTOMER NAME:',this.data['customer_name'])
                cy.contains('label','PROPERTY NAME:').parent().find('input[type=text]').type(this.data['property_name'])
                cy.contains('label','PROPERTY NAME:').parent().find('a').contains(this.data['property_name']).click({force:true})
                cy.contains('div', 'Unit#')
                .click({ force: true })
                cy.get(`[class*="-menu-outer"]`)
                .contains(this.data['unit'])
                .should('be.visible')
        });
});
});