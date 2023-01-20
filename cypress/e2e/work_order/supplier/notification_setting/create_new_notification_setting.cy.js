describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              cy.on('uncaught:exception', (err, runnable) => { return false })
              });
             cy.fixture(`data/${data_path}/work_order/supplier/notification_setting/create_new_notification_setting/data`).then(function (data) {
                this.data = data;
             })
          })
         describe("create new notification setting at supplier side.", function () {
           it('fc-6724 verify user is able to create new notification setting at supplier side.  <smoke>', function () { 
                cy.on('uncaught:exception', (err, runnable) => {return false;});
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.wait(3000)
                const characters ='0123456789';
                var common_str = Cypress.env(`common_string`);	
                function generateString(length,common_str = "0") {
                let result = '';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                     result += characters.charAt(Math.floor(Math.random() * charactersLength));
                   }                
                return common_str + result;
                }
                this.data['notification_contact'] = generateString(9);
                cy.get('span[class=caret]').eq(0).click({force:true})   
                cy.contains('Account Settings').click({force:true}) 
                cy.wait(3000)
                cy.contains('a','Notification Settings').click()
                cy.wait(3000)
                cy.contains('button','New Notification Settings').click({ force: true })
                cy.wait(5000)
                cy.execute('/script/work_order/supplier/notification_setting/create_new_notification_setting',this.data) 
                cy.contains('button','Submit').click()  
                cy.contains('Notification Setting has been added!').should('exist')  
                cy.get('.confirm').click() 
            });
          });
        });
