describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/inspection/copy_button_functionality/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To Verify Copy Button Functionality", function () {
    it('FC-8162 To Verify "Copy" Button Functionality <regression>', function () {
      const characters = "0123456789";
      function generateString(length) {
        let result = "";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const common_str = Cypress.env(`common_string`);
        return common_str + result;
      }
      const wo_name = generateString(6);
      this.data.item_name = "Inspection" + wo_name;
      this.data.inspection_title = wo_name;
      cy.execute("script/inspection/copy_button_functionality", this.data);
      cy.contains("label", "INSPECTION#:").parent().find("div").invoke('text').then((inspection_number) => { 
        cy.execute("script/inspection/copy_inspection", this.data);
        cy.visit("/inspections/" + inspection_number + this.data.dynamic_url);
        cy.contains("button", "Create & Assign").click({ force: true });
        cy.get('span[class=caret]').eq(0).click({force:true});  
      });
    });
  });
});
