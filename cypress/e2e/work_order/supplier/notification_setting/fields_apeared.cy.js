describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              cy.on('uncaught:exception', (err, runnable) => { return false })
              });
          })
         describe("notification setting fields appeared on Create Notification Setting pop up.", function () {
           it('fc-6727 fields Notification Method Notification For and Notification Contact are appeared on Create Notification Setting pop up. <smoke>', function () { 
                cy.on('uncaught:exception', (err, runnable) => {return false;});
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.wait(3000)
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Account Settings').click({force:true}) 
                cy.wait(3000)
                cy.contains('a','Notification Settings').click()
                cy.wait(3000)
                cy.contains('button','New Notification Settings').click({ force: true })
                cy.wait(5000)
                cy.get('#notification_setting_form label').contains('Notification Method').should('exist')
                cy.get('#notification_setting_form label').contains('Notification For').should('exist')
                cy.get('#notification_setting_form label').contains('Notification Contact').should('exist')
            });
          });
        });