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
		
		var cf_temp_qty = form.getSublist({
			id: 'item'
		}).getField({ 
			id: 'custcol_sim_temp_qty_to' 
		}).updateDisplayType({
			displayType: serverWidget.FieldDisplayType.HIDDEN
		});
		
		if (newRecord.type == 'itemfulfillment'){
			var cf_temp_qtyremain = form.getSublist({
				id: 'item'
			}).getField({ 
				id: 'custcol_sim_temp_qtyremain' 
			}).updateDisplayType({
				displayType: serverWidget.FieldDisplayType.HIDDEN
			});
		}
		
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
				
				var quantityavailable = newRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'quantityavailable',
					line : i
				});
				
				var quantitybackordered = newRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'quantitybackordered',
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
				
				var id = newRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'id',
					line : i
				});
				
				var line = newRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'line',
					line : i
				});
				
				var linenumber = newRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'linenumber',
					line : i
				});
				
				log.debug('LOG',
					'quantity '+quantity+'|'+
					'quantityavailable '+quantityavailable+'|'+
					'quantitybackordered '+quantitybackordered+'|'+
					'quantitycommitted '+quantitycommitted+'|'+
					'quantityfulfilled '+quantityfulfilled+'|'+
					'quantityreceived '+quantityreceived+'|'+
					'id '+id+'|'+
					'line '+line+'|'+
					'linenumber '+linenumber
				);
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