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
    describe("Field Admin Action Items Count Summary : To Verify user can able to click the each label count link", function () {
        it('FC-7140 check hyperlinked field admin action items <smoke>', function () {
            function checkUrl(i,j){
                cy.visit();
                cy.wait(7000);
                cy.get('#field_admin_action_items_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
                .then(text => {
                    const count = text;
                    cy.log("Count is => ",count);
                    cy.wait(1000);                                                        
                    if(count == 0){
                        console.log("count is zero link is not hyperlinked");
                    }
                    else {  
                        cy.get('#field_admin_action_items_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).find('a').click({force: true});
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
                    let row_count = this.data.action_items.length;
                    let col_count = this.data.priority_id.length;
                    let i, j;
                    for(i = 0 ; i < row_count ; i++){
                        for(j = 0 ; j < col_count; j++){   
                            checkUrl(i, j);
                        }
                        checkUrl(i, j);
                    }                       
                });                
            });
        });
    });
});