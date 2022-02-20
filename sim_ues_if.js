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
		
		if (context.type === context.UserEventType.PRINT){
			
			log.debug('Triggered PRINT');
			var numLines = newRecord.getLineCount({
				sublistId: 'item'
			});
			
			var a = [];
			
			if (numLines > 0){
				for (var i = 0; i < numLines; i++){
					var quantity = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantity',
						line : i
					});
					
					a.push(quantity);
					
					var quantitycommitted = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantitycommitted',
						line : i
					});
					
					var quantityfulfilled = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantityfulfilled',
						line : i
					});
					
					var quantityreceived = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantityreceived',
						line : i
					});
					
					var line = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'line',
						line : i
					});
					
					log.debug('LOG',
						'quantity '+quantity+'|'+
						'quantitycommitted '+quantitycommitted+'|'+
						'quantityfulfilled '+quantityfulfilled+'|'+
						'quantityreceived '+quantityreceived+'|'+
						'line '+line
					);
					
					newRecord.setSublistValue({
						sublistId : 'item',
						fieldId : 'itemdescription',
						line : i,
						value : 'mantap'+quantity
					});
				}
			}
			
			log.debug('array a '+a);
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
		var newRecord = context.newRecord;
		
		if (context.type === context.UserEventType.PRINT){
			
			log.debug('Triggered PRINT BS');
			var numLines = newRecord.getLineCount({
				sublistId: 'item'
			});
			
			if (numLines > 0){
				for (var i = 0; i < numLines; i++){
					var quantity = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantity',
						line : i
					});
					
					var quantitycommitted = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantitycommitted',
						line : i
					});
					
					var quantityfulfilled = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantityfulfilled',
						line : i
					});
					
					var quantityreceived = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantityreceived',
						line : i
					});
					
					newRecord.setSublistValue({
						sublistId : 'item',
						fieldId : 'itemdescription',
						line : i,
						value : 'mantap'+quantity
					});
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
    function afterSubmit(context) {
		
    }
	
    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    };
    
});