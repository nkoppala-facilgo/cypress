describe('Session Login ',()=>{
    beforeEach(() => {
           var data_path = Cypress.env(`data`)
           
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
     cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
        this.data = data;
     })
  })
  describe("To verify Work Order status should not QuoteClosed when it has open Orders/Work Order - Quote Request - Quote - Order Flow ", function () {
    it('FC-6755 and FC-3581 To verify Work Order status should not QuoteClosed when it has open Orders/Work Order - Quote Request - Quote - Order Flow  <smoke>', function () { 
         cy.execute('/script/work_order/create',this.data)
         cy.contains('label','WO#:').parent().find('input[type=text]')
         .invoke('val')
         .then(wo_number => {
             cy.get('span[class=caret]').eq(0).click({force:true})  
         cy.execute('/script/work_order/next_step',this.data)
         cy.wait(5000) 
         cy.visit("/work_orders/"+wo_number)
         cy.get("#js-react-WorkOrderDocumentHierarchyView > div > table > tbody > tr > td:nth-child(3) > a")
         .invoke('text')
         .then(Quote_number => {
                 cy.get('span[class=caret]').eq(0).click({force:true}) 
         cy.contains("Logout").click({ force: true });
         var data_path = Cypress.env(`data`)
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
           cy.login_with_session(data.supplier.username,data.supplier.password);
         });   
         cy.visit("/quote_requests/"+Quote_number)
         cy.get('a[data-remote="true"]').first().dblclick({ force: true });
         cy.wait(5000);
         cy.contains(".btn.btn-primary", "Create Quote").click();
         cy.execute("/script/work_order/not_quoteclosed_for_openorders",this.data);
         cy.contains("Logout").click({ force: true });
         var data_path = Cypress.env(`data`)
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute('script/login/login', data.pmc)
         });
        }); 
        cy.visit("")
        cy.visit("/work_orders/"+wo_number)
        cy.execute('/script/work_order/order_checkout',this.data)
    });
});
});
});
