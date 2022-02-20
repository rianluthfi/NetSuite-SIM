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
		var form = context.form;
		
		var f_uom1 = form.getField('custrecord_sim_actcode_uom');
		var f_uom2 = form.getField('custrecord_sim_uom_2');
      	var f_uom3 = form.getField('custrecord_sim_actcode_uom3');
      	var f_uom4 = form.getField('custrecord_sim_actcode_uom4');
      	var f_uom5 = form.getField('custrecord_sim_actcode_uom5');
		
		f_uom1.updateDisplayType({
			displayType: serverWidget.FieldDisplayType.INLINE
		});
		f_uom2.updateDisplayType({
			displayType: serverWidget.FieldDisplayType.INLINE
		});
      	f_uom3.updateDisplayType({
			displayType: serverWidget.FieldDisplayType.INLINE
		});
      	f_uom4.updateDisplayType({
			displayType: serverWidget.FieldDisplayType.INLINE
		});
      	f_uom5.updateDisplayType({
			displayType: serverWidget.FieldDisplayType.INLINE
		});
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
		
		var statAcc1 = newRecord.getValue('custrecord_sim_statis_acc');
		
		if (statAcc1 != ''){
			var mAccount = record.load({
				type: record.Type.ACCOUNT,
				id: statAcc1,
				isDynamic: true,
			});
	
			var uom = mAccount.getValue('unit');
			
			newRecord.setValue('custrecord_sim_actcode_uom', uom);
		}
		
		var statAcc2 = newRecord.getValue('custrecord_sim_statis_acc2');
		
		if (statAcc2 != ''){
			var mAccount = record.load({
				type: record.Type.ACCOUNT,
				id: statAcc2,
				isDynamic: true,
			});
	
			var uom = mAccount.getValue('unit');
			
			newRecord.setValue('custrecord_sim_uom_2', uom);
		}
      
      	var statAcc3 = newRecord.getValue('custrecord_sim_statis_acc3');
		
		if (statAcc3 != ''){
			var mAccount = record.load({
				type: record.Type.ACCOUNT,
				id: statAcc3,
				isDynamic: true,
			});
	
			var uom = mAccount.getValue('unit');
			
			newRecord.setValue('custrecord_sim_actcode_uom3', uom);
		}
      
      	var statAcc4 = newRecord.getValue('custrecord_sim_statis_acc4');
		
		if (statAcc4 != ''){
			var mAccount = record.load({
				type: record.Type.ACCOUNT,
				id: statAcc4,
				isDynamic: true,
			});
	
			var uom = mAccount.getValue('unit');
			
			newRecord.setValue('custrecord_sim_actcode_uom4', uom);
		}
      
      	var statAcc5 = newRecord.getValue('custrecord_sim_statis_acc5');
		
		if (statAcc5 != ''){
			var mAccount = record.load({
				type: record.Type.ACCOUNT,
				id: statAcc5,
				isDynamic: true,
			});
	
			var uom = mAccount.getValue('unit');
			
			newRecord.setValue('custrecord_sim_actcode_uom5', uom);
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