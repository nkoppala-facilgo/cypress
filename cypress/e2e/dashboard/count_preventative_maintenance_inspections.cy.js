describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/dashboard/count_preventative_maintenance_inspections/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("count preventative maintenance inspections and click on hyperlink on inspections summary page", function () {
        it('Preventative Maintenance Inspections : To veriy that the page should navigate to Inspections filter page when user click the lable count link <smoke>', function () {
            function checkUrl(furl,jsonData,i,j){
                cy.visit();
                cy.wait(7000);
                cy.get('#tableSumPrevMtcInspScrollableTbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
                .then(text => {
                    const count = text;
                    cy.log("Count is => ",count);
                    cy.wait(5000);                                                        
                    if(count === 0){
                        cy.wait(1000);
                        cy.log(count);
                    }
                    else if(Number(count) < 20){
                        cy.visit();
                        cy.wait(4000);
                        cy.get('#tableSumPrevMtcInspScrollableTbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')  
                        .then(text => {
                            if(text != 0) 
                            {   
                                cy.get('#tableSumPrevMtcInspScrollableTbody').find('tr').eq(i).find('td').eq(1+j).find('a').click({force: true});
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
                        cy.get('#tableSumPrevMtcInspScrollableTbody').find('tr').eq(i).find('td').eq(1+j).invoke('text')
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
            const api_value="widget_table_summary_prev_mtc";
            var script_path = Cypress.env("base_url");
            cy.request({
                method : "GET",
                url : `${script_path}/inspections/${api_value}?page=1`,
                auth: {
                    username: Cypress.env("username"),
                    password: Cypress.env("password")
                }        
            }).then((res) => {
                cy.visit();
                cy.wait(7000);
                var row_data = res.body.data;  
                for(let i = 0 ; i < row_data.length; i++){
                    this.data.property_id.push(row_data[i]["property_id"]);
                }
                cy.log("property_ids = >"+this.data.property_id);
                let row_count = this.data.property_id.length;
                let column_count = this.data.col_length;

                for(let i = 0 ; i < row_count ; i++){
                    var property_number = this.data.property_id[i];
                    var new_url = this.data.common_base_url1;
                    new_url += property_number;
                    for(let j = 0 ; j < column_count ; j++){
                        var furl = new_url
                        furl += this.data.col_url[j] + this.data.diffent_row_value[(i * column_count) + j];
                        cy.log("new_furl==> ",furl)   
                        var jsonData = this.data;
                        checkUrl(furl,jsonData,i,j);
                    }
                }                       
            });                  
        });
    });
});