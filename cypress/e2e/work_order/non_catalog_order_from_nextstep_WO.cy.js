describe('Session Login ',()=>{
    beforeEach(() => {
           var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
         cy.fixture(`data/${data_path}/work_order/non_catalog_order_over_nte/data`).then(function (data) {
            this.data = data;
         })
      })
    describe("To verify user should be able to select workflow while creating non-catalog order from nextstep WO.", function() {
        it('FC-7457 select workflow while creating non-catalog order from nextstep WO.', function() {
            cy.visit()
            cy.waitUntil(() => true)
            cy.execute('script/work_order/create', this.data)
            cy.waitUntil(() => true)
            cy.contains('button', 'Goto Summary').click()
            cy.waitUntil(() => true)
            cy.execute('/script/work_order/wo_hierarchy_history',this.data)
            cy.contains('button', 'OK').click({force:true})
        });
    });
});
