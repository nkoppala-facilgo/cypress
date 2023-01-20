describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/order/catalog_order_create/data`).then(function(data) {
            this.catalog_order_create_data = data;
        })
        cy.fixture(`data/${data_path}/order/catalog_order_cart/data`).then(function(data) {
            this.catalog_order_cart_data = data;
        })
    }) 
    describe(" Order ", function() {
        it(' FC-2199 catalog new Orders  <smoke>', function() {
            cy.wait(3000)
            cy.visit()
            cy.contains("Documents").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.get('a[href=\"/work_orders\"]').click({ force: true })
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains('a', 'Create Work Order').click({ force: true })
            cy.wait(3000)
            cy.execute('script/order/catalog_order_create', this.catalog_order_create_data)
            cy.execute('script/order/catalog_order_cart', this.catalog_order_cart_data)
        });

  });

});