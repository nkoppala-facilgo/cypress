describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
  })
describe("Create and upload a message to template", function () {
    it('Open a quote request and create template and send message <smoke>', function () {
      cy.visit("/quote_requests");
        cy.get(".fa.fa-filter").parent().click({ multiple: true });
        cy.wait(5000)
        cy.select_by_label('Quote Request Title(s):','16QR')
         cy.contains('button', 'Search').click()
        cy.get('div.media').first().click()
        cy.wait(6000)
        cy.get('textarea[placeholder="Type here..."]').type('Hello Supplier(test)')
        cy.contains('button', 'Save Comment as Template').click()
        const characters ="0123456789";
      function generateString(length) {
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        const common_str = Cypress.env(`common_string`);
        return common_str + result;
      }
        cy.get('#template-name').type(generateString(10))
        cy.contains('button', 'Save to Template').click()
        cy.contains('Template was created').should('exist')
        cy.contains('u','Select Message Template').click()
        cy.select_by_placeholder_using_selector('Select a Message Template...','Thanks')
        cy.contains('button', 'Send Message').click()
        cy.contains('Your message was sent').should('exist')
    });
});
});
