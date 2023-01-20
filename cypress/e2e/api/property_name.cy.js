describe("Api Value", function () {
    var data_path = Cypress.env("data");
    beforeEach(()=>{
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username,data.supplier.password);
        });
    });
    it('Property_Name', function () {
        var script_path = Cypress.env("base_url");
        cy.request({
            method : "GET",
            url : `${script_path}/properties/typeahead?valid_property=true&customer_id=2881&includes%5B%5D=tax_percentage&includes%5B%5D=billto_address&includes%5B%5D=address&name=1`,
            auth: {
                username: Cypress.env("username"),
                password: Cypress.env("password")
            },    
        }).then((res) => {
            cy.readFile(`cypress/fixtures/data/${data_path}/common_data.json`).then((obj) => {
                obj['{property_name}'] = res.body[0]["property_name"];
                cy.writeFile(`cypress/fixtures/data/${data_path}/common_data.json`, obj);
            });
        });
    });
});

