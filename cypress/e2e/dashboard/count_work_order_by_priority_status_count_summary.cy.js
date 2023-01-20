describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/dashboard/count_work_order_by_priority_status_count_summary/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("count work order by priority status count summary and click on hyperlink on wo summary", function () {
        it('Work Order By Priority Status Count Summary : To Verify user can able to click the each label count link <smoke>', function () {
            function checkUrl(furl,jsonData,i,j){
                cy.visit();
                cy.wait(7000);
                cy.get('#priority_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
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
                        cy.get('#priority_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
                        .then(text => {
                            if(text != 0) 
                            {   
                                cy.get('#priority_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).find('a').click({force: true});
                            }
                        });
                        cy.wait(1000);
                        cy.visit(furl);
                        console.log("inside else",furl);
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
                        cy.get('#priority_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')
                        .then(count_dash => {
                            if(count_dash != 0){
                                cy.get('#priority_count_table_tbody').find('tr').eq(i).find('td').eq(1+j).find('a').click({force: true});   
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
            cy.get('span[class=caret]').first().click({force:true});
            cy.contains('Account Settings').click({force:true});
            cy.contains('Company Settings').click({force:true});
            const api_value="prioritystatuscount=prioritystatuscount";
            var script_path = Cypress.env("base_url");
            cy.contains("label","API Token").parent().find("input[type=text]").invoke("val")
            .then(token => {
                cy.request({
                    method : "GET",
                    url : `${script_path}/api/v2/work_orders?token=${token}&${api_value}`,
                    auth: {
                        username: Cypress.env("username"),
                        password: Cypress.env("password")
                    }        
                    }).then((res) => {
                    cy.visit();
                    cy.wait(7000);
                    var row_data = res.body.data;  
                    cy.log(row_data); 
                    for(let i = 0 ; i < row_data.length; i++){
                        this.data.priority_id.push(row_data[i]["priority_id"]);
                    }
                    cy.log("priority_ids = >"+this.data.priority_id);
                    let row_count = this.data.priority_id.length;
                    let column_count = this.data.status.length;

                    for(let i = 0 ; i < row_count ; i++){
                        var priority = this.data.priority_id[i];
                        console.log(priority);
                        var wo_count = this.data.common_base_url1;
                        wo_count += priority;
                        for(let j = 0 ; j < column_count ; j++){
                            var furl = this.data.common_base_url1;
                            furl += priority;
                            if(Number(this.data.status[j]) > 4000)
                            {
                                furl += this.data.common_base_url3;
                                furl += this.data.status[j];
                                wo_count += this.data.common_base_url4;
                            }
                            else
                            {
                                furl += this.data.common_base_url2;
                                furl += this.data.status[j] + '&';
                                wo_count += this.data.common_base_url2;
                            }
                            wo_count += this.data.status[j];
                            console.log("furl==> ",furl)
                            
                            var jsonData = this.data;
                            checkUrl(furl,jsonData,i,j);
                        }
                        wo_count += this.data.common_base_url5;
                        var jsonData = this.data;
                        checkUrl(wo_count,jsonData,i,column_count);
                    }                       
                });                
            });
        });
    });
});