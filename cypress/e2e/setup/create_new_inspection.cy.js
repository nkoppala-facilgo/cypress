describe("Session Login ", () => {
    beforeEach(() => {
      var data_path = Cypress.env("data");
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username, data.pmc.password);
      });
      cy.fixture(`data/${data_path}/setup/create_new_inspection/data`).then(
        function (data) {
          this.data = data;
        });
    });
    describe("To verify that PMC is able to create new exception group.", function () {
      it("To verify that PMC is able to create new exception group.  <smoke>", function () {
        cy.visit('/exceptions');
       cy.contains('button','New Exception').click({force:true});
       cy.wait(3000);
       cy.select_by_label_new('Exception Group:',this.data['inspection_group']);
       const characters ="0123456789";
       function generateString(length) {
         let result = "";
         const charactersLength = characters.length;
         for (let i = 0; i < length; i++) {
           result += characters.charAt(
             Math.floor(Math.random() * charactersLength)
           );
         }
         const common_str = Cypress.env(`common_string`);
         return common_str + result;
       }
       cy.get('input.form-control-required.form-control').type(generateString(6));
       cy.contains('button','Save').click();
       cy.wait(3000);
       cy.contains('Successfully create new Exception.').should('exist');
      })  
    });
 })