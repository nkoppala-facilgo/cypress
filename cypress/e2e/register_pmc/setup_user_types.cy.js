describe('Session Login ',()=>{
      beforeEach(() => {
              var data_path = Cypress.env(`data`)
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.newpmc.username,data.newpmc.password);
            });
            cy.fixture(`data/staging/register_pmc/setup_user_types/data`).then(function (data) {
              this.data = data;
            })
          })
        describe("new pmc", function () {
          it('fc-5183 setup user type', function () { 
            cy.visit()
            cy.wait(4000)
            cy.get('.icon-menu-settings').click()
            cy.contains('a','Users').click()
            cy.wait(2000)
            cy.contains('a','User Types').click()
            cy.wait(2000)
            cy.contains('button',' Add User Type').click()
            cy.wait(2000)
            cy.execute('script/register_pmc/setup_user_types', this.data)
            cy.get('.fa-check-square-o').click({ multiple: true });
            let row_length = this.data.row_responsibility.length;
            let column_length = this.data.column_action.length;
            let checkboxes_length = this.data.checkboxes.length;
            let row = 0, column = 0;
            for(let i = 0; i < checkboxes_length; i++)
            {
              for(let p = 0; p < row_length; p++)
              {
                if(this.data.checkboxes[i]["responsibility"] === this.data.row_responsibility[p])
                {
                  row = p; 
                  break;
                }
              }
              for( let j = 0; j < column_length; j++)
              {
                if(this.data.checkboxes[i]["action"] === this.data.column_action[j])
                {
                  column = j;
                  break;
                }    
              }
              cy.get('.modal-body').find('table').find('tbody').find('tr').eq(row).find('td').eq(Number(column)+1).find('i').click({force: true});
            }
            cy.contains('button','Create').click()
          });
       
        });
});