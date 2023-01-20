describe("Api Value", function () {
    var data_path = Cypress.env("data");
    beforeEach(()=>{
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
    });
    it('Inventory_types', function () {
        var script_path = Cypress.env("base_url");
        cy.visit();
        cy.wait(7000);
        cy.get('span[class=caret]').first().click({force: true});
        cy.contains('Account Settings').click({force: true});
        cy.contains('Company Settings').click({force: true});
        cy.contains("label","API Token").parent().find("input[type=text]").invoke("val")
        .then(token => {
            cy.request({
                method : "GET",
                url : `${script_path}/api/v2/inventory_types`,
                auth: {
                    username: Cypress.env("username"),
                    password: Cypress.env("password")
                },
                body: { 
                    token: `${token}`
                }       
            }).then((res) => {
                cy.readFile(`cypress/fixtures/data/${data_path}/common_data.json`).then((obj) => {
                    obj['{inventory_type}'] = res.body[0]["name"];
                    cy.writeFile(`cypress/fixtures/data/${data_path}/common_data.json`, obj);
                });
            });
        });
    });
}); 

