describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/gl_code/not_able_to_create/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that PMC is not able to create GL Code with existing GL Code and Name Of GL Code  fields.", function () {
      it('FC-2214 Not able to create new gl code if it already exists <smoke>', function () { 
           cy.visit("/dashboards/graph")
           cy.wait(5000)
           cy.contains("Setup").click({force: true})
           cy.wait(5000)
           cy.contains('a','Chart of Accounts').click({ force: true })
           cy.wait(5000)
           cy.contains('a','GL Codes').click({ force: true })
           cy.wait(5000)
           cy.contains('New GL Code').click({ force: true })
           cy.wait(5000)
           cy.execute('/script/gl_code/not_able_to_create',this.data)
       });
     });
   });
     