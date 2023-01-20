describe('Session Login ',()=>{
   beforeEach(() => {
         var data_path = Cypress.env(`data`)
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });

   cy.fixture(`data/${data_path}/user/create/data`).then(function (data) {
      this.data = data;
   })

})

describe("able to create new user", function () {
 it('new user create', function () { 
   const characters ="0123456789";
   function generateString(length) {
       let result = "";
       const charactersLength = characters.length;
       for (let i = 0; i < length; i++) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       const common_str = Cypress.env(`common_string`);
      return common_str + result;
   }
   let flag = generateString(7);
   this.data.email = flag + '@7hgjhf4.com'
   cy.visit('/user_management')
   cy.contains("New User").click()
   cy.execute('script/user/create',this.data)
   cy.contains('Success').should('exist')
   cy.contains('OK').click()    
  });
});
});