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
		
		var parentStat = newRecord.getValue('parentstat');
		
		var form = context.form;
		
		if (context.type == context.UserEventType.CREATE){
			
		}else{
			var electrical = form.getField({
				id : 'custbody_sim_electrical'
			});

			if (parentStat != ''){
				log.debug('from Statistical Schedule');
				electrical.updateDisplayType({
					displayType : serverWidget.FieldDisplayType.NORMAL
				});
			}else{
				log.debug('not From Schedule');
				electrical.updateDisplayType({
					displayType : serverWidget.FieldDisplayType.HIDDEN
				});
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
		log.debug('BS triggered');
		var newRecord = context.newRecord;
		
		var status = newRecord.getValue('status');
		
		log.debug('status', status);
		
		// var parentStat = newRecord.getValue('parentstat');
		// var parentAlloc = newRecord.getValue('parentexpensealloc');
		// var date = newRecord.getValue('trandate');
		// var createdfrom = newRecord.getValue('createdfrom');
		
		// log.debug('parentStat', parentStat.typeof);
		// log.debug('parentAlloc', 'test '+parentAlloc);
		// log.debug('date', 'test '+date);
		// log.debug('createdfrom', 'test '+createdfrom);
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
		
		log.debug('AS triggered');
		var newRecord = context.newRecord;
		var form = context.form;

		
		
		log.debug('title', form);
		
		var status = newRecord.getValue('status');
		
		log.debug('status', status);
		
		var numLines = newRecord.getLineCount({
			sublistId: 'line'
		});
		
		log.debug('numLines', numLines);
		
		for(var i = 0; i < numLines; i++){
			// var lineNum = newRecord.selectLine({
				// sublistId: 'line',
				// line: i
			// });
			
			var account = newRecord.getSublistValue({
				sublistId : 'line',
				fieldId : 'account',
				line : i
			});
			
			log.debug('Line '+i, account);
		}
		
		// var parentStat = newRecord.getValue('parentstat');
		// var parentAlloc = newRecord.getValue('parentexpensealloc');
		// var date = newRecord.getValue('trandate');
		// var createdfrom = newRecord.getValue('createdfrom');
		
		// log.debug('parentStat', parentStat.typeof);
		// log.debug('parentAlloc', 'test '+parentAlloc);
		// log.debug('date', 'test '+date);
		// log.debug('createdfrom', 'test '+createdfrom);
    }
	
    return {
        // beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});