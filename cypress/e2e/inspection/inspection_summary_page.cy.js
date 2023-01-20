describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/save_inspection/data`).then(function (data) {
          this.data = data;
        });
    });
 
    describe("Verify that user can navigate to Inspection Summary page",function (){
        it("FC-4541 Verify that user can save the inspection",function (){
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
            cy.execute('script/inspection/save_inspection',this.data);
            cy.wait(2000);
            cy.contains('button','Goto Summary').click({force:true});
            cy.wait(2000);
            cy.contains('button','OK').click({force:true});
            cy.wait(5000);
            cy.contains(this.data.unit).should('exist');
        });
    });
});
 