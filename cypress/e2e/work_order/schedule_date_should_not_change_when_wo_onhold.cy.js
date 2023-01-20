describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/schedule_date_should_not_change_when_wo_onhold/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("To verify 'SCHEDULED START DATE/TIME' and 'SCHEDULED END DATE/TIME' should not be change when user resume the WO from 'On Hold' on WO summary page ", function () {
        it("FC-9350 'SCHEDULED START DATE/TIME' and 'SCHEDULED END DATE/TIME' should not be change when user resume the WO from 'On Hold' <regression>", function () {
            cy.visit();
            cy.wait(7000);
            cy.execute("script/work_order/schedule_date_should_not_change_when_wo_onhold", this.data);
        });
    });
});
