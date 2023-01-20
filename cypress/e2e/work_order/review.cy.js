describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
          cy.fixture(`data/${data_path}/work_order/review/data`).then(function (data) {
             this.data = data;
          })     
      })
      describe("Review work order", function () {
       it('FC-3182 Review work order  <smoke>', function () { 
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
        const work_order_name = generateString(6);
            cy.visit("/dashboards/graph")
            cy.contains('button','Schedule Work Order').click()
            cy.wait(5000)
            cy.select_by_label('Property Name',this.data['prop_name'],8000)
            cy.select_by_label('Unit',this.data['unit'],0)
            cy.select_by_label('Work Order Type',this.data['type'],0)
            cy.select_by_label('Work Order Subtype',this.data['subtype'],0)
            cy.select_by_label_with_enter('Work Order Priority:',this.data['priority'],1000)
            cy.get('input[placeholder=\"- Work Order Title -\"]').clear().type(work_order_name)
            cy.contains('button',' Work Order Item').click()
            cy.wait(5000)
            cy.get('input[placeholder=\"- Item Name -\"]').type(this.data['item_name'])
            cy.get('textarea[placeholder=\"- Instruction -\"]').type(this.data['Introduction1']);
            cy.get('div.modal-footer > button.btn.btn-success').click()
            cy.contains('Success!').should('exist')
            cy.visit()
                const api_value = 'fieldAdminActionItems';
                cy.get('span[class=caret]').first().click({force:true})   
                cy.contains('Account Settings').click({force:true})
                cy.contains('Company Settings').click({force:true})
                cy.contains("label","API Token").parent().find("input[type=text]")
                .invoke("val")
                .then(token => {
                    var url = Cypress.env(`base_url`)
                    cy.request({
                        method : "GET",
                        url : url + `/api/v2/work_orders?token=${token}&page=1&${api_value}=true`,
                        auth: {
                            username: Cypress.env("username"),
                            password: Cypress.env("password")
                        }        
                    }).then((res) => {
                        cy.wait(7000)
                        var row_data= res.body.data.row_data
                        console.log(row_data)
                            if(row_data[0].params != null){
                                var jsonData = row_data[0].params;
                                var link = "/work_orders/filter?";
                                Object.keys(jsonData).forEach(function(key) {
                                    console.log(key)
                                    if(key != "work_order_priority_ids"){
                                        let type = Array.isArray(jsonData[key]);
                                        if(!type){
                                            link += `filter_work_order%5B${key}%5D=${jsonData[key]}&`
                                        }
                                        else {
                                                link +=`filter_work_order%5B${key}%5D%5B%5D=${jsonData[key][0]}&`
                                        }
                                    }
                                });
                                    cy.log('**green message**')
                                    var original_link = link + `filter_work_order%5Bwork_order_priority_ids%5D%5B%5D=${jsonData["work_order_priority_ids"][0]}`
                                    cy.visit(original_link)
                                    cy.wait(5000)
                            }
                    })
                })
                this.data.work_order_name = work_order_name;
                cy.execute('script/work_order/review',this.data)
        });
      });
      
}); 