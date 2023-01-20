describe('Session Login ',()=>{
        beforeEach(()=>{
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
             cy.fixture(`data/${data_path}/dashboard/count_widget/data`).then(function (data) {
                this.data = data;
             })
          })
         describe("all selected widget should be displayed", function () {
           it('all selected widget should be displayed <smoke>', function () { 
              cy.visit();
              cy.execute('/script/dashboard/add_widget',this.data)
              cy.wait(5000)
              cy.get('.btn-remove-graph > a')
               .find('.fa')
               .then(listing => {
               const CountSelected = Cypress.$(listing).length;
               cy.log(CountSelected)
               cy.visit()
               cy.get('.graph-content')
                     .then(listing => {
                     const DashboardCount = Cypress.$(listing).length - 1;
                     cy.log(DashboardCount)
                     if(DashboardCount == CountSelected){
                        cy.log('__Count is correct__')
                     }else{
                        cy.log('__Count is incorrect__')
                     }
                     })
                     
               })
            });
     });
});     