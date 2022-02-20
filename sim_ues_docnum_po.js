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
		
		if (context.type === context.UserEventType.COPY){
			newRecord.setValue('custbody_sim_doc_num', '');
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
		
		if (context.type === context.UserEventType.EDIT){
			var tranid = newRecord.getValue('tranid');
			var trandate = newRecord.getValue('trandate');
			
			var year = trandate.getFullYear();
			var month = ('0' + (trandate.getMonth()+1)).slice(-2);
			
			newRecord.setValue('custbody_sim_doc_num', 'PO/'+year+'/'+month+'/'+tranid);
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
		var newRecord = context.newRecord;
		var oldRecord = context.oldRecord;
		
		if (context.type == context.UserEventType.CREATE){
			var objRecord = record.load({
				type: record.Type.PURCHASE_ORDER,
				id: newRecord.id,
				isDynamic: true
			});
			
			var tranid = objRecord.getValue('tranid');
			var trandate = objRecord.getValue('trandate');
			
			var year = trandate.getFullYear();
			var month = ('0' + (trandate.getMonth()+1)).slice(-2);
			
			objRecord.setValue('custbody_sim_doc_num', 'PO/'+year+'/'+month+'/'+tranid);
			objRecord.save();
		}
    }
	
    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});