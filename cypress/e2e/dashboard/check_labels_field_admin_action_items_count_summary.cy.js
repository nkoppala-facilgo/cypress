describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/dashboard/check_labels_field_admin_action_items_count_summary/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Field Admin Action Items Count Summary : To check the Label values", function () {
        it('FC-7139 check labels on field admin action items count summary <smoke>', function () {
            cy.visit();
            cy.wait(7000);
            cy.get('span[class=caret]').first().click({force:true});
            cy.contains('Account Settings').click({force:true});
            cy.contains('Company Settings').click({force:true});
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
                    for(let i = 0 ; i < this.data.action_items.length; i++){
                        cy.get('#field_admin_action_items_count_table_tbody').find('tr').eq(i).find('td').eq(0).invoke('text')  
                        .then(text => {
                            expect(this.data.action_items[i]).to.equal(text);
                        });
                    }
                    for(let i = 0 ; i < this.data.row_lebels.length; i++){
                        cy.get('#field_admin_action_items_count_table_thead').find('tr').first().find('th').eq(1+i).invoke('text')  
                        .then(text => {
                            expect(this.data.row_lebels[i]).to.equal(text);
                        });
                    }
                });                       
            });       
        });
    });
});