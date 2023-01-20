describe('Session Login ',()=>{
        beforeEach(()=>{
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
              });
          })
describe("click and count on work order priority status ",function(){
  it("Work Order By Priority Status Count: To verify that the page should navigate to work order filter page when user click the label count link <smoke>",function(){
                cy.visit()
                cy.get('span[class=caret]').first().click({force:true})   
                cy.contains('Account Settings').click({force:true})
                cy.contains('Company Settings').click({force:true})
                cy.contains("label","API Token").parent().find("input[type=text]")
                .invoke("val")
                .then(token => {
                        var full_url = Cypress.env("base_url");
                        cy.request({
                                method : "GET",
                                url : `${full_url}/api/v2/work_orders?token=${token}&prioritystatuscount=prioritystatuscount`,
                                auth: {
                                        username: Cypress.env("username"),
                                        password: Cypress.env("password")
                                }        
                        }).then((res) => {
                                cy.wait(7000)
                                var row_data= res.body.data
                                console.log(row_data)
                                for(let i=0;i<row_data.length;i++){
                                        var jsonData = row_data[i];
                                        var link = `/work_orders/filter?filter_work_order%5Bwork_order_priority_ids%5D%5B%5D=${jsonData["priority_id"]}&filter_work_order%5B`;
                                        Object.keys(jsonData).forEach(function(key) {
                                                console.log(key)
                                                if(key != "priority_id" && key != "total"){
                                                        var original_link = link;
                                                        if(Number(key) > 4000){
                                                                original_link += `custom_value_status_ids%5D%5B%5D=${key}`;
                                                        }
                                                        else {
                                                                original_link += `work_order_status_ids%5D%5B%5D=${key};`
                                                        }
                                                        var count = jsonData[key];
                                                        cy.log(count)
                                                        if(count === 0){
                                                                cy.visit(original_link)
                                                                cy.contains("No Data").should("be.visible")
                                                        }
                                                        else if(Number(count) < 20){
                                                                cy.visit(original_link)
                                                                cy.get('div[id="scroll-search"]').find('li')
                                                                .should('have.length', Number(count))
                                                        }
                                                        else {
                                                                function countItems(count){
                                                                        cy.log(count)
                                                                        cy.get('#scroll-search').scrollTo('0%', '100%')
                                                                        cy.wait(2000)
                                                                        cy.get('div[class="error-message"]').find('span')
                                                                        .invoke('text')
                                                                        .then(message => {
                                                                                if(message === "No More data!"){
                                                                                        cy.wait(3000)
                                                                                        cy.get('div[id="scroll-search"]')
                                                                                        .find('li').should('have.length', count)
                                                                                }
                                                                                else {
                                                                                        countItems(count)
                                                                                }
                                                                        })
                                                                }
                                                                cy.visit(original_link)
                                                                countItems(Number(count))
                                                        }
                                                        cy.wait(5000)
                                                }
                                        });
                                                        
                                }
                        })
                })
        });    
})
})







