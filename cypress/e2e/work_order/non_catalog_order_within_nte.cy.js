describe('Session Login ',()=>{
        beforeEach(() => {
               var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.fa.username,data.fa.password);
              cy.on('uncaught:exception', (err, runnable) => { return false })
              });
             cy.fixture(`data/${data_path}/work_order/non_catalog_order_within_nte/data`).then(function (data) {
                this.data = data;
             })
          })
        describe("WO Next Step Non-Catalog", function() {
            it('fc-6824 Create a Next Step Service non-catalog order within NTE for approval.', function() {
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.execute('script/work_order/create', this.data)
                cy.wait(4000)
                cy.contains('button', 'Goto Summary').click()
                cy.wait(8000)
                cy.execute('/script/work_order/wo_hierarchy_history',this.data) 
            });
        });
});
