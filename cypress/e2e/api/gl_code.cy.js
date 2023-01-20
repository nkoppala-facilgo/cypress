describe("Api Value", function () {
        var data_path = Cypress.env("data");
        beforeEach(()=>{
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username,data.pmc.password);
            });
            cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        it('gl_code for pmc', function () {
                cy.visit();
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.wait(4000);
                var script_path = Cypress.env("base_url");
                cy.request({
                        method : "GET",
                        url : `${script_path}/gl_codes.json?only%5B%5D=id&only%5B%5D=display_text&only%5B%5D=gl_code&only%5B%5D=is_unit_required&only%5B%5D=is_jcc_required`,
                        auth: {
                        username: Cypress.env("username"),
                        password: Cypress.env("password")
                        },    
                    }).then((res) => {
                        console.log(res.body[0]["gl_code"])
                cy.readFile(`cypress/fixtures/data/${data_path}/common_data.json`).then((obj) => {
                    obj['{gl_code}'] = res.body[0]["gl_code"];
                    cy.writeFile(`cypress/fixtures/data/${data_path}/common_data.json`, obj);
                });
            });
        });
});
    

