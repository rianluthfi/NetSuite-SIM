 /**
Date Created	: August 25th, 2020
Created By		: Rian Luthfi Gazali
Project			: Implementation PT. Spice Islands Maluku
Code Version	: 1.0
Function		: -	
Status			: -
Pending Function: -  
*/

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
		var newRecord = context.newRecord;
		
		var statAccount1 = newRecord.getValue('custcol_sim_statisticalacc');
		var statAccount2 = newRecord.getValue('custcol_sim_statisticalacc2');
		
		var f_statAccount1 = form.getField('custcol_sim_statisticalacc');
		var f_statAccount2 = form.getField('custcol_sim_statisticalacc2');
		var f_act_uom_perf1 = form.getField('custcol_sim_time_perf_uom');
		var f_act_uom_perf2 = form.getField('custcol_sim_time_perf_uom2');
		
		f_act_uom_perf1.updateDisplayType({
			displayType: serverWidget.FieldDisplayType.INLINE
		});
		f_act_uom_perf2.updateDisplayType({
			displayType: serverWidget.FieldDisplayType.INLINE
		});
		
		// if (statAccount1 != ''){
			// f_statAccount1.updateDisplayType({
				// displayType: serverWidget.FieldDisplayType.INLINE
			// });
		// }
		// if (statAccount2 != ''){
			// f_statAccount2.updateDisplayType({
				// displayType: serverWidget.FieldDisplayType.INLINE
			// });
		// }
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
		
		
		var statAccount1 = newRecord.getValue('custcol_sim_statisticalacc');
		var statAccount2 = newRecord.getValue('custcol_sim_statisticalacc2');
		var statAccount3 = newRecord.getValue('custcol_sim_statisticalacc3');
		var statAccount4 = newRecord.getValue('custcol_sim_statisticalacc4');
		var statAccount5 = newRecord.getValue('custcol_sim_statisticalacc5');
		
		var customer = newRecord.getValue('customer');
		var casetaskevent = newRecord.getValue('casetaskevent');
		var activityCode = newRecord.getValue('cseg_paactivitycode');
		log.debug('activityCode '+activityCode);
		
		if (customer != ''){
			var projectData = search.lookupFields({
				type: record.Type.JOB,
				id: customer,
				columns: ['custentity_sim_segment_dept', 'custentity_sim_segment_class', 'cseg_sim_seg_proj']
			});
			
			if (newRecord.getValue('department') == '')
				if (projectData.custentity_sim_segment_dept[0] != undefined)
					newRecord.setValue('department', projectData.custentity_sim_segment_dept[0].value);
			
			if (newRecord.getValue('class') == '')
				if (projectData.custentity_sim_segment_class[0] != undefined)
					newRecord.setValue('class', projectData.custentity_sim_segment_class[0].value);
				
			if (newRecord.getValue('cseg_sim_seg_proj') == '')
				if (projectData.cseg_sim_seg_proj[0] != undefined)
					newRecord.setValue('cseg_sim_seg_proj', projectData.cseg_sim_seg_proj[0].value);
		}
		
		if (casetaskevent != ''){
			var mTask = record.load({
				type: record.Type.PROJECT_TASK,
				id: casetaskevent,
				isDynamic: false,
			});
			
			var activityCode = mTask.getValue('cseg_paactivitycode'); 
			var lokasi = mTask.getValue('custevent_sim_task_location');
			
			if (newRecord.getValue('cseg_paactivitycode') == '')
				newRecord.setValue('cseg_paactivitycode', activityCode);
			if (newRecord.getValue('location') == '')
				newRecord.setValue('location', lokasi);
		}
		
		if (activityCode != ''){
			var activityCodeData = search.lookupFields({
				type: 'customrecord_cseg_paactivitycode',
				id: activityCode,
				columns: ['custrecord_sim_cost_cent_acc', 'custrecord_sim_cost_cent_am', 
				'custrecord_sim_statis_acc', 'custrecord_sim_actcode_uom', 'custrecord_sim_std_perform',
				'custrecord_sim_statis_acc2', 'custrecord_sim_uom_2', 'custrecord_sim_std_perform_2',
				'custrecord_sim_cost_premi'
				]
			});
			
			if (newRecord.getValue('custcol_sim_statisticalacc') == '')
				if (activityCodeData.custrecord_sim_statis_acc[0] != undefined)
					newRecord.setValue('custcol_sim_statisticalacc', activityCodeData.custrecord_sim_statis_acc[0].value);
			
			if (newRecord.getValue('custcol_sim_time_perf_uom') == '')
				if (activityCodeData.custrecord_sim_actcode_uom[0] != undefined)
					newRecord.setValue('custcol_sim_time_perf_uom', activityCodeData.custrecord_sim_actcode_uom[0].value);
				
			if (newRecord.getValue('custcol_sim_standardperform_timetrack') == '')
				if (activityCodeData.custrecord_sim_std_perform != undefined)
					newRecord.setValue('custcol_sim_standardperform_timetrack', activityCodeData.custrecord_sim_std_perform);
				
			if (newRecord.getValue('custcol_sim_statisticalacc2') == '')
				if (activityCodeData.custrecord_sim_statis_acc2[0] != undefined)
					newRecord.setValue('custcol_sim_statisticalacc2', activityCodeData.custrecord_sim_statis_acc2[0].value);
				
			if (newRecord.getValue('custcol_sim_time_perf_uom2') == '')
				if (activityCodeData.custrecord_sim_uom_2[0] != undefined)
					newRecord.setValue('custcol_sim_time_perf_uom2', activityCodeData.custrecord_sim_uom_2[0].value);
			/*
				Note Change 03 Jun 2021 18:00 req by Thicon
					- Add new field custcol_sim_premiqty_timetrack as qty premi
					- if qty premi > 0, qty premi will multiply with ratePremi from ActivityCode master for value of custcol_sim_ratepremi_timetrack
					- if qty premi = 0 or null, custcol_sim_ratepremi_timetrack will set null
					
				Note Change 06 Sept 2021 to avoid Rate Premi Change
					- Add New Field RATE PREMI PERFORMANCE / OT {custcol_sim_rate_premi_perf_ot}
					- That field will keep Rate Premi at that time
			*/
			
			if (newRecord.getValue('custcol_sim_rate_premi_perf_ot') == '' || newRecord.getValue('custcol_sim_rate_premi_perf_ot') == undefined){
				newRecord.setValue('custcol_sim_rate_premi_perf_ot', activityCodeData.custrecord_sim_cost_premi);
			}
			
			if (context.type == context.UserEventType.EDIT){
				var oldRecord = context.oldRecord;
				
				if (oldRecord.getValue('cseg_paactivitycode') != newRecord.getValue('cseg_paactivitycode')){
					log.debug('Activity Code Changed !'+activityCodeData.custrecord_sim_cost_premi);
					newRecord.setValue('custcol_sim_rate_premi_perf_ot', activityCodeData.custrecord_sim_cost_premi);
					// define RatePremi from ActivityCode
					// if ((newRecord.getValue('custcol_sim_premiqty_timetrack') > 0)){
						// if (activityCodeData.custrecord_sim_cost_premi != undefined)
							// newRecord.setValue('custcol_sim_rate_premi_perf_ot', activityCodeData.custrecord_sim_cost_premi);
					// }else{
						// newRecord.setValue('custcol_sim_ratepremi_timetrack', '');
					// }
					
					// calculate qtyPremi x ratePremi
					if ((newRecord.getValue('custcol_sim_premiqty_timetrack') > 0) && newRecord.getValue('custcol_sim_rate_premi_perf_ot') > 0){
						newRecord.setValue('custcol_sim_ratepremi_timetrack', (newRecord.getValue('custcol_sim_premiqty_timetrack') * newRecord.getValue('custcol_sim_rate_premi_perf_ot')));
					}else{
						newRecord.setValue('custcol_sim_ratepremi_timetrack', '');
					}
				}
			}
			
			// if (newRecord.getValue('custcol_sim_premiqty_timetrack') > 0){
				// if (activityCodeData.custrecord_sim_cost_premi != undefined)
					// newRecord.setValue('custcol_sim_ratepremi_timetrack', (newRecord.getValue('custcol_sim_premiqty_timetrack') *activityCodeData.custrecord_sim_cost_premi));
			// }else{
				// newRecord.setValue('custcol_sim_ratepremi_timetrack', '');
			// }
		}
		
		// Validation Set UOM Statistical Account
		if (statAccount1 != ''){
			var uom = getUOMStatAcc(statAccount1);
			newRecord.setValue('custcol_sim_time_perf_uom', uom);
		}
		if (statAccount2 != ''){
			var uom = getUOMStatAcc(statAccount2);
			newRecord.setValue('custcol_sim_time_perf_uom2', uom);
		}
		if (statAccount3 != ''){
			var uom = getUOMStatAcc(statAccount3);
			newRecord.setValue('custcol_sim_time_perf_uom3', uom);
		}
		if (statAccount4 != ''){
			var uom = getUOMStatAcc(statAccount4);
			newRecord.setValue('custcol_sim_time_perf_uom4', uom);
		}
		if (statAccount5 != ''){
			var uom = getUOMStatAcc(statAccount5);
			newRecord.setValue('custcol_sim_time_perf_uom5', uom);
		}
		
		
		if (statAccount2 != '' && statAccount1 == ''){
			throw 'Cannot fill Statistical Account 2 when Statistical Account 1 empty !';
			return false;
		}
		
		if (context.type == context.UserEventType.DELETE){
			var relStatJE1 = newRecord.getValue('custcol_sim_related_stat_je');
			var relStatJE2 = newRecord.getValue('custcol_sim_related_stat_je_2');
			var relStatJE3 = newRecord.getValue('custcol_related_statistical_journal_3');
			var relStatJE4 = newRecord.getValue('custcol_related_statistical_journal_4');
			var relStatJE5 = newRecord.getValue('custcol_related_statistical_journal_5');
			
			if (relStatJE1 != ''){
				deleteRelStatJE(relStatJE1);
			}
			if (relStatJE2 != ''){
				deleteRelStatJE(relStatJE2);
			}
			if (relStatJE3 != ''){
				deleteRelStatJE(relStatJE3);
			}
			if (relStatJE4 != ''){
				deleteRelStatJE(relStatJE4);
			}
			if (relStatJE5 != ''){
				deleteRelStatJE(relStatJE5);
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
		var newRecord = context.newRecord;
		
		if (context.type == context.UserEventType.DELETE){
			return false;
		}
		
		var statAccount1 = newRecord.getValue('custcol_sim_statisticalacc');
		var statAccount2 = newRecord.getValue('custcol_sim_statisticalacc2');
		var statAccount3 = newRecord.getValue('custcol_sim_statisticalacc3');
		var statAccount4 = newRecord.getValue('custcol_sim_statisticalacc4');
		var statAccount5 = newRecord.getValue('custcol_sim_statisticalacc5');
		var actPerform1 = newRecord.getValue('custcol_sim_time_performance');
		var actPerform2 = newRecord.getValue('custcol_sim_time_perf_plant');
		var actPerform3 = newRecord.getValue('custcol_sim_time_performance3');
		var actPerform4 = newRecord.getValue('custcol_sim_time_performance4');
		var actPerform5 = newRecord.getValue('custcol_sim_time_performance5');
		var relStatJE1 = newRecord.getValue('custcol_sim_related_stat_je');
		var relStatJE2 = newRecord.getValue('custcol_sim_related_stat_je_2');
		var relStatJE3 = newRecord.getValue('custcol_related_statistical_journal_3');
		var relStatJE4 = newRecord.getValue('custcol_related_statistical_journal_4');
		var relStatJE5 = newRecord.getValue('custcol_related_statistical_journal_5');
		var supervisorapproval = newRecord.getValue('supervisorapproval');
		
		log.debug('LOG',
			'[stat1 |'+statAccount1+'|'+actPerform1+'|'+relStatJE1+']=='+
			'[stat2 |'+statAccount2+'|'+actPerform2+'|'+relStatJE2+']=='+
			'[stat3 |'+statAccount3+'|'+actPerform3+'|'+relStatJE3+']=='+
			'[stat4 |'+statAccount4+'|'+actPerform4+'|'+relStatJE4+']=='+
			'[stat5 |'+statAccount5+'|'+actPerform5+'|'+relStatJE5+']'
		);
		
		
		if (supervisorapproval && statAccount1 != '' && actPerform1 != '' && relStatJE1 == ''){
			log.debug('Create Statistical Journal #1');
			createStatJE(newRecord, statAccount1, 1);
		}
		
		if (supervisorapproval && statAccount2 != '' && actPerform2 != '' && relStatJE2 == ''){
			log.debug('Create Statistical Journal #2');
			createStatJE(newRecord, statAccount2, 2);
		}
		
		if (supervisorapproval && statAccount3 != '' && actPerform3 != '' && relStatJE3 == ''){
			log.debug('Create Statistical Journal #3');
			createStatJE(newRecord, statAccount3, 3);
		}
		
		if (supervisorapproval && statAccount4 != '' && actPerform4 != '' && relStatJE4 == ''){
			log.debug('Create Statistical Journal #4');
			createStatJE(newRecord, statAccount4, 4);
		}
		
		if (supervisorapproval && statAccount5 != '' && actPerform5 != '' && relStatJE5 == ''){
			log.debug('Create Statistical Journal #5');
			createStatJE(newRecord, statAccount5, 5);
		}
		
		if (context.type == context.UserEventType.EDIT){
			var oldRecord = context.oldRecord;
			
			if (
				(oldRecord.getText('trandate') != newRecord.getText('trandate') ||
				oldRecord.getValue('custcol_sim_statisticalacc') != newRecord.getValue('custcol_sim_statisticalacc') ||
				oldRecord.getValue('custcol_sim_time_performance') != newRecord.getValue('custcol_sim_time_performance') ||
				oldRecord.getValue('custcol_sim_statisticalacc2') != newRecord.getValue('custcol_sim_statisticalacc2') ||
				oldRecord.getValue('custcol_sim_time_perf_plant') != newRecord.getValue('custcol_sim_time_perf_plant') ||
				oldRecord.getValue('custcol_sim_statisticalacc3') != newRecord.getValue('custcol_sim_statisticalacc3') ||
				oldRecord.getValue('custcol_sim_time_performance3') != newRecord.getValue('custcol_sim_time_performance3') ||
				oldRecord.getValue('custcol_sim_statisticalacc4') != newRecord.getValue('custcol_sim_statisticalacc4') ||
				oldRecord.getValue('custcol_sim_time_performance4') != newRecord.getValue('custcol_sim_time_performance4') ||
				oldRecord.getValue('custcol_sim_statisticalacc5') != newRecord.getValue('custcol_sim_statisticalacc5') ||
				oldRecord.getValue('custcol_sim_time_performance5') != newRecord.getValue('custcol_sim_time_performance5') ||
				oldRecord.getValue('cseg_sim_seg_proj') != newRecord.getValue('cseg_sim_seg_proj') ||
				oldRecord.getValue('cseg_paactivitycode') != newRecord.getValue('cseg_paactivitycode') ||
				oldRecord.getValue('department') != newRecord.getValue('department') ||
				oldRecord.getValue('class') != newRecord.getValue('class') ||
				oldRecord.getValue('location') != newRecord.getValue('location'))
				&& (relStatJE1 != '' || relStatJE2 != '' || relStatJE3 != '' || relStatJE4 != '' || relStatJE5 != '')
			){
				if (relStatJE1 != ''){
					updateStatJE(newRecord, statAccount1, relStatJE1, 1);
				}
				if (relStatJE2 != ''){
					updateStatJE(newRecord, statAccount2, relStatJE2, 2);
				}
				if (relStatJE3 != ''){
					updateStatJE(newRecord, statAccount3, relStatJE3, 3);
				}
				if (relStatJE4 != ''){
					updateStatJE(newRecord, statAccount4, relStatJE4, 4);
				}
				if (relStatJE5 != ''){
					updateStatJE(newRecord, statAccount5, relStatJE5, 5);
				}
			}
		}
    }
	
	function updateStatJE(newRecord, statAccount, relStatJE, num){
		var mAccount = record.load({
			type: record.Type.ACCOUNT,
			id: statAccount,
			isDynamic: true,
		});
		
		var uom = mAccount.getValue('unitstype');
		var trandate = newRecord.getValue('trandate');
		var projectCode = newRecord.getValue('cseg_sim_seg_proj');
		var activityCode = newRecord.getValue('cseg_paactivitycode');
		var thirdParty = newRecord.getValue('cseg_sim_seg_tparty');
		var department = newRecord.getValue('department');
		var lokasi = newRecord.getValue('location');
		var divisi = newRecord.getValue('class');
		
		var statJE = record.load({
			type: record.Type.STATISTICAL_JOURNAL_ENTRY,
			id: relStatJE,
			isDynamic: true,
		});
		
		statJE.setValue('trandate', trandate);
		statJE.setValue('unitstype', uom);
		statJE.setValue('cseg_sim_seg_proj', projectCode);
		statJE.setValue('cseg_paactivitycode', activityCode);
		
		var selectLine = statJE.selectLine({
			sublistId : 'line',
			line : 0
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'account',
			value: statAccount
		});
		
		if (num == 1){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_performance')
			});
		}
		
		if (num == 2){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_perf_plant')
			});
		}
		
		if (num == 3){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_performance3')
			});
		}
		
		if (num == 4){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_performance4')
			});
		}
		
		if (num == 5){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_performance5')
			});
		}
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'department',
			value: department
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'class',
			value: divisi
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'location',
			value: lokasi
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_proj',
			value: projectCode
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_paactivitycode',
			value: activityCode
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_tparty',
			value: thirdParty
		});
		
		statJE.commitLine({
			sublistId: 'line'
		});
		
		statJE.save();
	}
	
	function createStatJE(newRecord, statAccount, num){
		var mAccount = record.load({
			type: record.Type.ACCOUNT,
			id: statAccount,
			isDynamic: true,
		});
				
		var uom = mAccount.getValue('unitstype');
		var trandate = newRecord.getValue('trandate');
		var department = newRecord.getValue('department');
		var lokasi = newRecord.getValue('location');
		var divisi = newRecord.getValue('class');
		var projectCode = newRecord.getValue('cseg_sim_seg_proj');
		var activityCode = newRecord.getValue('cseg_paactivitycode');
		var thirdParty = newRecord.getValue('cseg_sim_seg_tparty');
		
		var statJE = record.create({
			type: record.Type.STATISTICAL_JOURNAL_ENTRY,
			isDynamic: true
		});
		
		statJE.setValue('trandate', trandate);
		statJE.setValue('unitstype', uom);
		statJE.setValue('cseg_sim_seg_proj', projectCode);
		statJE.setValue('cseg_paactivitycode', activityCode);
		statJE.setValue('custbody_sim_related_time_tracking', newRecord.id);
		
		var lineCount = statJE.selectNewLine({
			sublistId : 'line'
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'account',
			value: statAccount
		});
		
		if (num == 1){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_performance')
			});
		}
		if (num == 2){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_perf_plant')
			});
		}
		if (num == 3){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_performance3')
			});
		}
		if (num == 4){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_performance4')
			});
		}
		if (num == 5){
			statJE.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'debit',
				value: newRecord.getValue('custcol_sim_time_performance5')
			});
		}
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'department',
			value: department
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'class',
			value: divisi
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'location',
			value: lokasi
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_proj',
			value: projectCode
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_paactivitycode',
			value: activityCode
		});
		
		statJE.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_tparty',
			value: thirdParty
		});
		
		statJE.commitLine({
			sublistId: 'line'
		});
		
		statJE.save();
		
		if (num == 1){
			setRelatedStatJE(newRecord.id, statJE.id, num);
		}
		if (num == 2){
			setRelatedStatJE(newRecord.id, statJE.id, num);
		}
		if (num == 3){
			setRelatedStatJE(newRecord.id, statJE.id, num);
		}
		if (num == 4){
			setRelatedStatJE(newRecord.id, statJE.id, num);
		}
		if (num == 5){
			setRelatedStatJE(newRecord.id, statJE.id, num);
		}
	}
	
	function setRelatedStatJE(idTimeTrack, idStatJE, num){
		
		var mTimeTrack = record.load({
			type: record.Type.TIME_BILL,
			id: idTimeTrack,
			isDynamic: true,
		});
		
		if (num == 1)
			mTimeTrack.setValue('custcol_sim_related_stat_je', idStatJE);
		if (num == 2)
			mTimeTrack.setValue('custcol_sim_related_stat_je_2', idStatJE);
		if (num == 3)
			mTimeTrack.setValue('custcol_related_statistical_journal_3', idStatJE);
		if (num == 4)
			mTimeTrack.setValue('custcol_related_statistical_journal_4', idStatJE);
		if (num == 5)
			mTimeTrack.setValue('custcol_related_statistical_journal_5', idStatJE);
		
		mTimeTrack.save();
	}
	
	function getUOMStatAcc(idStatAcc){
		var statAcc = record.load({
			type: record.Type.ACCOUNT,
			id: idStatAcc,
			isDynamic: true,
		});
		
		var uom = statAcc.getValue('unit');
		
		return uom;
	}
	
	function deleteRelStatJE(idJE){
		var statJE = record.load({
			type: record.Type.STATISTICAL_JOURNAL_ENTRY,
			id: idJE,
			isDynamic: true,
		});
		
		statJE.setValue('custbody_sim_related_time_tracking', '');
		
		statJE.save();
		
		var delStatJE = record.delete({
		   type: record.Type.STATISTICAL_JOURNAL_ENTRY,
		   id: idJE,
		});
	}

	
    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});