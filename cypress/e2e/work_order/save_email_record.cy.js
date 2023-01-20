describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/save_email_record/data`).then(function (data) {
           this.data = data;
        })
        })
    describe("WO email record", function() {
        it('fc-6896 Verify Save email Record button functionality <smoke>', function() {
            cy.visit();
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains("Documents").click();
            cy.contains("a", "Work Orders").click({ force: true });
            cy.wait(4000)
            cy.get('.btn-show-work-order').first().click()
            cy.wait(4000)
            cy.get('#js-react-WorkOrderSchedulingAttempts').contains('Contact History').should('exist')
            cy.get('.tab-schedule-attempts ').contains('a','Email').click()
            cy.contains('button','Save Email Record').click()
            cy.wait(3000)
            cy.select_by_calendar_using_label('Date/Time:',this.data['date_time'])
            cy.get('textarea[placeholder=\"Call duration: 10:34 mins\"]').type(this.data['notes'])
            cy.get('.modal-footer  .btn-primary').contains('Submit').click()
            cy.contains('Recorded successfully.').should('exist')
        });
    });
});