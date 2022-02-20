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
	
		var itemFulfill	= newRecord.getValue('itemfulfillment');
		
		log.debug('itemFulfill '+itemFulfill);
		
		if (itemFulfill != undefined){
			var fulfillRecord = record.load({
				type: record.Type.ITEM_FULFILLMENT,
				id: itemFulfill,
				isDynamic: true,
			});
			
			var numLines = fulfillRecord.getLineCount({
				sublistId: 'item'
			});
			
			for (var i = 0; i < numLines; i++){
				var department = fulfillRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'department',
					line : i
				});
				
				var divisi = fulfillRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'class',
					line : i
				});
				
				var projectCode = fulfillRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'cseg_sim_seg_proj',
					line : i
				});
				
				log.debug('DEBUG',
					'Line : '+i+
					' itemFulfill : '+itemFulfill+
					' department : '+department+
					' class : '+divisi+
					' projectCode : '+projectCode
				);
				
				newRecord.setSublistValue({
					sublistId: 'item',
					fieldId: 'department',
					line: i,
					value: department
				});
				
				newRecord.setSublistValue({
					sublistId: 'item',
					fieldId: 'class',
					line: i,
					value: divisi
				});
				
				newRecord.setSublistValue({
					sublistId: 'item',
					fieldId: 'cseg_sim_seg_proj',
					line: i,
					value: projectCode
				});
			}
		}
		
		if (context.type === context.UserEventType.PRINT){
			
			log.debug('Triggered PRINT');
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