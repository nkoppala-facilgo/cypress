import 'cypress-wait-until';
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
	var full_url = Cypress.env("base_url");
	if(url)
		full_url += url;
	var ba = Cypress.env("basic_auth");
	if(ba)
	{
		options = {
		auth: {
			username: Cypress.env("username"),
			password: Cypress.env("password")
			}
		};
	}  
	return originalFn(full_url, options);
});

Cypress.Commands.add('forceVisit', url => {
	cy.window().then(win => {
	    return win.open(url, '_self'); 
	});
});
  

Cypress.Commands.add('execute',(script_path, data = "", index = -1) => {
	var data_path = Cypress.env(`data`);
	cy.fixture(`data/${data_path}/common_data`).then(function(data) {
		this.api_data = data;
	});
	cy.fixture(script_path).then(function (script) { 
		let i = 0;
		for(i = 0; i < script.length; i++)
		{
			let s = script[i];
			let types = Array.isArray(data[s.attribute]);
			if(s.operation==="lineitem_attach_file") {
				eval(s.expression)
			}
			else if(s.operation==='lineitem_type_text') {
				eval(s.expression)
			}
			else if(!types)
			{   
				let executed = false; 
				if(data[s.attribute] != "" && data[s.attribute] != " " && data[s.attribute] != "empty") { 
                                        let val = '{' + s.attribute + '}';
					if(data[s.attribute] === val){  
						data[s.attribute] = this.api_data[`${val}`];
					}
					if(s.operation == "input") { 
						eval(s.expression).type(data[s.attribute],{force:true})
						executed = true;
					}
					else {
						eval(s.expression);
						executed = true;
					} 

				}if(s.attribute == "" && !executed) {
				 	eval(s.expression);
				}                  
			}
			else {
				let list = data[s.attribute];
				let j = 0;
				cy.log(s.attribute)
				cy.log(list.length)
				for(j = 0; j < list.length; j++){
					cy.log(s.expression)
					let exp = "cy.execute('" + s.expression + "', list[j] , j )";
					cy.log(exp)
					eval(exp);
				}
			}
		}
	});    
});
		
Cypress.Commands.add('select_by_label', (label, option, selectDelay = 0) => {
	cy.contains('label', label)
	.parent()
	.find(`.Select-input input`)
	.click({ force: true })
	.wait(selectDelay)
	.clear({force:true})
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu-outer"]`)
	.contains(option)
	.click({ force: true });
});

Cypress.Commands.add('select_by_em_label', (label, option, selectDelay = 0) => {
	cy.contains('em', label)
	.parent()
	.parent()
	.parent()
	.find('input')
	.first()
	.click({ force: true })
	.clear({ forec: true })
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu-outer"]`)
	.contains(option)
	.click({ force: true });
});

Cypress.Commands.add('select_by_calendar', (selector, value) => {
	cy.get(selector)
	.clear({force:true})
	.clear()
	.type(value,{ force: true })
	cy.get(selector)
	.parent()
	.find(`.input-group-addon`)
	.click({ force: true });        
});

Cypress.Commands.add('select_by_placeholder', (label, option, selectDelay = 0) => {
	cy.contains('div', label)
	.parent()
	.find(`.Select-input input`)
	.click({ force: true })
	.clear({force:true})
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu-outer"]`)
	.contains(option)
	.click({ force: true });
});
	
Cypress.Commands.add('select_by_calendar_using_label', (label,value, placeholder = "") => {
	if(placeholder === ""){
		cy.contains('label',label)
		.parent()
		.find(`input[type=text]`)
		.clear()
		.type(value,{force: true})
		cy.contains('label',label)
		.parent()
		.find(`.input-group-addon`)
		.click({force: true})
	}
	else {
		cy.contains('label',label)
		.parent()
		.find(`input[placeholder=${placeholder}]`)
		.clear()
		.type(value,{force: true})
		cy.contains('label',label)
		.parent()
		.find(`input[placeholder=${placeholder}]`)
		.parent()
		.find(`.input-group-addon`)
		.click({force: true})
	}
}
);
		
Cypress.Commands.add('select_by_calendar_using_label_without_clear', (label,value, placeholder = "") => {
	if(value === "" || !value) return
	if(placeholder === ""){
		cy.contains('label',label)
		.parent()
		.find(`input[type=text]`)
		.type(value,{force: true})
		cy.contains('label',label)
		.parent()
		.find(`.input-group-addon`)
		.click({force: true})
	}
	else {
		cy.contains('label',label)
		.parent()
		.find(`input[placeholder=${placeholder}]`)
		.type(value,{force: true})
		cy.contains('label',label)
		.parent()
		.find(`input[placeholder=${placeholder}]`)
		.parent()
		.find(`.input-group-addon`)
		.click({force: true})
	}
});

