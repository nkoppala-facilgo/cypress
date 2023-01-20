describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/dashboard/count_supplier_follow_up/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Supplier Follow Up: Verify that the same dashboard data count shoud match with work order result page", function () {
        it('FC-7138, FC-7137 count supplier follow up label data <smoke>', function () {
            function checkUrl(furl,jsonData,i,j){
                cy.visit();
                cy.wait(7000);
                cy.get('#scrollableSupplierFollowUpTbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
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
                        cy.get('#scrollableSupplierFollowUpTbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
                        .then(text => {
                            if(text != 0) {   
                                cy.get('#scrollableSupplierFollowUpTbody').find('tr').eq(i).find('td').eq(1+j).find('a').click({force: true});
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
                        cy.get('#scrollableSupplierFollowUpTbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')
                        .then(count_dash => {
                            if(count_dash != 0){
                                cy.get('#scrollableSupplierFollowUpTbody').find('tr').eq(i).find('td').eq(1+j).find('a').click({force: true});   
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
            const api_value = "supplierFollowUp=true";
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
                    var col_data = res.body.data;   
                    for(let i = 0 ; i < col_data.length; i++){
                        this.data.priority_id.push(col_data[i]["priority_id"]);
                    }
                    let col_count = this.data.priority_id.length;
                    let row_count = this.data.supplier_follow_up.length;
                    let i, j;
                    for(i = 0 ; i < row_count ; i++){
                        var base_url = this.data.common_url + this.data.dynamic_url1[i];
                        var fur2 = "";
                        for(j = 0 ; j < col_count; j++){
                            if(j == 0){
                                fur2 += base_url;
                            }
                            else{
                                fur2 += this.data.common_url2;
                            }
                            fur2 += this.data.priority_id[j];
                            var furl = base_url + this.data.priority_id[j];
                            var jsonData = this.data;
                            checkUrl(furl,jsonData,i,j);
                        }
                        var jsonData = this.data;
                        checkUrl(fur2,jsonData,i,j);
                    }                       
                });                
            });
        });
    });
});
