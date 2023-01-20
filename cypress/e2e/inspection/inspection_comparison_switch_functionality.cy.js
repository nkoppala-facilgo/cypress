describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/save_inspection/data`).then(function(data) {
            this.data = data;
        })
    });
    describe("Inspection Comprison in Inspections Page", function() {
        it('FC-5440 To Verify "Inspection Comparison" Switch Functionality <smoke>', function() {
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
            cy.wait(3000);
            cy.contains('a','Comparison').click({force: true});
            cy.wait(5000);
            cy.select_by_calendar_using_label('Date From',this.data.date_from);
            cy.wait(3000);
            cy.contains('button','Search').click({force: true});
            cy.wait(5000);
            cy.select_by_placeholder_with_enter('Select...', this.data.base_line);
            cy.wait(2000);
            cy.contains('button','Switch').click({force: true});
            cy.wait(3000);
            cy.get('.sa-confirm-button-container').contains('button','OK').click({force: true});
        });
    });
});