Cypress.Commands.add('select_by_placeholder_using_selector', (label, option, selectDelay = 0) => {
	cy.get('div[class="Select-placeholder"]').contains(label).parent()
	.find(`.Select-input input`)
	.click({ force: true })
	.clear({froce:true})
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu"]`)
	.contains(option)
	.click({ force: true });
});

Cypress.Commands.add('select_by_typeahead', (selector, option, selectDelay=0) => {
	cy.get(selector)
	.type(option,{ force: true })
	cy.wait(3000)
	cy.get(`ul>li[class="active"]`)
	.contains(option)
	.click({ force: true });
	
});

Cypress.Commands.add('select_by_placeholders', (label, option, selectDelay = 0) => {
	cy.get('div[class="Select-placeholder"]').contains(label).parent()
	.find(`.Select-input input`)
	.click({ force: true })
	.clear({force:true})
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu"]`)
	.contains(option)
	.click({ force: true });
});

Cypress.Commands.add('select_by_checkbox', (value) => {
	if(value){
		cy.get('[type="checkbox"]').check({force: true})
	}
});

Cypress.Commands.add('lineitem_attach_file', (div_class,files,expression="") => {
	for(let i=0;i<files.length;i++) {
		if(expression === ""){
			cy.get(`div[class='${div_class}']`)
			.find('input[type=file]')
			.eq(i)
			.attachFile(files[i]['file_path'])
		}
		else{
			eval(expression)
			.find(`div[class='${div_class}']`)
			.find('input[type=file]')
			.eq(i)
			.attachFile(files[i]['file_path'])
		}
	}
});

Cypress.Commands.add('lineitem_type_text', (placeholder,texts) => {
	for(let i=0;i<texts.length;i++) {
		cy.get(`textarea[placeholder="${placeholder}"]`)
		.eq(i)
		.clear()
		.type(texts[i][placeholder],{force:true})
	}
});

Cypress.Commands.add('select_by_placeholder_with_enter', (label, option, selectDelay = 0) => {
	cy.contains('div', label)
	.parent()
	.find(`.Select-input input`)
	.click({ force: true })
	.clear()
	.type(option, { force: true })
	.wait(selectDelay)
	.type('{enter}' ,{ force: true })
});

Cypress.Commands.add('select_by_upper_label', (label,value,selectDelay = 0) => {
	if(value === "" || !value) return
	cy.contains('label',label)
	.parent()
	.find(`.Select-control `)
	.within(()=>{
		cy.get('input[role=\"combobox\"]')
		.click({force: true})
		.type(value,{force: true})
		.wait(selectDelay)
		.type('{enter}')
	})
});


Cypress.Commands.add('select_by_placeholder_with_option', (label, option,option1, selectDelay = 0) => {
	cy.contains('div', label)
	.parent()
	.find(`.Select-input input`)
	.click({ force: true })
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu"]`)
	.contains(option1)
	.click({ force: true });
});
Cypress.Commands.add('select_by_typeahead2', (selector, option,selectDelay = 0) => {
	cy.get(selector)
	.type(option,{ force: true })
	.wait(selectDelay)
	.type('{enter}')

});
Cypress.Commands.add('select_with_contain', (label, option, selectDelay = 0) => {
	cy.contains(label)
	.parent()
	.find(`.Select--single`)
	.click()
	cy.get('.is-open')
	.type(option)
	.wait(selectDelay)
	.type('{enter}')
});
Cypress.Commands.add('select_by_calendar_using_placeholder', (placeholder,value) => {
        cy.get('div[class="input-group date undefined"]')
	.find(`input[placeholder=${placeholder}]`)
	.clear()
	.type(value,{force: true})
	cy.get(`input[placeholder=${placeholder}]`)
	.parent()
	.find(`input[placeholder=${placeholder}]`)
	.parent()
	.find(`.input-group-addon`)
	.click({force: true})
});
Cypress.Commands.add('select_by_label_new', (label, option, selectDelay = 0) => {
    cy.contains('label', label)
    .parents(`.form-group`)
    .find(`.Select-input input`)
    .click({ force: true })
    .clear({force:true})
    .type(option, { force: true });
    cy.wait(selectDelay);
    cy.get(`[class*="-menu-outer"]`)
    .contains(option)
    .click({ force: true });
});
Cypress.Commands.add('select_by_p_new', (label, option, selectDelay = 0) => {
    cy.contains('p', label)
    .parents(`.form-group`)
    .find(`.Select-input input`)
    .click({ force: true })
    .clear({force:true})
    .type(option, { force: true });
    cy.wait(selectDelay);
    cy.get(`[class*="-menu-outer"]`)
    .contains(option)
    .click({ force: true });
});
Cypress.Commands.add('select_by_label_with_enter', (label, option, selectDelay = 0) => {
	cy.contains('label', label)
	.parent()
	.find(`.Select-input input`)
	.click({ force: true })
	.clear({force:true})
	.type(option, { force: true })
	.wait(selectDelay)
	.type('{enter}')

});

