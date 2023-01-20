describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/wo_status_when_qr_actioned/data`).then(function (data) {
            this.data = data;
        })
    })
    describe(" Work Order status should not change to SDeclined when QR actioned but expired", function() {
        it('fc-7120 To verify Work Order status should not change to SDeclined when QR actioned but expired. <smoke>', function() {
            cy.on('uncaught:exception', (err, runnable) => { return false })
            const d = new Date();
            let day = d.getDate(), month;
            if(d.getDate() < 10){
                day = '0' + (d.getDate());
            }
            if((d.getMonth() + 1) < 10){
                month = '0' + (d.getMonth() + 1);
            }
            let due_date =  month + '/' + day + '/' + (d.getFullYear() + 1);
            let service_date =  month + '/' + day + '/' + (d.getFullYear() );
            let quote_expires =  month + '/' + day + '/' + (d.getFullYear() + 2);
            this.data.due_date=due_date
            this.data.service_date=service_date
            this.data.quote_expires=quote_expires
            cy.execute('/script/work_order/wo_status_when_qr_actioned',this.data)
            cy.wait(3000)
            cy.contains('label','WO#:').parent().find('p')
            .invoke('text')
            .then(wo_number => {
                this.data.wo_number=wo_number
                cy.wait(4000)
                cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true})
                cy.wait(5000)
                cy.select_by_label_with_enter('WO#(s):', this.data.wo_number,3000)
                cy.wait(3000)
                cy.contains('button','Search').click({force:true})
                cy.wait(1000)
                cy.get('.btn-show-work-order').first().click({force:true})
                cy.wait(5000)
                cy.get('#js-react-WorkOrderDocumentHierarchyView  div  table  tbody  tr  td a').eq(1)
                .invoke('attr', 'href')
                .then(href => {
                    cy.visit(href);
                });
                cy.wait(2000)
                cy.contains('label','QR#:').parent().find('p')
                .invoke('text')
                .then(qr_number => {
                    this.data.qr_number=qr_number
                    cy.get('span[class=caret]').eq(0).click({force:true})  
                    cy.contains('Logout').click({force:true})
                    cy.wait(3000)
                    var data_path = Cypress.env(`data`)
                    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.supplier.username,data.supplier.password);
                    });
                    cy.visit()
                    cy.waitUntil(() => true)
                    cy.contains("Documents").click()
                    cy.waitUntil(() => true);
                    cy.on('uncaught:exception', (err, runnable) => { return false })
                    cy.contains('a','Quotes / Contracts').click({ force: true })
                    cy.contains('a','Quote Requests').click({ force: true })
                    cy.waitUntil(() => true);
                    cy.get('.fa-filter').click({force: true})
                    cy.waitUntil(() => true);
                    cy.select_by_label_with_enter('QR#(s):', this.data.qr_number,3000)
                    cy.waitUntil(() => true);
                    cy.contains('button','Search').click({force:true})
                    cy.waitUntil(() => true);
                    cy.get('.btn-show-quote-request').first().click({force:true})
                    cy.waitUntil(() => true);
                    cy.contains('button','Create Quote').click({force:true})
                    cy.waitUntil(() => true);
                    cy.select_by_calendar_using_label_without_clear('QUOTE EXPIRES:',this.data['due_date'])
                    cy.get('input[placeholder=\"Unit Price\"]').type(this.data['unit_price'])
                    cy.get('.btn-toolbar .btn-success').contains('button','Save').click()
                    cy.contains('button','Send').click()
                    cy.waitUntil(() => true);
                    cy.get('span[class=caret]').eq(0).click({force:true})  
                    cy.contains('Logout').click({force:true})
                    cy.waitUntil(() => true);
                    var data_path = Cypress.env(`data`)
                    cy.window().then((win) => {
                        win.sessionStorage.clear()
                        })
                    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
                    });
                    cy.session.clearAllSavedSessions()
                    cy.waitUntil(() => true);
                    cy.visit()
                    cy.waitUntil(() => true);
                    cy.contains("Documents").click()
                    cy.waitUntil(() => true);
                    cy.on('uncaught:exception', (err, runnable) => { return false })
                    cy.contains('a','Work Orders').click({ force: true })
                    cy.waitUntil(() => true);
                    cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true})
                    cy.waitUntil(() => true);
                    cy.select_by_label_with_enter('WO#(s):', this.data.wo_number,3000)
                    cy.waitUntil(() => true);
                    cy.contains('button','Search').click({force:true})
                    cy.waitUntil(() => true);
                    cy.get('.btn-show-work-order').first().click({force:true})
                    cy.waitUntil(() => true);
                    cy.contains('button','Create Order').click({force:true})
                    cy.waitUntil(() => true);
                    cy.select_by_upper_label('Vendor Assignment Workflow',this.data.vendor_assignie,3000)
                    cy.get('.btn-primary').contains('button','Checkout').click()
                })
            })
        });
    });
});
    