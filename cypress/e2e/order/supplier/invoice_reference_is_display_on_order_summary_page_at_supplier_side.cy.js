describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.supplier.username, data.supplier.password);
          });
         cy.fixture(`data/${data_path}/order/supplier/invoice_reference_is_display_on_order_summary_page_at_supplier_side/data`).then(function(data) {
            this.data = data;
        })
    }) 
    describe("To verify Invoice reference is display on Order summary page at supplier side", function() {
        it('FC-9912 Invoice reference is display on Order summary page at supplier side <regression>', function() {
            cy.visit()
            cy.contains("Documents").click()
            cy.wait(5000)
            cy.get('a[href=\"/document_orders\"]').click({force: true})
            cy.wait(5000)
            cy.get('[data-react-class="DocumentOrderFilterModal"]').find("i").click();
            cy.wait(7000)
            cy.select_by_label('Status(es):', this.data['status'],5000);
            cy.get('button').contains('Search').click();
            cy.wait(6000)
            cy.get('div[class=\"media-body document-order__content\"]').first().click();
            cy.wait(5000)
            cy.contains("span", "more").click();
            cy.contains('INVOICES:').should('exist')
        });
    });
});
