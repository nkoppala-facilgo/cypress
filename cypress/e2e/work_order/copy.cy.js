describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
     cy.fixture(`data/${data_path}/work_order/copy/data`).then(function (data) {
        this.data = data;
     })     
 })
describe("copy work order", function () {
  it('fc-1180 copy work order  <smoke>', function () { 
   var data_path = Cypress.env(`data`)
   cy.fixture(`data/${data_path}/work_order/copy/data`).then(workorder => {
    const title = 'title'
    var work_order_title = workorder[title];
    cy.execute('script/work_order/copy/copy',this.data)
    cy.execute('script/work_order/create',this.data)
    cy.visit("/dashboards/graph")
    cy.contains("Documents").click()
    cy.contains('a','Work Orders').click({ force: true })
    cy.wait(5000)
    cy.get('.fa-filter').click()
    cy.wait(5000)
    cy.get('input[placeholder=\"WO Title / Item Name\"]').type(work_order_title)
    cy.contains('button','Search').click()
    cy.wait(10000)
    cy.get('.media > a').first().click()
    cy.wait(5000)
    cy.contains('WO#:').parent().within(() => {cy.get('.col-sm-8 > p')} ).invoke('text').then((value) => {
      cy.log("Value is : ",value);
      const new_value = value.substring(4, value.length);
      var fUrl = "/work_orders" + "/" + new_value + "/" + "clone";
      cy.visit(fUrl)
      cy.execute('script/work_order/copy/clone',this.data)
   })
  })
  });
 });
});
