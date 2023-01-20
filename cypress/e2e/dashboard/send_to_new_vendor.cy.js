describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.maintenance.username,data.maintenance.password);
        });
        cy.fixture(`data/${data_path}/dashboard/send_to_new_vendor/data`).then(function (data) {
            this.data = data;
        });
    });
  
    describe("Vendor Needs Additional Funds", function () {
        it('Order NTE,1st vendor declines. Send to new vendor. Vendor needs additional funds (invoice variance)', function () { 
            cy.execute('script/dashboard/schedule_work_order',this.data);
            cy.visit('/work_orders');
            cy.wait(3000);
            cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
            cy.wait(5000);
            cy.select_by_label_with_enter('Work Order Title(s):',this.data.item_name,2000);
            cy.select_by_label_with_enter('Status(es):','NotAssigned',2000);
            cy.contains('button','Search').click({force: true});
            cy.wait(5000);
            cy.contains(this.data.item_name).first().click({force: true});
            cy.wait(5000); 
            cy.contains('label','WO#:').parent().find('p').invoke('text')
            .then(wo_number => {
                cy.execute('script/dashboard/next_step',this.data);
                cy.log(wo_number);
                cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                cy.wait(5000);
                cy.contains('button','Clear').click({force: true});
                cy.wait(3000);
                cy.select_by_label_with_enter('WO#(s):',wo_number,2000);
                cy.contains('button','Search').click({force: true});
                cy.wait(5000);
                cy.contains(this.data.item_name).first().click({force: true});
                cy.wait(5000); 
                cy.get('.supplier-header').contains('span','SvcOrdered').should('exist');
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').find('td').eq(3).invoke('text')
                .then(supplier_name => {
                    let href = 'FLOORCOVERINGS R Us';
                    expect(supplier_name).to.equal(href);
                });
                cy.get('span[class=caret]').eq(0).click({force:true}); 
                cy.contains('Logout').click({force:true});
                cy.wait(5000);
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.supplier.username,data.supplier.password);
                }); 
                cy.visit("/work_orders");
                cy.wait(7000);
                cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                cy.wait(5000);
                cy.contains('button','Clear').click({force: true});
                cy.wait(3000);
                cy.select_by_label_with_enter('WO#(s):',wo_number,2000);
                cy.contains('button','Search').click({force: true});
                cy.wait(5000);
                cy.contains(this.data.item_name).first().click({force: true});
                cy.wait(5000); 
                cy.get('.supplier-header').contains('span','SReviewed').should('exist');
                cy.contains('button','Reject').click({force: true});
                cy.wait(5000);
                cy.get('.sa-confirm-button-container').contains('Yes').click({force: true});
                cy.wait(3000);
                cy.contains('Rejected').should('exist');
                cy.wait(3000);
                cy.get('span[class=caret]').eq(0).click({force:true}); 
                cy.contains('Logout').click({force:true});
                cy.wait(5000);
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.maintenance.username,data.maintenance.password);
                }); 
                cy.visit("/work_orders");
                cy.wait(5000);
                cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                cy.wait(5000);
                cy.contains('button','Clear').click({force: true});
                cy.wait(3000);
                cy.select_by_label_with_enter('WO#(s):',wo_number,2000);
                cy.contains('button','Search').click({force: true});
                cy.wait(5000);
                cy.contains(this.data.item_name).first().click({force: true});
                cy.wait(5000); 
                cy.get('.supplier-header').contains('span','SDeclined').should('exist');
                cy.execute('script/dashboard/next_step1',this.data);
                cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                cy.wait(5000);
                cy.contains('button','Clear').click({force: true});
                cy.wait(3000);
                cy.select_by_label_with_enter('WO#(s):',wo_number,2000);
                cy.contains('button','Search').click({force: true});
                cy.wait(5000);
                cy.contains(this.data.item_name).first().click({force: true});
                cy.wait(5000); 
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').eq(1).find('td').eq(3).invoke('text')
                .then(supplier_name => {
                    let href = 'Red Carpet - kenrdtest2 (test)';
                    expect(supplier_name).to.equal(href);
                });
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').find('td').eq(0).find('a').invoke('removeAttr', 'target').click({force: true});
                cy.wait(10000);
                cy.get('#js-react-WorkOrderActionButtonsView').contains('button','Void').last().click({force: true});
                cy.wait(3000);
                cy.contains('h5','Reason: ').parent().find(`.Select-control `).click({force: true}).type(this.data.option);
                cy.wait(3000);
                cy.get(`[class*="-menu"]`).contains(this.data.option).click({ force: true });
                cy.wait(3000);
                cy.get('.modal-footer').contains('button','Save').click({force: true});
                cy.wait(3000);
                cy.get('.sa-confirm-button-container').contains('button','Yes').click({force: true});
                cy.wait(3000);
                cy.contains('Work Order was Voided.').should('exist');
                cy.wait(3000);
                cy.get('.sa-confirm-button-container').contains('button','OK').click({force: true});
                cy.wait(3000);
                cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').eq(1).find('td').eq(1).invoke('text')
                .then(supplier_link => {
                    cy.log(supplier_link);
                    let str = supplier_link.length;
                    let supplier_wo_number = "";
                    for(let i = 0; i < str; i++)
                    {
                        if(supplier_link[i] == '(')
                        {
                            break;
                        }
                        else
                        {
                            supplier_wo_number = supplier_wo_number + supplier_link[i];
                        }
                    }
                    cy.log(supplier_wo_number);
                    cy.get('.supplier-header').contains('span','Cancelled').should('exist');
                    cy.get('span[class=caret]').eq(0).click({force:true}); 
                    cy.contains('Logout').click({force:true});
                    cy.wait(5000);
                    var data_path = Cypress.env(`data`);
                    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.supplier2.username,data.supplier2.password);
                    }); 
                    cy.visit("/work_orders");
                    cy.wait(5000);
                    cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                    cy.wait(5000);
                    cy.contains('button','Clear').click({force: true});
                    cy.wait(3000);
                    cy.select_by_label_with_enter('WO#(s):',supplier_wo_number,2000);
                    cy.contains('button','Search').click({force: true});
                    cy.wait(5000);
                    cy.contains('Appliances - Water Heater - Urgent').first().click({force: true});
                    cy.wait(5000); 
                    cy.get('.supplier-header').contains('span','SReviewed').should('exist');
                    cy.get('#js-react-WorkOrderActionButtonsView').contains('button','Confirm').click({force: true});
                    cy.contains('Success').should('exist');
                    cy.wait(3000);
                    cy.get('.supplier-header').contains('span','Confirmed').should('exist');
                    cy.contains('RESIDENT:').parent().find('span').click({force: true});
                    cy.wait(5000);
                    cy.get('.modal-footer').contains('button','Close').click({force: true});
                    cy.wait(3000);
                    cy.contains('button','Edit').click({force: true});
                    cy.wait(5000);
                    cy.get('#scheduled-start-datetime').click({force:true})
                    cy.get('div.react-datepicker__time').find('li.react-datepicker__time-list-item').contains(this.data.start).type('{enter}');
                    cy.get('#scheduled-end-datetime').click({force:true})
                    cy.get('div.react-datepicker__time').find('li.react-datepicker__time-list-item').contains(this.data.end).type('{enter}');
                    cy.contains('button','Save').click({force: true});
                    cy.wait(5000);
                    cy.contains('Work Order was successfully updated').should('exist');
                    cy.wait(3000);
                    cy.contains('button','Goto Summary').click({force: true});
                    cy.wait(5000);
                    cy.get('.supplier-header').contains('span','SvcSched').should('exist');
                    cy.get('#tab-wo-conversation-history-tab-Customer').click({force: true});
                    cy.get('textarea[placeholder =\"Type here...\"]').type(this.data.message2);
                    cy.contains('button','Send Message').click({force: true});
                    cy.wait(3000);
                    cy.contains('Your message was sent.').should('exist');
                    cy.wait(3000);
                    cy.get('span[class=caret]').eq(0).click({force:true}); 
                    cy.contains('Logout').click({force:true});
                    cy.wait(5000);
                    var data_path = Cypress.env(`data`);
                    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.maintenance.username,data.maintenance.password);
                    }); 
                    cy.visit("/work_orders");
                    cy.wait(5000);
                    cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                    cy.wait(5000);
                    cy.contains('button','Clear').click({force: true});
                    cy.wait(3000);
                    cy.select_by_label_with_enter('WO#(s):',wo_number,2000);
                    cy.contains('button','Search').click({force: true});
                    cy.wait(5000);
                    cy.contains('Appliances - Water Heater - Urgent').first().click({force: true});
                    cy.wait(5000); 
                    cy.get('#tab-wo-conversation-history-tab-Supplier').click({force: true});
                    cy.get('textarea[placeholder =\"Type here...\"]').type(this.data.message3);
                    cy.contains('button','Send Message').click({force: true});
                    cy.wait(3000);
                    cy.contains('Your message was sent.').should('exist');
                    cy.wait(3000);
                    cy.get('span[class=caret]').eq(0).click({force:true}); 
                    cy.contains('Logout').click({force:true});
                    cy.wait(5000);
                    var data_path = Cypress.env(`data`);
                    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.supplier2.username,data.supplier2.password);
                    }); 
                    cy.visit("/work_orders");
                    cy.wait(5000);
                    cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                    cy.wait(5000);
                    cy.contains('button','Clear').click({force: true});
                    cy.wait(3000);
                    cy.select_by_label_with_enter('WO#(s):',supplier_wo_number,2000);
                    cy.contains('button','Search').click({force: true});
                    cy.wait(5000);
                    cy.contains('Appliances - Water Heater - Urgent').first().click({force: true});
                    cy.wait(5000); 
                    cy.contains('button','Edit').click({force: true});
                    cy.wait(5000);
                    cy.get('#js-react-WorkOrderItemsForm').contains('span.linkable-text','Attach Image(s)').parents('div.attachment-form.form-group').find('input[type=file]').attachFile(this.data['attach_image']);
                    cy.wait(5000);
                    cy.get('textarea[placeholder=\"Notes\"]').eq(0).clear().type(this.data.notes,{force:true});
                    cy.wait(5000);
                    cy.contains('button','Save').click({force: true});
                    cy.wait(5000);
                    cy.contains('Work Order was successfully updated').should('exist');
                    cy.wait(3000);
                    cy.contains('button','Complete').click({force: true});
                    cy.wait(7000);
                    cy.get('.supplier-header').contains('span','PendReview').should('exist');
                    cy.contains('button','VerCompleted').click({force: true});
                    cy.wait(3000);
                    cy.get('i[class="fa fa-keyboard-o"]').click()
                    cy.get('input[placeholder="type your signature in here"]').type(this.data.sign);
                    cy.get('#btnDocumentPage').find('button').last().click({force: true});
                    cy.wait(5000);
                    cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').find('td').eq(2).invoke('text')
                    .then(create_invoice_link => {
                        cy.get('#js-react-WorkOrderDocumentHierarchyView').find('table').find('tbody').find('tr').find('td').eq(2).find('a[class=text-blue]').first().invoke('removeAttr', 'target').click({force: true});
                        cy.wait(5000);
                        let str = create_invoice_link.length;
                        let str1 = "";
                        for(let i = 0; i < str; i++)
                        {
                            if(create_invoice_link[i] == ' ')
                            {
                                break;
                            }
                            else
                            {
                                str1 = str1 + create_invoice_link[i];
                            }
                        }
                        cy.log(str1);
                        cy.visit('/orders/' + str1 + '/invoices/new');
                        cy.wait(5000);
                    });
    
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0');
                    var yyyy = today.getFullYear(); 
                    today = mm + '/' + dd + '/' + yyyy;
                    cy.select_by_calendar_using_label('INVOICE DATE:',today);
            
                    const characters ="0123456789";
                    function generateString(length) {
                        let result = "";
                        const charactersLength = characters.length;
                        for (let i = 0; i < length; i++) {
                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                        }
                        const common_str = Cypress.env(`common_string`);
                        return common_str + result;
                    }
                    cy.contains('label','SUPPLIER INVOICE#').parent().find('input[type=text]').type(generateString(7));
                    cy.contains(this.data.product_name).click({force: true});
                    cy.wait(3000);
                    cy.get('input[placeholder =\"Price\"]').clear().type(this.data.price);
                    cy.get('#js-react-InvoiceItemsTable').contains('a','Save').click({force: true});
                    cy.contains('button','Submit').click({force: true});
                    cy.wait(3000);
                    cy.contains('Invoice was successfully created').should('exist');
                    cy.wait(3000);   
                    cy.get('span[class=caret]').eq(0).click({force:true}); 
                    cy.contains('Logout').click({force:true});
                    cy.wait(5000);
                    var data_path = Cypress.env(`data`);
                    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.maintenance.username,data.maintenance.password);
                    }); 
                    cy.visit("/work_orders");
                    cy.wait(5000);
                    cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true});
                    cy.wait(5000);
                    cy.contains('button','Clear').click({force: true});
                    cy.wait(3000);
                    cy.select_by_label_with_enter('WO#(s):',wo_number,2000);
                    cy.contains('button','Search').click({force: true});
                    cy.wait(5000);
                    cy.contains('Appliances - Water Heater - Urgent').first().click({force: true});
                    cy.wait(5000); 
                    cy.get('.supplier-header').contains('span','PendReview').should('exist');
                    cy.get('#js-react-WorkOrderItemsView').find('table').find('tbody').find('tr').eq(1).find('td').eq(1).find('span').eq(2).invoke('text')
                    .then(count => {
                        expect(count).to.equal('1');
                        cy.get('#js-react-WorkOrderItemsView').find('table').find('tbody').find('tr').eq(1).find('td').eq(5).invoke('text')
                        .then(comments => {
                            let href = 'no hot water';
                            expect(comments).to.equal(href);
                        });
                    });
                });
            });
        });
    });
});



