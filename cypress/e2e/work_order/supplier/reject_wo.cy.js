describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
        cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
            this.data = data;
        })
})
describe("next step work order ", function () {
    var data_path = Cypress.env(`data`)
    it('next step workorder  <smoke>', function () {
        cy.visit("/dashboards/graph")
        cy.contains("Documents").click()
        cy.contains('a','Work Orders').click({ force: true })
        cy.contains('a','Create Work Order').click({ force: true })
        cy.execute('/script/work_order/create',this.data)
        cy.wait(5000)
        cy.execute('/script/work_order/next_step',this.data)
        cy.wait(3000) 
        cy.contains('button[class="pull-right btn btn-default"]','Close').click({force:true})
        cy.contains('label','WO#:').parent().find('input[type=text]')
        .invoke('val')
        .then(wo_number => {
            cy.get('span[class=caret]').eq(0).click({force:true})   
            cy.contains('Logout').click({force:true})
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute('script/login/login', data.supplier)
            });
            cy.visit('/work_orders');
            cy.wait(3000)
            cy.get('.fa-filter').click()
            cy.select_by_label('WO#(s)',wo_number,1500)
            cy.contains('button','Search').click()
            cy.wait(3000)
            cy.get('.media').first().click()
            cy.wait(3000)
            cy.visit("/work_orders/"+wo_number)
                cy.visit("/work_orders/"+wo_number)
            cy.contains('button','Reject').click({force:true})
            cy.contains('button','Yes').click({force:true})
            cy.wait(2000)
            cy.contains('button','Reject').click({force:true})
            cy.contains('button','Yes').click({force:true})
            cy.contains('Success').should('be.visible')
        }); 
    });
});
});