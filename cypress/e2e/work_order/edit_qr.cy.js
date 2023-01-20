describe('Session Login ',()=>{
        beforeEach(() => {
             var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
         cy.fixture(`data/${data_path}/work_order/edit_qr/data`).then(function (data) {
            this.data = data;
         })     
     })
     describe("Edit Quote Request at WO document hierarchy table at PMC side.", function () {
      it(' FC-4384 void Quote Request', function () { 
           cy.visit("/dashboards/graph")
           cy.contains("Documents").click()
           cy.contains('a','Work Orders').click({ force: true })
           cy.wait(6000);
           cy.reload();
           cy.get('.fa-filter').click()
           cy.select_by_label('WO#(s)',this.data['wo_number'],1500);
           cy.contains('button','Search').click()
           cy.wait(5000);
           cy.get('.media').first().click();
           cy.wait(5000);
           cy.get('#js-react-WorkOrderDocumentHierarchyView').find('.btn-danger').last().contains('Void').parent().parent().find('.text-center').eq(2).find('a').contains('QR').should('exist')
           cy.get('#js-react-WorkOrderDocumentHierarchyView > .invoiceTable').contains('Edit').click();
           cy.get('.form-control-required ').first().type(this.data['qr_rename'])
           cy.contains('button','Update').click()
           
       });
     });
     });