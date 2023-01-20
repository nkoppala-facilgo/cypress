describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
        cy.fixture(`data/${data_path}/work_order/send_msg_resident/data`).then(function (data) {
           this.data = data;
        })
     })
    describe("send message to resident", function () {
      it(' FC-1322 send message to resident  <smoke>', function () { 
           cy.execute('/script/work_order/send_msg_resident',this.data)      
       });
     });
   });     