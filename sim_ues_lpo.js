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
		
		var numLines = newRecord.getLineCount({
			sublistId: 'item'
		});
		
		if (numLines > 0){
			for (var i = 0; i < numLines; i++){
				var projCode = newRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'cseg_sim_seg_proj',
					line : i
				});
				
				var actCode = newRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'cseg_paactivitycode',
					line : i
				});
				
				/*
				var costCenter = newRecord.getSublistValue({
					sublistId : 'item',
					fieldId : 'custcol_sim_costcenter',
					line : i
				});
				
				var projCodeError = error.create({
					name: 'Project Code Error',
					message: 'Project Code on line '+(i+1)+' cannot be empty !',
					notifyOff: false
				});
				
				var actCodeError = error.create({
					name: 'Activity Code Error',
					message: 'Activity Code on line '+(i+1)+' cannot be empty !',
					notifyOff: false
				});
				
				var costCenterError = error.create({
					name: 'Cost Center Error',
					message: 'Cost Center on line '+(i+1)+' cannot be empty !, ASK YOUR ADMINISTRATOR !',
					notifyOff: false
				});
				
				if (projCode == ''){
					log.error('Error: Project Code cannot be empty !');
					
					throw projCodeError;
				}
				
				if (actCode == ''){
					log.error('Error: Activity Code cannot be empty !');
					
					throw actCodeError;
				}
				
				if (costCenter === ''){
					var projectCodeData = search.lookupFields({
						type: 'customrecord_cseg_sim_seg_proj',
						id: projCode,
						columns: ['custrecord_sim_maturity']
					});
					
					var activityCodeData = search.lookupFields({
						type: 'customrecord_cseg_paactivitycode',
						id: actCode,
						columns: ['custrecord_sim_cost_cent_acc', 'custrecord_sim_cost_cent_am']
					});
					
					if (projectCodeData['custrecord_sim_maturity']){
						
						if (activityCodeData.custrecord_sim_cost_cent_am[0] != undefined){
							newRecord.setSublistValue({
								sublistId 	: 'item',
								fieldId 	: 'custcol_sim_costcenter',
								value 		: activityCodeData.custrecord_sim_cost_cent_am[0].value,
								line		: i
							});
						}else{
							throw costCenterError;
						}
					}else{
						if (activityCodeData.custrecord_sim_cost_cent_acc[0] != undefined){
							newRecord.setSublistValue({
								sublistId 	: 'item',
								fieldId 	: 'custcol_sim_costcenter',
								value 		: activityCodeData.custrecord_sim_cost_cent_acc[0].value,
								line 		: i
							});
						}else{
							throw costCenterError;
						}
					}
				}
				*/
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
        // beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    };
    
});