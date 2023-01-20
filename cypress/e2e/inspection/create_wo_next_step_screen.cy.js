describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/create_wo_next_step_screen/data`).then(function(data) {
            this.data = data;
        })
    });
    describe("To verify user is able to select assignee on create WO next step screen.", function() {
        it('FC-7456 Select assignee on create WO next step screen<smoke>', function() {
            const characters ='0123456789';
            function generateString(length) {
                let result = '';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                const common_str = Cypress.env(`common_string`);
               return common_str + result;
            }
            const wo_name = generateString(6);
            this.data.item_name = 'Inspection' + wo_name;
            this.data.inspection_title = wo_name;
            cy.visit('/inspections/new');
            cy.execute('script/inspection/create_wo_next_step_screen', this.data);
        });
    });
});
