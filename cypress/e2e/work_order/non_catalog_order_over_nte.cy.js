describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.technician1.username,data.technician1.password);
              cy.on('uncaught:exception', (err, runnable) => { return false })
              });
             cy.fixture(`data/${data_path}/work_order/non_catalog_order_over_nte/data`).then(function (data) {
                this.data = data;
             })
          })
        describe("WO Next Step Non-Catalog", function() {
            it('fc-6825 WO Next Step Non-Catalog Service Orders over NTE', function() {
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.execute('script/work_order/create', this.data)
                cy.wait(4000)
                cy.contains('button', 'Goto Summary').click()
                cy.wait(8000)
                cy.execute('/script/work_order/wo_hierarchy_history',this.data) 
                cy.select_by_placeholder_with_enter('Select...',this.data['nte_workflow'],3000)
                cy.get('textarea[placeholder=\"Your Notes/Reason\"]').type(this.data['notes'])
                cy.get('.modal-footer  .btn-primary').contains('Save').click()
                cy.get('.btn-toolbar .btn-success').contains('Create').click()
            });
        });
});
