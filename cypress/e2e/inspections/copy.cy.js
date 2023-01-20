describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
    cy.fixture(`data/${data_path}/inspections/create/data`).then(function(data) {
        this.create_data = data;
    })
    cy.fixture(`data/${data_path}/inspections/copy/data`).then(function(data) {
        this.copy_data = data;
    })   
}) 
describe("To verify Edit Inspection button functionality.", function() {
    it('FC-1328 Edit new inspection <smoke> ', function() {
        cy.visit()
        cy.wait(3000)
        cy.contains("Documents").click()
        cy.contains('a', 'Inspections').click({ force: true })
        cy.contains('a', 'Create Inspection').click({ force: true })
        cy.wait(3000)
        cy.on('uncaught:exception', (err, runnable) => {return false})
        cy.execute('script/inspections/create', this.create_data)
        cy.wait(3000)
        cy.contains('label','INSPECTION#:')
        .parent().find('input[type=text]')
        .invoke('val')
        .then(inspe_number => {
            cy.log(inspe_number)
            cy.contains("Documents").click()
            cy.contains('a', 'Inspections').click({ force: true })
            cy.on('uncaught:exception', (err, runnable) => {return false})
            cy.wait(2000)
            cy.get('#js-react-InspectionFilterModalToggle').find('i').click()
            cy.wait(5000)
            cy.select_by_label('Inspection Number(s):',inspe_number)
            cy.contains('button','Search').click()
            cy.wait(3000)
            cy.execute('script/inspections/copy', this.copy_data)
        });
        
    });
});
});