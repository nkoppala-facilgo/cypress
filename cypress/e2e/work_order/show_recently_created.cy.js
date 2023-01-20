describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
             cy.fixture(`data/${data_path}/work_order/show_recently_created/data`).then(function (data) {
                this.data = data;
             })
          })
         describe("send message to resident", function () {
           it('FC-5674 send message to resident  <smoke>', function () { 
                cy.execute('/script/work_order/show_recently_created',this.data) 
            });
    });
});     