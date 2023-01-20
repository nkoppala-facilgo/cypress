describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              cy.on('uncaught:exception', (err, runnable) => { return false })
              });
           
          })
         describe("Notification Settings menu at supplier side.", function () {
           it('fc-6729 To verify Notification Settings menu is appeared on Account setting. <smoke>', function () { 
                cy.on('uncaught:exception', (err, runnable) => {return false;});
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.wait(3000)
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Account Settings').click({force:true}) 
                cy.wait(3000)
                cy.contains('a','Email Notifications').should('exist')
                cy.contains('a','Notification Settings').should('exist')
                cy.contains('a','Basic Profile').should('exist')
                
            });
          });
        });