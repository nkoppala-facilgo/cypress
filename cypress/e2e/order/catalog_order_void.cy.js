describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/order/catalog_order_void/data`).then(function(data) {
            this.catalog_order_void_data = data;
        })
    }) 
    describe(" Order ", function() {
        it('FC-2201 catalog void new Orders  <smoke> ', function() {
            cy.visit()
            cy.execute('script/order/catalog_order_void', this.catalog_order_void_data)
        });
    });
});