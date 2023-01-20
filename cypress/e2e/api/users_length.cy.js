describe('Session Login',()=>{
    var data_path = Cypress.env(`data`);
    beforeEach(() => {
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        
    });
    it("user view day length", function() {
        cy.visit();
        cy.wait(3000);
        var script_path = Cypress.env("base_url");
        cy.request({
            method : "GET",
            url : `${script_path}/api/v2/filterable/users?token=89_jdJT-LXdjWOrYaf-kCw&filter%5Buser_type%5D%5B%5D=128846&filter%5Bis_enable%5D=1&limit=100&has_access_to%5B%5D=AssetGroup%3A57892&extra_attrs%5B%5D=working_days_collection&extra_attrs%5B%5D=start_work_location&extra_attrs%5B%5D=start_work_position&extra_attrs%5B%5D=end_work_location&extra_attrs%5B%5D=end_work_position&extra_attrs%5B%5D=class_name&extra_attrs%5B%5D=identifier&extra_attrs%5B%5D=is_enable`,
            auth: {
                username: Cypress.env("username"),
                password: Cypress.env("password")
            },    
        }).then((res) => {
                cy.log(res.body.users.length)
                cy.readFile(`cypress/fixtures/data/${data_path}/common_data.json`).then((obj) => {
                obj['{day_view_value1}'] = res.body.users.length;
                cy.writeFile(`cypress/fixtures/data/${data_path}/common_data.json`, obj);
            });
        });
    });
});