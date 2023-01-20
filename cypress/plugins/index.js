/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
var Excel = require('exceljs');
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
	on('task', {
		writeXlsx({file, sheet, email, first, last}) {
			let workbook = new Excel.Workbook();
			workbook.xlsx.readFile(file)
		    .then(function() {
				let worksheet = workbook.getWorksheet(sheet);
				let row = worksheet.getRow(2);
				row.getCell(2).value = 'df' + email + '@yomail.com';
				row.getCell(4).value = 'deuser' + first;
				row.getCell(5).value = 'cvgh' + last;
				row.commit();
				workbook.xlsx.writeFile(file);
			}) 
           return null;
		}
	})
}

