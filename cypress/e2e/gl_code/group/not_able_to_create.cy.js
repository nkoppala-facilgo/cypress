describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/gl_code/group/not_able_to_create/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that PMC is not able to create GL Code Group with existing Name of GL Code Group", function () {
      it('Fc-2221 Not able to create new gl code group with existing gl group name <smoke>', function () { 
           cy.visit("/dashboards/graph")
           cy.wait(2000)
           cy.contains("Setup").click({force: true})
           cy.wait(2000)
           cy.contains('a','Chart of Accounts').click({ force: true })
           cy.wait(2000)
           cy.contains('a','GL Codes').click({ force: true })
           cy.wait(2000)
           cy.contains('Show GL Groups').click({ force: true })
           cy.contains('New GL Group').click({ force: true })
           cy.wait(2000)       
           cy.execute('/script/gl_code/group/not_able_to_create',this.data)   
       });
     });
   });
     