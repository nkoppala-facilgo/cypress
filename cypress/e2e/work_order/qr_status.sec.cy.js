describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/qr_status/data`).then(function (data) {
            this.data = data;
        })
    })
    describe("QR status is SNotRead on Work Order hierarchy", function() {
        it('fc-7118 [PMC/Supplier] To verify QR status is SNotRead on Work Order hierarchy when user send a QR to Supplier (Supplier is read) <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.wait(4000)
            cy.execute('/script/work_order/qr_status',this.data)
            cy.contains('label','WO#:').parent().find('p')
            .invoke('text')
            .then(wo_number => {
                cy.get('span[class=caret]').eq(0).click({force:true})  
                cy.contains('Logout').click({force:true})
                cy.wait(3000)
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.supplier2.username,data.supplier2.password);
                });
                this.data.wo_number=wo_number
                cy.visit()
                cy.wait(2000)
                cy.contains("Documents").click()
                cy.wait(2000)
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.contains('a','Work Orders').click({ force: true })
                cy.wait(2000)
                cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true})
                cy.wait(2000)
                cy.select_by_label_with_enter('WO#(s):', this.data.wo_number)
                cy.wait(3000)
                cy.contains('button','Search').click({force:true})
                cy.wait(1000)
                cy.get('.btn-show-work-order').first().click({force:true})
                cy.wait(4000)
                cy.get('#js-react-WorkOrderDocumentHierarchyView  div  table  tbody  tr  td  a').eq(1).contains('(SNotRead)').should('exist')
            })
        });
    });
});
    
