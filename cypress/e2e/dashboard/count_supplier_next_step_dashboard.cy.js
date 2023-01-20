describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data")
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.supplier.username,data.supplier.password);
                });
                cy.fixture(`data/${data_path}/dashboard/count_supplier_next_step_dashboard/data`).then(function (data) {
                        this.data = data;
                });
        });
        describe("Count Supplier Next Step Dashboard (Supplier Side)", function () {
                it('Supplier Next Step Dashboard (Supplier Side) : To verify that the page should navigate to work order filter page when user click the label count link <smoke>', function () {
                                
                        function checkUrl(furl,jsonData, i, j)
                        {
                                cy.visit();
                                cy.wait(7000);
                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j).invoke('text')  
                                .then(text => {
                                        const count = text;
                                        cy.log("Count is => ",count)
                                        cy.wait(5000);                                                        
                                        if(count === 0)
                                        {
                                                cy.wait(1000);
                                                cy.visit(furl);
                                                cy.wait(5000);
                                                cy.contains("No Data").should("be.visible");
                                        }
                                        else if(Number(count) < 20)
                                        {
                                                cy.visit();
                                                cy.wait(4000);
                                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j).invoke('text')  
                                                .then(text => {
                                                        if(text != 0)   
                                                        { 
                                                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j).find('a').click({force: true});
                                                        }
                                                });
                                                cy.wait(5000);
                                                cy.visit(furl);
                                                cy.get("body").then($body => {
                                                        if ($body.find('div[id="scroll-search"]').length > 0) 
                                                        {   
                                                                cy.get('div[id="scroll-search"]').find('li').should('have.length', Number(count));
                                                        }
                                                });
                                        }
                                        else {
                                                function countItems(count)
                                                {
                                                        cy.log(count);
                                                        cy.get("body").then($body => {
                                                                if ($body.find("#scroll-search").length > 0) 
                                                                {  
                                                                        cy.log("hey ");
                                                                        cy.wait(1000);
                                                                        cy.get('#scroll-search').scrollTo('0%', '100%');
                                                                        
                                                                }else
                                                                {
                                                                        cy.log("__Count is zero__");
                                                                }
                                                        });
                                                        cy.wait(2000);
                                                        cy.get('div[class="error-message"]').find('span').invoke('text')
                                                        .then(message => {
                                                                if(message === "No More data!")
                                                                {
                                                                        cy.wait(3000);
                                                                        cy.get("body").then($body => {
                                                                                if ($body.find("div[id='scroll-search']").length > 0) 
                                                                                {  
                                                                                        cy.get('div[id="scroll-search"]').find('li').should('have.length', Number(count));
                                                                                }else
                                                                                {
                                                                                        cy.log("__Count is zero __");
                                                                                }
                                                                        });
                                                                }
                                                                else 
                                                                {
                                                                        countItems(count);
                                                                }
                                                        });
                                                }
                                                cy.visit();
                                                cy.wait(5000);
                                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j).invoke('text')
                                                .then(count_dash => {
                                                        if(count_dash != 0)
                                                        {
                                                                cy.contains(jsonData.supplier_name[i]).parent().find('td').eq(1+j).find('a').click({force: true});   
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
                        const api_value="supplier_widget=supplier_next_step";
                        var script_path = Cypress.env("base_url");
                        cy.request({
                                method : "GET",
                                url : `${script_path}/work_orders?${api_value}&work_order_priority_names%5B%5D=Emergency&work_order_priority_names%5B%5D=Urgent&work_order_priority_names%5B%5D=Next%20Available`,
                                auth: {
                                        username: Cypress.env("username"),
                                        password: Cypress.env("password")
                                }        
                        }).then((res) => {
                                let today = new Date().toISOString().slice(0, 10);
                                const column_count = this.data.dynamic_url1.length;
                                const len = this.data.dynamic_url2.length;
                                for(let i = 0 ; i < len ; i++){
                                        var sup = this.data.dynamic_url2[i];
                                        for(let j = 0 ; j < column_count ; j++){
                                               
                                                if(i == 6)
                                                {
                                                        var furl = this.data.common_base3;
                                                        furl += sup;
                                                        furl += this.data.dynamic_url1[j];
                                                        furl += this.data.common_base4;         
                                                }
                                                else if(i == 7)
                                                {
                                                        var furl = this.data.common_base5;
                                                        furl += sup;
                                                        furl += this.data.dynamic_url1[j];
                                                        furl += this.data.common_base6;         
                                                }
                                                else
                                                {
                                                        var furl = this.data.common_base1;
                                                        furl += sup;
                                                        if(i == 3)
                                                        {
                                                                furl += today + '%205%3A47%3A37';
                                                        }
                                                        furl += this.data.common_base2;
                                                        furl+= this.data.dynamic_url1[j];   
                                                }   
                                                var jsonData = this.data;
                                                checkUrl(furl, jsonData, i, j); 
                                        }
                                }
                        });
                        
                });
        });
});