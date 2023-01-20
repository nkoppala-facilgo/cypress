describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              cy.on('uncaught:exception', (err, runnable) => { return false })
              });
          })
         describe("new notification setting at supplier side.", function () {
           it('fc- 6725 verify user is able to enable/ disable notification settings.  <smoke>', function () { 
                cy.on('uncaught:exception', (err, runnable) => {return false;});
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.wait(3000)
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Account Settings').click({force:true}) 
                cy.wait(3000)
                cy.contains('a','Notification Settings').click()
                cy.wait(3000)
                cy.wait(4000)
                cy.get('span[class=caret]').eq(1).click({force:true})
                cy.wait(3000)
                cy.get('li[role=\"presentation\"]').find('i').eq(1).click({force:true})
                cy.contains('button','OK').click()  
                cy.wait(3000)
                cy.contains('Success').should('exist')   
            });
          });
        });
