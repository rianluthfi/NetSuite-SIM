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
		
		var cf_temp_qty = form.getSublist({
			id: 'item'
		}).getField({ 
			id: 'amount' 
		}).updateDisplayType({
			displayType: serverWidget.FieldDisplayType.HIDDEN
			// displayType: serverWidget.FieldDisplayType.INLINE
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
		
		var numLines = newRecord.getLineCount({
			sublistId: 'item'
		});
		
		log.debug('numLines '+numLines);
		
		for (var i = 0; i < numLines; i++){
			var projectCode = newRecord.getSublistValue({
				sublistId : 'item',
				fieldId : 'cseg_sim_seg_proj',
				line : i
			});
			
			var activityCode = newRecord.getSublistValue({
				sublistId : 'item',
				fieldId : 'cseg_paactivitycode',
				line : i
			});
			
			var unitId = newRecord.getSublistValue({
				sublistId : 'item',
				fieldId : 'cseg_sim_seg_tparty',
				line : i
			});
			
			var costCenter = newRecord.getSublistValue({
				sublistId : 'item',
				fieldId : 'custcol_sim_costcenter',
				line : i
			});
			
			var units = newRecord.getSublistValue({
				sublistId : 'item',
				fieldId : 'units',
				line : i
			});
			
			log.debug('projectCode '+i+' '+projectCode);
			log.debug('activityCode '+i+' '+activityCode);
			log.debug('unitId '+i+' '+unitId);
			log.debug('costCenter '+i+' '+costCenter);
			log.debug('units '+i+' '+units);
			
			newRecord.setSublistValue({
				sublistId : 'item',
				fieldId : 'amount',
				line : i,
				value : 0
			});
			
			if (costCenter == ''){
				if (unitId == ''){
					masterProjCode = record.load({
						type: 'customrecord_cseg_sim_seg_proj',
						id: projectCode,
						isDynamic: true
					});
					
					var matureProj = masterProjCode.getValue('custrecord_sim_maturity');
					
					masterActCode = record.load({
						type: 'customrecord_cseg_paactivitycode',
						id: activityCode,
						isDynamic: true
					});
					
					var tempCostCenter;
					
					if (matureProj){
						tempCostCenter = masterActCode.getValue('custrecord_sim_cost_cent_am'); //After Maturity
						
						if (tempCostCenter == ''){
							var costCenterError = error.create({
								name: 'Cost Center [After Mature] Not Found',
								message: ('Cost Center [After Mature] on Activity Code '+tempCostCenter+' is empty, Ask Administrator immediately !'),
								notifyOff: false
							});
							
							throw costCenterError;
						}
					}else{
						tempCostCenter = masterActCode.getValue('custrecord_sim_cost_cent_acc'); //Before Maturity
						
						if (tempCostCenter == ''){
							var costCenterError = error.create({
								name: 'Cost Center [Before Mature] Not Found',
								message: ('Cost Center [Before Mature] on Activity Code '+tempCostCenter+' is empty, Ask Administrator immediately !'),
								notifyOff: false
							});
							
							throw costCenterError;
						}
					}
					
					newRecord.setSublistValue({
						sublistId : 'item',
						fieldId : 'custcol_sim_costcenter',
						line : i,
						value : tempCostCenter
					});
				}else{
					var masterUnitId = record.load({
						type: 'customrecord_cseg_sim_seg_tparty',
						id: unitId,
						isDynamic: true
					});
					
					var parents = masterUnitId.getValue('parent');
					var EQUIPMENT_ID = 3;
					
					if (parents	== EQUIPMENT_ID){
						var ubc = masterUnitId.getValue('custrecord_3rdparty_ubcaccount');
					
						if (ubc == ''){
							var ubcError = error.create({
								name: 'UBC Not Found',
								message: ('UBC Account on Unit ID / Third Party '+unitId+' is empty, Ask Administrator immediately !'),
								notifyOff: false
							});
							
							throw ubcError;
						}else{
							newRecord.setSublistValue({
								sublistId : 'item',
								fieldId : 'custcol_sim_costcenter',
								line : i,
								value : ubc
							});
						}
					}else{
						newRecord.setSublistValue({
							sublistId : 'item',
							fieldId : 'custcol_sim_costcenter',
							line : i,
							value : tempCostCenter
						});
					}
				}
			}
			
			var amount = newRecord.getSublistValue({
				sublistId : 'item',
				fieldId : 'amount',
				line : i
			});
			
			log.debug('amount '+i+' '+amount);
			
			newRecord.setSublistValue({
				sublistId : 'item',
				fieldId : 'amount',
				line : i,
				value : 0
			});
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