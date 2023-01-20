describe('Session Login ',()=>{
        beforeEach(()=>{
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
              });
          })
          describe("Count Projects", function () {
                it("Count Projects <smoke>", function() {
                        cy.visit()
                        cy.wait(3000)
                        cy.get('div[class="btn-document-content"]').contains("Projects")
                        .parent().find('small')
                        .invoke('text')
                        .then(text => {
                                const itemsPerPage = 10;
                                const DashboardCount = Number(text);
                                cy.get('div[class="btn-document-content"]').contains("Projects").dblclick({force:true})
                                cy.wait(25000)
                                cy.get('.facilgo-pagination__per-page__item').contains(itemsPerPage).click();
                                cy.wait(6000);
                                cy.contains('Last').click()
                                cy.wait(6000);
                                cy.get('.active > a').first()
                                  .invoke('text') 
                                  .then(text => {
                                        const lastPageNumber = text - 1 ;
                                        const pro = lastPageNumber * itemsPerPage;
                                        cy.log(pro); 
                                        cy.get('td')
                                         .find('.fa-square-o')
                                         .then(listing => {
                                         const listingCount = Cypress.$(listing).length;
                                         cy.log(listingCount)
                                           const allCount = pro + listingCount;
                                           cy.log(allCount);
                                           if(DashboardCount == allCount){
                                                   cy.log("_____COUNT IS MATCHING____")
                                           }else{
                                                   cy.log("_____COUNT IS NOT MATCHING____");
                                                   cy.log("_____COUNT IN DASHBOARD_",DashboardCount);
                                                   cy.log("_____COUNT INSIDE _Projects",allCount);
                                           }

                                        });
                                });
                        })
                })
        })
})         