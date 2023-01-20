describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.supplier.username,data.supplier.password);
              });
            cy.fixture(`data/${data_path}/quotes/send_message_template/data`).then(function(data) {
                this.send_message_template_data = data;
            })
        }) 
        describe("send message template", function() {
            it('fc-2881 send message template to PMC', function() {
                cy.visit()
                cy.wait(5000)
                cy.get('.icon-menu-work-order').click()
                cy.wait(5000)
                cy.get('a[href=\"/quotes/new\"]').click({ force: true })
                cy.wait(3000)
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.execute('script/quotes/create', this.send_message_template_data)
                cy.execute('script/quotes/send_message_template', this.send_message_template_data)
            });
        });
    });