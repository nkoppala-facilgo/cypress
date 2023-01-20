describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/work_order/reference_link_open_summary_page/data`).then(function (data) {
           this.data = data;
        })
     })
   describe("Open reference link on work order after creation after clicking more", function () {
   it('FC-1279 Open reference link on work order after creation after clicking more  <smoke>', function () { 
      cy.visit("/dashboards/graph")
      cy.contains("Documents").click()
      cy.contains('a','Work Orders').click({ force: true })
      cy.wait(5000);
      cy.execute('script/work_order/filter',this.data)
      cy.wait(2000)
      cy.get('#document-scroll-search li').its('length').should('be.gt',0)
      cy.get('.media > a').first().click()
      cy.wait(5000);
      cy.execute('/script/work_order/reference_link_open_summary_page',this.data)
      cy.contains('label','REFERENCE ORDER(S)#:').parent().find('p').find('a')
      .should('have.attr', 'href')
      .then(href => {
         cy.visit(href);
         cy.log(href)
      });
      });
   });
});