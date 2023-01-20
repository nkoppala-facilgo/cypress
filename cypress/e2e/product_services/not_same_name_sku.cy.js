describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.supplier.username,data.supplier.password);
          });
        cy.fixture(`data/${data_path}/product_services/not_same_name_sku/data`).then(function(data) {
            this.not_same_name_sku_data = data;
        })
    })

    describe("To verify that Supplier can't enter same Product Name and SKU.", function() {
        it('FC-2561 verifying prooduct name and sku not to be same  <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            cy.get('a[href=\"/products\"]').click({ force: true })
            cy.contains('a', 'New Product & Service').click({ force: true })
            cy.wait(3000)
            cy.execute('/script/product_services/not_same_name_sku', this.not_same_name_sku_data)
           
        });
    });
});
