describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/Instruction_field_appeared_as_required/data`).then(function (data) {
                this.data = data;
        })
    })
    describe("Instruction field is appeared as required", function() {
        it('fc-7114 Verify Instruction field is appeared as required when company setting Require Work Order Items to have instructions is enable <smoke>', function() {
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.waitUntil(() => true);
            cy.execute('/script/work_order/Instruction_field_appeared_as_required',this.data)
        });
    });
});
    