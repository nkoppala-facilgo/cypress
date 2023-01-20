describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.newpmc.username,data.newpmc.password);
                });
                cy.fixture(`data/${data_path}/register_pmc/create_wo_types_subtypes/data`).then(function (data) {
                        this.data = data;
                });
              
        }) 
      describe("new pmc ", function () {
       it('fc-5180 Create WO Types / Subtypes', function () { 
               cy.visit()
               cy.visit('/work_order_types')
               cy.wait(4000)
               cy.contains('button','New Work Order Type / Subtype').click({force: true})
               cy.wait(2000)
               cy.execute('script/register_pmc/create_wo_types_subtypes', this.data)
               cy.contains('button','Save').click({force: true})
              
        });
      });
      describe("new pmc ", function () {
        it('Create WO Types / Subtypes Import', function () { 
                cy.visit()
                cy.visit('/work_order_types')
                cy.wait(4000)
                cy.contains('button','Import Work Order Type / Subtype').click({force: true})
                cy.get(`div[class='file-dropzone']`).find('input[type=file]').attachFile(this.data['file_path'])
                cy.contains('button','Import').click({force: true})
        });
       });
});

