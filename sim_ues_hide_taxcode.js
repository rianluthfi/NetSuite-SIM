/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/ui/serverWidget', 'N/runtime', 'N/search', 'N/error'],

function(record, serverWidget, runtime, search, error) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(context) {
		var form = context.form;
		
		var taxCode = form.getSublist({
			id: 'expense'
		}).getField({ 
			id: 'taxcode'
		});
		
		taxCode.isMandatory = false;
		taxCode.updateDisplayType({
			displayType: serverWidget.FieldDisplayType.HIDDEN
		});
		
		// Tax Rate cannot find !
		// var taxRate = form.getSublist({
			// id: 'taxdetails'
		// }).getField({ 
			// id: 'taxrate'
		// });
		
		// taxRate.isMandatory = false;
		// taxRate.updateDisplayType({
			// displayType: serverWidget.FieldDisplayType.HIDDEN
		// });
	}

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(context) {
		// log.debug('beforeSubmit');
	}

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(context) {
		// log.debug('afterSubmit');
    }
	
    return {
        beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    };
    
});