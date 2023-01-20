describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              cy.on('uncaught:exception', (err, runnable) => { return false })
              });
          })
         describe("New Notification Setting button", function () {
           it('fc-6728 To verify New Notification Setting button is appeared on Notification Settings page on supplier side.  <smoke>', function () { 
                cy.on('uncaught:exception', (err, runnable) => {return false;});
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Account Settings').click({force:true}) 
                cy.wait(3000)
                cy.contains('a','Notification Settings').click()
                cy.wait(3000)
                cy.contains('button','New Notification Settings').should('exist')
            });
          });
        });