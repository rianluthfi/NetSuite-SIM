/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/ui/serverWidget', 'N/runtime'],

function(record, serverWidget, runtime) {
   
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
		var newRecord = context.newRecord;
		
		if (context.type === context.UserEventType.CREATE){
			var externalid = newRecord.getValue('externalid');
			var date = newRecord.getValue('trandate');
			var memo = newRecord.getValue('memo');
			var department = newRecord.getValue('department');
			var location = newRecord.getValue('location');
			var divisi = newRecord.getValue('class');
			var projCode = newRecord.getValue('cseg_sim_seg_proj');
			var actCode = newRecord.getValue('cseg_paactivitycode');
			
			var memoplus = externalid+' '+memo;
			
			var createPR = record.create({
				type: record.Type.PURCHASE_REQUISITION,
				isDynamic: true
			});
			
			createPR.setValue('trandate', date);
			createPR.setValue('memo', memoplus);
			createPR.setValue('department', department);
			createPR.setValue('location', location);
			createPR.setValue('class', divisi);
			createPR.setValue('cseg_sim_seg_proj', projCode);
			createPR.setValue('cseg_paactivitycode', actCode);
			
			var numLines = newRecord.getLineCount({
				sublistId: 'item'
			});
			
			if (numLines > 0){
				for (var i = 0; i < numLines; i++){
					var item = newRecord.getSublistValue({
					sublistId : 'item',
						fieldId : 'item',
						line : i
					});
					
					var quantity = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantity',
						line : i
					});
					
					var rate = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'rate',
						line : i
					});
					
					var units = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'units',
						line : i
					});
					
					var description = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'description',
						line : i
					});
					
					var memoLine = newRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'custcol_sim_memo_po',
						line : i
					});
					
					createPR.selectNewLine({
						sublistId: 'item'
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'item',
						value : item
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'description',
						value : description
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'custcol_sim_memo_po',
						value : memoLine
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'quantity',
						value : quantity
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'units',
						value : units
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'rate',
						value : rate
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'estimatedrate',
						value : rate
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'estimatedamount',
						value : rate*quantity
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'department',
						value : department
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'location',
						value : location
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'class',
						value : divisi
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'cseg_sim_seg_proj',
						value : projCode
					});
					
					createPR.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'cseg_paactivitycode',
						value : actCode
					});
					
					createPR.commitLine({
						sublistId: 'item'
					});
				}
			}
			
			var recordId = createPR.save({
				enableSourcing: true,
				ignoreMandatoryFields: true
			});
		}	
	}
	
    return {
        // beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