Cypress.Commands.add('login_with_session', (name, password) => {
	cy.session([name,password], () => {
		cy.visit();
		cy.get('input[id=user_login]').type(name);
		cy.get('input[type=password]').type(password);
		cy.get('input[type=submit]').click();
	      })
});
Cypress.Commands.add('add_new_widget', (widget_name, fiscal_cal="") => {
	cy.get('.empty-graph').click()
                const dataTransfer = new DataTransfer(); 
                cy.get('.graph-widget').contains(widget_name).trigger('dragstart',{
                  dataTransfer 
                });
                cy.get('.empty-graph').trigger('drop',{
                  dataTransfer
                });
		if(fiscal_cal != ""){
                	cy.get('.setting-fiscal-calendar .is-searchable').click();
                	cy.get('.Select-menu-outer').contains(fiscal_cal).click()
                	cy.get('.btn-toolbar > .btn-primary').contains('button','Save').click()
		}
});
Cypress.Commands.add('verify_count_on_widget', (api_value,selectDelay = 7000) => {
	cy.visit()
	cy.get('span[class=caret]').first().click({force:true})   
	cy.contains('Account Settings').click({force:true})
	cy.contains('Company Settings').click({force:true})
	cy.contains("label","API Token").parent().find("input[type=text]")
	.invoke("val")
	.then(token => {
		var full_url = Cypress.env("base_url");
		cy.request({
			method : "GET",
			url : `${full_url}/api/v2/work_orders?token=${token}&page=1&${api_value}=true`,
			auth: {
				username: Cypress.env("username"),
				password: Cypress.env("password")
			}        
		}).then((res) => {
			cy.wait(selectDelay)
			var row_data= res.body.data.row_data
			console.log(row_data)
			for(let i=0;i<row_data.length;i++){
				if(row_data[i].params != null){
					var jsonData = row_data[i].params;
					var link = "/work_orders/filter?";
					Object.keys(jsonData).forEach(function(key) {
						console.log(key)
						if(key != "work_order_priority_ids"){
							let type = Array.isArray(jsonData[key]);
							if(!type){
								link += `filter_work_order%5B${key}%5D=${jsonData[key]}&`
							}
							else {
								for(let k=0;k<jsonData[key].length;k++)
									link +=`filter_work_order%5B${key}%5D%5B%5D=${jsonData[key][k]}&`
							}
						}
					});
					for(let j=0;j<jsonData["work_order_priority_ids"].length;j++){
						cy.log('**green message**')
						var original_link = link + `filter_work_order%5Bwork_order_priority_ids%5D%5B%5D=${jsonData["work_order_priority_ids"][j]}`
						var count = row_data[i][jsonData["work_order_priority_ids"][j]]
						cy.log(count)
						if(count === undefined){
							cy.visit(original_link)
							cy.contains("No Data").should("be.visible")
						}
						else if(Number(count) < 20){
							cy.visit()
							cy.wait(selectDelay)
							cy.contains(row_data[i]['label']).parent().find('td').eq(1+j).find('.clickable-icon').click()
							cy.visit(original_link)
							cy.get('div[id="scroll-search"]').find('li')
							.should('have.length', Number(count))
						}
						else {
							function countItems(count){
								cy.log(count)
								cy.get('#scroll-search').scrollTo('0%', '100%')
								cy.wait(selectDelay)
								cy.get('div[class="error-message"]').find('span')
								.invoke('text')
								.then(message => {
									if(message === "No More data!"){
										cy.wait(selectDelay)
										cy.get('div[id="scroll-search"]')
										.find('li').should('have.length', count)
									}
									else {
										countItems(count)
									}
								})
							}
							cy.visit()
							cy.wait(selectDelay)
							cy.contains(row_data[i]['label']).parent().find('td').eq(1+j).find('.clickable-icon').click()
							cy.visit(original_link)
							countItems(Number(count))
						}
						cy.wait(selectDelay)
					}
				}
			}
		})
	})
});
Cypress.Commands.add('search_property_in_dashboard', (selector,option,selectDelay=0) => {
    cy.get(selector).parent().find('div[class="Select-placeholder"]').contains("Type to search property").parent().find(`.Select-input input`).click({ force: true }).clear({ force: true }).type(option, { force: true });
    cy.wait(selectDelay)
    cy.get(`[class*="-menu"]`).contains(option).click({ force: true });
    
});
Cypress.Commands.add('remove_and_add_wo_items_in_column', (option,selectDelay = 0) => {
	cy.get('.grid.status_filter_class').find(`.Select-input input`).click({ force: true }).type(option, { force: true });
	cy.get('.grid.status_filter_class').find(`.Select-value-label`).contains(option).parent().find('.Select-value-icon').contains('×').click();
	cy.wait(selectDelay);
	cy.get(`[class*="-menu-outer"]`).contains(option).click({ force: true });
});

