describe('Session Login ',()=>{
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
    });
  });
 
  describe("Edit Floorplan Button",function (){
    it("FC-4537 To verify that PMC is able to Edit Floorplan from Inspection <smoke>",function (){
      cy.visit();
      cy.wait(7000);
      cy.contains("Documents").click();
      cy.contains('a', 'Inspections').click({ force: true });
      cy.wait(5000);
      cy.get('#js-react-InspectionSummaryList').find('li').first().click({force:true}).click({force:true});
      cy.wait(10000);
      cy.contains('button','Edit').click({force:true});
      cy.wait(10000);
      cy.contains('button','Edit Floorplan').click({force:true});   
    });
  });
});
 