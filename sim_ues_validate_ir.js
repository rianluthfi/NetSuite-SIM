/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/ui/serverWidget', 'N/runtime', 'N/search'],

function(record, serverWidget, runtime, search) {
   
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
		
		var newRecord = context.newRecord;
		var form = context.form;
		
		var createdFrom = newRecord.getValue('createdfrom');
		
		if (createdFrom != ''){
			var createdFromType = search.lookupFields({
				type: search.Type.TRANSACTION,
				id:createdFrom,
				columns:['recordtype']
			})['recordtype'];
			
			if (createdFromType == 'purchaseorder'){
				// var sublistItem = form.getSublist({
					// id: 'item'
				// });
				// var projectCode = sublistItem.getField({
					// id: 'cseg_sim_seg_proj'
				// });
				// projectCode.isMandatory = true;
				
				// var activityCode = sublistItem.getField({
					// id: 'cseg_paactivitycode'
				// });
				// activityCode.isMandatory = true;
				if (context.type == context.UserEventType.CREATE){
					var numLines = newRecord.getLineCount({
						sublistId: 'item'
					});
					
					if (numLines > 0){
						for (var i = 0; i < numLines; i++){
							newRecord.setSublistValue({
								sublistId : 'item',
								fieldId : 'itemreceive',
								line : i,
								value : false
							});
						}
					}
				}
			}
		}
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

    }
	
    return {
        beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    };
    
});