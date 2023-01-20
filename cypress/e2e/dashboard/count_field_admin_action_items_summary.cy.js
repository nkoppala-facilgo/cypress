describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/dashboard/count_field_admin_action_items_summary/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Count Field Admin Action Items Count Summary page when user click the label count link", function () {
        it('FC-5641 Field Admin Action Items Count Summary: To verify that the page should navigate to work order filter page when user click the label count link <smoke>', function () {
            function checkUrl(furl,jsonData,i,j){
                cy.visit();
                cy.wait(7000);
                cy.get('#field_admin_action_items_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
                .then(text => {
                    const count = text;
                    cy.log("Count is => ",count);
                    cy.wait(5000);                                                        
                    if(count === 0){
                        cy.wait(1000);
                        cy.visit(furl);
                        console.log("inside if => ",furl);
                        cy.contains("No Data").should("be.visible");
                    }
                    else if(Number(count) < 20){
                        cy.visit();
                        cy.wait(4000);
                        cy.get('#field_admin_action_items_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
                        .then(text => {
                            if(text != 0) {   
                                cy.get('#field_admin_action_items_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).find('a').click({force: true});
                            }
                        });
                        cy.wait(1000);
                        cy.visit(furl);
                        cy.log("inside else",furl);
                        cy.get("body").then($body => {
                            if ($body.find('div[id="scroll-search"]').length > 0) {   
                                cy.get('div[id="scroll-search"]').find('li').should('have.length', Number(count));
                            }
                        });
                    }
                    else {
                        function countItems(count){
                            cy.log(count);
                            cy.get("body").then($body => {
                            if ($body.find("#scroll-search").length > 0) {  
                                    cy.log("hey ");
                                    cy.wait(1000); 
                                    cy.get('#scroll-search').scrollTo('0%', '100%');     
                                }else{
                                    cy.log("__Count is zero__");
                                }
                            });
                            cy.wait(2000);
                            cy.get('div[class="error-message"]').find('span').invoke('text')
                            .then(message => {
                                if(message === "No More data!"){
                                    cy.wait(3000)
                                    cy.get("body").then($body => {
                                        if ($body.find("div[id='scroll-search']").length > 0) {  
                                            cy.get('div[id="scroll-search"]').find('li').should('have.length', Number(count));
                                        }else{
                                            cy.log("__Count is zero __");
                                        }
                                    });
                                }
                                else {
                                    countItems(count);
                                }
                            });
                        }
                        cy.visit();
                        cy.wait(4000);
                        cy.get('#field_admin_action_items_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')
                        .then(count_dash => {
                            if(count_dash != 0){
                                cy.get('#field_admin_action_items_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).find('a').click({force: true});   
                            }
                        });
                        cy.wait(1000);
                        cy.visit(furl);
                        countItems(Number(count));
                    }              
                });
            }
            cy.visit();
            cy.wait(7000);
            cy.get('span[class=caret]').first().click({force: true});
            cy.contains('Account Settings').click({force: true});
            cy.contains('Company Settings').click({force: true});
            var script_path = Cypress.env("base_url");
            const api_value = "fieldAdminActionItems=true";
            cy.contains("label","API Token").parent().find("input[type=text]").invoke("val")
            .then(token => {
                cy.request({
                    method : "GET",
                    url : `${script_path}/api/v2/work_orders?token=${token}&${api_value}`,
                    auth: 
                    {
                        username: Cypress.env("username"),
                        password: Cypress.env("password")
                    }        
                }).then((res) => {
                    cy.visit();
                    cy.wait(7000);
                    var row_data = res.body.data.row_data; 
                    for(let i = 0 ; i < row_data.length; i++){
                        this.data.action_items.push(row_data[i]["label"]);
                    }
                    var col_len = this.data.action_name.length;
                    for(let i = 0 ; i < row_data.length; i++){
                        for(let j = 0 ; j < col_len; j++){
                            var new_url = this.data.common_url + this.data.base_url1[i] + this.data.action_name[j] + this.data.base_url2[i];
                            cy.log("New_Url==> ",new_url);   
                            var jsonData = this.data;
                            checkUrl(new_url, jsonData, i, j);
                        }
                    }
                });                       
            });                  
        });
    });
});