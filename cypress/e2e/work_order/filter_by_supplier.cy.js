describe('Session Login ',()=>{
    beforeEach(()=>{
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.fixture(`data/${data_path}/work_order/filter_by_supplier/data`).then(function (data) {
        this.data = data;
      });
    }) 
    describe("filter work order", function () {
      it('FC-3899 Filter/Search created Work Order for suppliers <smoke>', function () { 
        cy.visit()
        cy.on('uncaught:exception', (err, runnable) => { return false })
        cy.visit('/work_orders')
        cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true})
        cy.wait(4000)   
        cy.select_by_label_with_enter('Supplier(s):',this.data.supplier)  
        cy.contains('button','Search').click()
        });
    });
});