describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data")
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/dashboard/count_work_order_summary_by_supplier/data`).then(function (data) {
                        this.data = data;
                })
        })
         describe("Count widget count and click on hyperlink on wo summary by supllier", function () {
           it('Work Order Summary By Suppliers : To Verify user can able to click the each label count link <smoke>', function () {
                cy.visit()
                cy.get('span[class=caret]').first().click({force:true})  
                cy.contains('Account Settings').click({force:true})
                cy.contains('Company Settings').click({force:true})
                const api_value="workorderbysuppliers=workorderbysuppliers";
                cy.contains("label","API Token").parent().find("input[type=text]")
                .invoke("val")
                .then(token => {
                        cy.request({
                                method : "GET",
                                url : `https://staging.facilgo.com/api/v2/work_orders?token=${token}&page=1&${api_value}`,
                                auth: {
                                        username: Cypress.env("username"),
                                        password: Cypress.env("password")
                                }        
                        }).then((res) => {
                                cy.visit()
                                cy.wait(7000)
                                var row_data= res.body.data
                                const column_count = this.data.dynamic_url.length;
                                for(let i = 0 ; i < row_data.length ; i++){
                                        this.data.supplier_name.push(row_data[i]["supplier_name"]);
                                }
                                console.log("supplier_names = >"+this.data.supplier_name)
                                const len = this.data.supplier_name.length;
                                for(let i = 0 ; i < len ; i++){
                                        var sup = this.data.supplier_name[i];
                                        console.log(sup)
                                        for(let j = 0 ; j < column_count ; j++){
                                                var furl = this.data.common_base1;
                                                furl+=sup;
                                                furl += this.data.common_base2;
                                                furl+= this.data.dynamic_url[j];
                                                furl += this.data.common_url;
                                                console.log("furl",furl)
                                                var jsonData = this.data;
                                                checkUrl(furl,jsonData);
                                                function checkUrl(furl,jsonData){
                                                cy.visit()
                                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j)
                                                        .invoke('text')  
                                                        .then(text => {
                                                        const count = text;
                                                        cy.log("Count is => ",count)
                                                        cy.wait(5000);                                                        
                                                        if(count === 0){
                                                                cy.wait(1000)
                                                                cy.visit(furl)
                                                                console.log("inside if => ",furl)
                                                                cy.contains("No Data").should("be.visible")
                                                        }
                                                        else if(Number(count) < 20){
                                                                cy.visit()
                                                                cy.wait(4000)
                                                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j)
                                                                .invoke('text')  
                                                                .then(text => {
                                                                    if(text != 0)    
                                                                       cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j).find('.clickable-icon').click()
                                                                });
                                                                cy.wait(1000)
                                                                cy.visit(furl)
                                                                console.log("inside else",furl);
                                                                cy.get("body").then($body => {
                                                                        if ($body.find('div[id="scroll-search"]').length > 0) {   
                                                                                cy.get('div[id="scroll-search"]').find('li')
                                                                                .should('have.length', Number(count))
                                                                        }
                                                                    });
                                                        }
                                                        else {
                                                                function countItems(count){
                                                                cy.log(count)
                                                                cy.get("body").then($body => {
                                                                        if ($body.find("#scroll-search").length > 0) {  
                                                                               cy.log("hey ") 
                                                                               cy.wait(1000) 
                                                                               cy.get('#scroll-search').scrollTo('0%', '100%')
                                                                            
                                                                        }else{
                                                                                cy.log("__Count is zero__")
                                                                        }
                                                                });
                                                                cy.wait(2000)
                                                                cy.get('div[class="error-message"]').find('span')
                                                                .invoke('text')
                                                                .then(message => {
                                                                        if(message === "No More data!"){
                                                                                cy.wait(3000)
                                                                                cy.get("body").then($body => {
                                                                                        if ($body.find("div[id='scroll-search']").length > 0) {  
                                                                                                cy.get('div[id="scroll-search"]').find('li')
                                                                                                .should('have.length', Number(count))
                                                                                        }else{
                                                                                                cy.log("__Count is zero __")
                                                                                        }
                                                                                });
                                                                        }
                                                                        else {
                                                                                countItems(count)
                                                                        }
                                                                })
                                                                }
                                                                cy.visit()
                                                                cy.wait(4000)
                                                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j)
                                                                .invoke('text')
                                                                .then(count_dash => {
                                                                        if(count_dash != 0){
                                                                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j).find('.clickable-icon').click()   
                                                                        }
                                                                })
                                                                cy.wait(1000)
                                                                cy.visit(furl)
                                                                countItems(Number(count))
                                                        }
                                                });
                                       }
                                        }
                                }
                        })
                })
            });
         });
});