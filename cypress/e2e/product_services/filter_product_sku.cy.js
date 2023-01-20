describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.supplier.username,data.supplier.password);
          });
        cy.fixture(`data/${data_path}/product_services/filter_product_sku/data`).then(function(data) {
            this.filter_product_sku_data = data;
        })
    })

    describe("To verify that Supplier is able to Filter data with Product Name and SKU", function() {
        it('FC-2562   <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            cy.get('a[href=\"/products\"]').click({ force: true })
            cy.wait(3000)
            cy.get('[data-target="#modalFilterProduct"]').find('i').click()
            cy.wait(3000)
            cy.execute('/script/product_services/filter_product_sku', this.filter_product_sku_data)
        });
    });
});