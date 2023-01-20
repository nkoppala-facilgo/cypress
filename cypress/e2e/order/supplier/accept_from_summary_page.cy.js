describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.supplier.username,data.supplier.password);
              });
            cy.fixture(`data/${data_path}/order/supplier/accept_from_summary_page/data`).then(function(data) {
                this.data = data;
            })
        }) 
        describe("Accept cancellation", function() {
            it('FC-4394 Accept Cancellation order from Supplier side at Orders summary page <smoke>', function() {
                cy.execute('script/order/supplier/path_to_order',this.data)
                cy.get('[data-react-class="DocumentOrderFilterModal"]').find('i').click()
                cy.execute('script/order/supplier/search',this.data)
                cy.get('#btnDocumentPage').contains('Accept Cancellation').click();
                cy.wait(3000);
                cy.contains('Order has been Cancelled').should('exist')
                cy.get('.lb-status')
                .invoke('text')  
                .then(text => {
                    const someText = text;
                    cy.log(someText);
                    if(someText === 'CCancelled'){
                        cy.log('Order Status changed to CCancelled');
                    }
                });
            });
        });
    });