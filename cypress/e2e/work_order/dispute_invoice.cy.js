describe('Session Login ',()=>{
        beforeEach(() => {
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/dispute_invoice/data`).then(function (data) {
                this.data = data;
        })     
     })
     describe("Dispute Invoice at PMC side at Invoice summary page", function () {
      it('FC-4049 dispute invoices', function () { 
        cy.execute('script/work_order/dispute_invoice',this.data)
        cy.execute('script/work_order/filter',this.data)
        cy.wait(5000)
        cy.get('.media').first().click()
        cy.wait(5000)
        cy.get('.col-lg-12 > .text-center > .text-blue').click()
        cy.contains('REFERENCE INVOICE(S):').parent().find('.form-control-static').find('a')
        .invoke('attr', 'href')
        .then(href => {
                cy.visit(href);
        });
        cy.contains('button','Dispute').click()
        cy.get('.col-xs-12 > .form-control').type(this.data['reason'])
        cy.get('.modal-content').contains('button','Send').click()
      });
    });
});
     