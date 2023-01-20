describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          cy.on('uncaught:exception', (err, runnable) => { return false })
          });
          cy.fixture(`data/${data_path}/setup/residents/update/data`).then(function (data) {
            this.data = data;
          })
      })
      describe(" Setup- Residents", function () {
        it(' FC-6206 Setup- Residents|| To verify user is able to update residents.  <smoke>', function () { 
            cy.on('uncaught:exception', (err, runnable) => {return false;});
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.wait(5000)
            cy.get('.js-userguiding-icon-menu-settings').click({force:true})   
            cy.contains('a', 'Asset Group / Properties').click()
            cy.wait(3000)
            cy.contains('a','Resident Setup').click()
            cy.wait(3000)
            cy.contains('a','Residents').click()
            cy.wait(8000)
            cy.get('.fa-sort-down').eq(0).click({force:true})
            cy.wait(3000)
            cy.get('.fa-check-circle').eq(0).click({force:true})
            cy.execute("/script/setup/residents/update", this.data);
            cy.wait(2000)
            cy.get('.btn-primary').click()
            cy.wait(4000)
            cy.contains('Resident was updated.').should('exist')  
            cy.get('.btn-primary').click() 
        });
      });
});
