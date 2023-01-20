describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/gl_code/edit/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("To verify that PMC is able to Edit GL Code after PMC creating GL Code successfully.", function () {
      it('FC-2213 Edit gl code <smoke>', function () { 
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
           const characters ='0123456789';
           function generateString(length) {
               let result = ' ';
               const charactersLength = characters.length;
               for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
               }
               const common_str = Cypress.env(`common_string`);
               return common_str + result;
           }
           cy.execute('/script/gl_code/create',this.data)            
           cy.get('.form-group input[name=\"gl_code[gl_code]\"]').type(generateString(5));
           cy.wait(5000)
           const ans = generateString(7);
           cy.get('.form-group input[name=\"gl_code[gl_code_name]\"]').type(ans);
           cy.wait(5000)
           cy.contains('button','Save').click()
           cy.wait(5000)
           cy.contains('GL Code successfully created.').should('exist');
           cy.wait(5000)
           cy.contains(ans).parent().parent().find('.text-center').find('.dropdown').find('.dropdown-toggle').click()
           cy.execute('/script/gl_code/edit',this.data)
           cy.get('.form-group input[name=\"gl_code[gl_code_name]\"]').clear().type(generateString(8));
           cy.contains('button','Save').click()
       });
     });
   });
     