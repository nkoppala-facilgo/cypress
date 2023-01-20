describe("Api Value", function () {
    it('Due_Date', function () {
        var data_path = Cypress.env("data");
        const d = new Date();
        let day = d.getDate(), month;
        if(d.getDate() < 10){
            day = '0' + (d.getDate());
        }
        if((d.getMonth() + 1) < 10){
            month = '0' + (d.getMonth() + 1);
        }
        let due_date =  month + '/' + day + '/' + (d.getFullYear() + 1);
        cy.readFile(`cypress/fixtures/data/${data_path}/common_data.json`).then((obj) => {
            obj['{due_date}'] = due_date;
            cy.writeFile(`cypress/fixtures/data/${data_path}/common_data.json`, obj);
        });
    });
}); 

