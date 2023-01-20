describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then((data) => {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/supplier_document_hierarchy/data`).then(function(data) {
            this.supplier_document_hierarchy_data = data;
        })
    }) 
    describe(" Supplier side ", function() {
        it(' FC-1281 Supplier side Document Hierarchy  <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.execute('script/work_order/create', this.supplier_document_hierarchy_data)
            cy.wait(2000)
            cy.contains('button', 'Goto Summary').click()
            cy.wait(8000)
            cy.contains('label','WO#:').parent().find('p')
            .invoke('text')
            .then(wo_number => {
                cy.execute('script/work_order/supplier_document_hierarchy', this.supplier_document_hierarchy_data)
                cy.get('span[class=caret]').eq(0).click({force:true})  
                cy.contains('Logout').click({force:true})
                cy.wait(3000)
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then((data) => {
                    cy.login_with_session(data.supplier.username,data.supplier.password);
                });
                this.supplier_document_hierarchy_data.wo_number=wo_number
                cy.visit('/work_orders/'+wo_number)
                cy.wait(5000)
                cy.get('.btn-show-work-order').first().click()
                cy.wait(2000)
                cy.get('#js-react-WorkOrderItemsView').should('exist')
                cy.wait(2000)
                cy.get('#js-react-WorkOrderDocumentHierarchyView .invoiceTable table tbody tr').its('length').should('be.gt',0)
                cy.wait(2000)
                cy.get('#js-react-WorkOrderRelatedDocumentsView').should('exist')
            });
        });
    });


});