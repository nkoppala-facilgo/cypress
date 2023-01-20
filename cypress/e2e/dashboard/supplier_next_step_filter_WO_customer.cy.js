describe('Session Login ',()=>{
      beforeEach(()=>{
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.supplier.username,data.supplier.password);
      });
      cy.fixture(`data/${data_path}/dashboard/supplier_next_step_filter_WO_customer/data`).then(function (data) {
          this.supplier_next_step_filter_WO_customer_data = data;
      });
      })
      describe("Supplier Next Step Dashboard (Supplier Side)", function () {
      it(' Verify user is able to filter Work Order by Customers <smoke>', function () { 
      cy.visit('/dashboards/graph')
      cy.wait(4000)
      cy.on('uncaught:exception', (err, runnable) => { return false })
      cy.execute('/script/dashboard/supplier_next_step_filter_WO_customer',this.supplier_next_step_filter_WO_customer_data)        

      });
      });
});