Cypress.Commands.add('goto_page_functionality', (selector,option) => {
	for(let i = 1; i<= option; i++)
	{
		cy.get(selector).find('.pagination').find('li').contains('a','»').click({force:true});
	}
});


Cypress.Commands.add('Hyperlink_click', (selector,option,tag,value,div_class="",selectDelay=0) => {
	if(div_class == "")
	{
		cy.get(selector).find('a[class=text-blue]').first().invoke('attr', 'href')
			.then(href => {
			cy.get(selector).find('a[class=text-blue]').first().invoke('removeAttr', 'target').click({force: true});
			cy.wait(selectDelay);
			cy.contains('label',option).parent().find(tag).invoke('text')
			.then(text => {
				let flag = value + text;
				expect(flag).to.equal(href);
			})
		});
    	}
	else
	{
		cy.get(selector).find(`a[class=${div_class}]`).first().invoke('attr', 'href')
			.then(href => {
			cy.get(selector).find(`a[class=${div_class}]`).first().invoke('removeAttr', 'target').click({force: true});
			cy.wait(selectDelay);
			cy.contains('label',option).parent().find(tag).invoke('text')
			.then(text => {
				let flag = value + text;
				expect(flag).to.equal(href);
			})
		});
	}
});

Cypress.Commands.add('select_without_type', (label,option,div_class="",selectDelay = 0) => {
	cy.get(div_class)
	.contains('label', label)
	.parent()
	.find(`.Select-input`)
	.click({ force: true })
	cy.wait(selectDelay);
	cy.get(`[class*="-menu-outer"]`)
	.contains(option)
	.click({ force: true });
})
Cypress.Commands.add('select_by_label_new', (label, option, selectDelay = 0) => {
	cy.contains('label', label)
	.parents(`.form-group`)
	.find(`.Select-input input`)
	.click({ force: true })
	.clear({force:true})
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu-outer"]`)
	.contains(option)
	.click({ force: true });
});
Cypress.Commands.add('goto_pagination_last_page', (selector,option,selectDelay=0) => {
	if(cy.get(selector).find('.pagination').find('li').contains('a',option).should('not.be.disabled'))
    	{  
	  cy.get(selector).find('.pagination').find('li').contains('a',option).click({force: true});  
	}
	cy.wait(selectDelay);
});

Cypress.Commands.add('select_by_label_new_without_clear', (label, option, selectDelay = 0) => {
	cy.contains('label', label)
	.parents(`.form-group`)
	.find(`.Select-input input`)
	.click({ force: true })
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu-outer"]`)
	.contains(option)
	.click({ force: true });
});
Cypress.Commands.add('select_by_calendar_using_label_without_clear', (label,value, placeholder = "") => {
	if(value === "" || !value) return
	if(placeholder === ""){
		cy.contains('label',label)
		.parent()
		.find(`input[type=text]`)
		.type(value,{force: true})
		cy.contains('label',label)
		.parent()
		.click({force: true})
	}
	else {
		cy.contains('label',label)
		.parent()
		.find(`input[placeholder=${placeholder}]`)
		.type(value,{force: true})
		cy.contains('label',label)
		.parent()
		.find(`input[placeholder=${placeholder}]`)
		.parent()
		.find(`.input-group-addon`)
		.click({force: true})
	}
});
Cypress.Commands.add('select_by_placeholder_using_selector', (label, option, selectDelay = 0) => {
	cy.get('div[class="Select-placeholder"]').contains(label).parent()
	.find(`.Select-input input`)
	.click({ force: true })
	.type(option, { force: true });
	cy.wait(selectDelay);
	cy.get(`[class*="-menu"]`)
	.contains(option)
	.click({ force: true });
});

