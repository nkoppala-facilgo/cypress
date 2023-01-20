describe("Session Login ", () => {
        beforeEach(() => {
                var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
          });
        cy.fixture(`data/${data_path}/quote_request/create/registered/data`).then(function (data) {
          this.data = data;
        });
});
      
describe("create a quote request with Registered Supplier and save template", function () {
        it("fc-1419 create a quote request with Registered Supplier and save template <smoke>", function () {
                cy.visit("/quote_requests/new");
                cy.wait(3000);
                cy.execute("/script/quote_request/create", this.data);
                for (let i = 0; i < this.data["lineitems"].length; i++) {
                cy.get("td > a.btn.btn-success")
                .eq(i)
                .click({ multiple: true, force: true });
                }
                cy.get("td > a.btn.btn-danger.remove-item").click({
                multiple: true,
                force: true,
                });
                cy.get("button[title=Send]").click({ force: true });
                cy.contains("Quote Request was successfully created.").should("exist")
                const characters ='0123456789';
                function generateString(length) {
                        let result = ' ';
                        const charactersLength = characters.length;
                        for ( let i = 0; i < length; i++ ) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                        }
                        const common_str = Cypress.env(`common_string`);
               return common_str + result;
                }
                cy.get('textarea[placeholder="Type here..."]')
                .type(generateString(10),{force:true})
                cy.contains('button','Save Comment as Template').click({force:true})
                cy.contains('label','Template Name:').parent().find('input[type=text]').type(generateString(5))
                cy.contains('button','Save to Template').click({force:true})
                cy.contains('Template was created.').should('be.visible')
        });
});
});
      