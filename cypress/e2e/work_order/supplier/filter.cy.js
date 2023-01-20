describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.supplier.username,data.supplier.password);
         });
    cy.fixture(`data/${data_path}/work_order/supplier/filter/single_item/data`).then(function (data) {
       this.single_item_data = data;
    })  
    cy.fixture(`data/${data_path}/work_order/supplier/filter/multiple_item/data`).then(function (data) {
       this.multiple_item_data = data;
    })
 })
  
 describe("able to search single supplier work order filter",function (){
    it("search projects  <smoke>",function (){
        cy.visit("/dashboards/graph")
        cy.contains("Documents").click()
        cy.contains('a','Work Orders').click({ force: true })
        cy.wait(5000);
        cy.execute('script/work_order/supplier/filter',this.single_item_data)
        cy.wait(2000);
        cy.get('.supplier-list li').should('have.length',1)
    });
 });
 describe("able to search multiple supplier work order filter",function (){
    it("search projects  <smoke>",function (){
        cy.visit("/dashboards/graph")
        cy.contains("Documents").click()
        cy.contains('a','Work Orders').click({ force: true })
        cy.wait(5000);
        cy.execute('script/work_order/supplier/filter',this.multiple_item_data)
        cy.wait(2000)
        cy.get('.supplier-list li').its('length').should('be.gt',0)
     });
 });
});