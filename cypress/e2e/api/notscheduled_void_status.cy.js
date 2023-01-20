describe("First_Post_Api", function () {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/api/notscheduled_void_status/data`).then(function (data) {
            this.data = data;
        });
        cy.fixture(`data/${data_path}/api/void_workOrder/data`).then(function (data) {
            this.data1 = data;
        });
    });
    it('Create_Post_Api', function () {
        var script_path = Cypress.env("base_url");
        var token = Cypress.env("token");
        cy.request({
            method : "POST",
            url : `${script_path}/facilgo_apis/build_work_order`,
            headers: {
                "Authorization" : `${token}`
            },
            body: {
                "extra_attrs": this.data['extra_attrs'],
                "property_code":  this.data['property_code'],
                "external_tenant_code":  this.data['external_tenant_code'],
                "unit": this.data['unit'],
                "title":  this.data['title'],
                "type":  this.data['type'],
                "subtype":  this.data['subtype'],
                "estimated_completion_in_minutes": this.data['estimated_completion_in_minutes'],
                "assignee_email":  this.data['assignee_email'],
                "priority":  this.data['priority'],
                "permission_to_enter": this.data['permission_to_enter'],
                "has_pets":  this.data['has_pets'],
                "gate_code":  this.data['gate_code'],
                "has_alarm":  this.data['has_alarm'],
                "assignee_changeable":  this.data['assignee_changeable'],
                "scheduled_changeable": this.data['scheduled_changeable'],
                "entry_notes":  this.data['entry_notes'],
                "internal_notes":  this.data['internal_notes'],
                "custom_fields":  this.data['custom_fields'],
                "work_order_items_attributes":  this.data['work_order_items_attributes'],
                "agent":  this.data['agent'],
            }
        }).then((result) => {
            console.log(result);
            cy.log(JSON.stringify(result))
             expect(result.status).to.eq(201);
             expect(result.statusText).to.eq("Created");
             expect(result.body.nteAmountInUsCents).to.eq(35000);
             expect(result.body.workOrderItems.length).to.be.greaterThan(0);
             expect(result.body.status).to.eq("NotScheduled");
             expect(result.body.workOrderItems[0].itemName).to.eq("Plumbing, Plumbing- Other, Next Available");
             expect(result.body.title).to.eq( this.data['title']);
             expect(result.body.assigneeChangeable).to.eq(this.data['assignee_changeable']);
             expect(result.body.changeableScheduled).to.eq( this.data['scheduled_changeable']);
             expect(result.body.gateCode).to.eq(this.data['gate_code']);
             expect(result.body.hasAlarm).to.eq( this.data['has_alarm']);
             expect(result.body.permissionToEnter).to.eq(  this.data['permission_to_enter']);
             cy.request({
                method : "POST",
                url: `${script_path}/facilgo_apis/voided_work_orders`,
                headers: {
                "Authorization" : `${token}`
                },
                body: {
                    "work_order_id": result.body.workOrderId,
                    "custom_reason_value": this.data1['custom_reason_value'],
                    "agent": this.data1['agent']
                }
            }).then((result) => {
               console.log(result);
               expect(result.status).to.eq(200);
               expect(result.statusText).to.eq("OK");
                expect(result.body.status).to.eq(this.data1['status']);
            });
        });
    });
});
