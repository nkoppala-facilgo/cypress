describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.supplier.username,data.supplier.password);
              });
            cy.fixture(`data/${data_path}/order/supplier/reject_from_summary_page/data`).then(function(data) {
                this.data = data;
            })
        }) 
        describe("Reject order Cancellation from Supplier side at Orders summary page", function() {
            it('FC-4393 reject_from_summary_page <smoke>', function() {
                cy.execute('script/order/supplier/path_to_order',this.data)
                cy.get('[data-react-class="DocumentOrderFilterModal"]').find('i').click()
                cy.execute('script/order/supplier/search',this.data)
                cy.get('#btnDocumentPage').contains('Reject Cancellation').click({force: true});
                cy.wait(4000);
                cy.get('.lb-status')
                .invoke('text')  
                .then(text => {
                    const someText = text;
                    cy.log(someText);
                    if(someText === 'SNewOrder'){
                        cy.log('Order Status changed to SNewOrder');
                    }
                });
            });
        });
    });