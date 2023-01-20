describe('Session Login ',()=>{
        beforeEach(() => {
            var data_path = Cypress.env(`data`)
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            cy.on('uncaught:exception', (err, runnable) => { return false })
            });
            cy.fixture(`data/${data_path}/work_order/wo_hierarchy_history/data`).then(function (data) {
                this.data = data;
             })
          })
        describe("Work Order hierarchy is displaying on WO summary page", function() {
            it('fc-6726 To verify that Work Order hierarchy is displaying on WO summary page <smoke>', function() {
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.execute('script/work_order/create', this.data)
                cy.wait(4000)
                cy.contains('button', 'Goto Summary').click()
                cy.wait(8000)
                cy.contains('label','WO#:').parent().find('p')
                .invoke('text')
                .then(wo_number => {
                        cy.execute('/script/work_order/wo_hierarchy_history',this.data) 
                        cy.wait(5000)
                        cy.contains('Success').should('exist')
                        cy.contains('OK').click()
                        cy.get('span[class=caret]').eq(0).click({force:true})  
                        cy.contains('Logout').click({force:true})
                        cy.wait(3000)
                        var data_path = Cypress.env(`data`)
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.supplier2.username,data.supplier2.password);
                        });
                        this.data.wo_number=wo_number
                        cy.visit()
                        cy.visit('/work_orders/')
                        cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true})
                        cy.wait(5000)
                        cy.select_by_label_with_enter('WO#(s)',this.data['wo_number'],1500)                    
                        cy.contains('button','Search').click()
                        cy.wait(4000)
                        cy.get('.btn-show-work-order').first().click()
                        cy.wait(2000)
                        cy.get('#js-react-WorkOrderDocumentHierarchyView  div  table tbody tr td a').eq(1)
                        .should('have.attr', 'href')
                        .then((href) => {
                        cy.visit(href)
                        })
                        cy.wait(3000)
                        cy.get('.fa-chevron-down').click()
                        cy.contains('label','REFERENCED WO#:').should('exist')
                        cy.contains('label','REFERENCED WO#:').parent().find('a')
                        .should('have.attr', 'href')
                        .then(href => {
                            cy.visit(href)
                        })
                       cy.get('#js-react-DocumentHistories').should('exist')
                });
            });
        });
});
