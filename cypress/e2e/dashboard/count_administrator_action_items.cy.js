describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc4.username, data.pmc4.password);
        });
        cy.fixture(`data/${data_path}/dashboard/count_administrator_action_items/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("Count Administration Action Items Count Summary page when user click the label count link", function () {
        it('FC-10541 Automation of dashboard - Administrator Action Items(Count Matching) <smoke>', function () {
            cy.visit();
            cy.wait(4000);
            cy.get('span[class=caret]').first().click({force:true});
            cy.contains('Account Settings').click({force:true});
            cy.contains('Company Settings').click({force:true})
            cy.contains("label","API Token").parent().find("input[type=text]").invoke("val")
            .then(token => {
                cy.visit();
                cy.wait(4000);
                var full_url = Cypress.env("base_url");
                for( let i = 0; i < 12; i++) {
                    for( let j = 0; j < 4; j++) {
                        cy.get('#graph-content-0').find("tbody").find('tr').eq(i).find('td').eq(1+j).invoke('text')
                        .then(text => {
                            const count = text;
                            cy.log("Count is => ",count);
                                if(text == 0){
                                    return false;
                                }
                            else {
                                cy.request({
                                    method : "GET",
                                    url : `${full_url}/api/v2/work_orders?token=${token}&v2=true&sp_api=true&current_page=1&filter[widget_name]=${this.data.rowdata[i]}&filter[work_order_priority_ids][]=${this.data.dataurls[i][j]}`,
                                    auth: {
                                        username: Cypress.env("username"),
                                        password: Cypress.env("password")
                                    }        
                                }).then((result) => {
                                    console.log(result);
                                    expect(result.body.contents.totalWorkOrders).to.eq(Number(count));
                                })                        
                            }
                        })
                    }
                }
            })
        })
    })
})