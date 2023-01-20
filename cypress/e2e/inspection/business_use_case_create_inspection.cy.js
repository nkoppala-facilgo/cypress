describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/business_use_case_create_inspection/data`).then(function(data) {
            this.data = data;
        });
    });
    describe("Business Use Case- Inspection>Create Inspection", function() {
        it('FC-4133 Inspection>Create Inspection <smoke>', function() {
            cy.visit("/inspections/new");
            cy.waitUntil(() => true);
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
            cy.execute('script/inspection/create_inspection', this.data);
            cy.get('#leaseTitleInput').type(wo_name);
            cy.execute('script/inspection/add_resident', this.data);
           cy.execute('script/inspection/business_use_case_create_inspection', this.data);
        });
    });
});
