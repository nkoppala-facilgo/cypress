describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/add_resident/data`).then(function (data) {
          this.data = data;
        });
    });
 
    describe("Add Resident In Inspection Page",function (){
        it("FC-4543 Verify that user can add Resident details in Inspection page <smoke>",function (){
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
            cy.execute('script/inspection/create_inspection',this.data); 
            cy.get('#leaseTitleInput').type(wo_name);  
            cy.execute('script/inspection/add_resident',this.data);
       });
    });
});
 
