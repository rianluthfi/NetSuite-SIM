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
		
		// log.debug('Before Submit Triggered - Auto Journal Salary');
		
		var newRecord = context.newRecord;
		
		var projectCode = newRecord.getValue('cseg_sim_seg_proj');
		var thirdParty = newRecord.getValue('cseg_sim_seg_tparty');
		var hk = newRecord.getValue('custcol_sim_total_hk');
		var runAutoJournal = newRecord.getValue('custcol_sim_run_auto_journal_salary');
		var relatedJournal = newRecord.getValue('custcol_sim_related_journal_salary');
		
		
		
		if (context.type == context.UserEventType.DELETE){
			
			if (relatedJournal != ''){
				deleteRelJournalSalary(relatedJournal);
			}
		}
		
		// Run Auto Journal Salary
		if (runAutoJournal && relatedJournal == '' && hk > 0){
			
			log.debug('Create Auto Journal');
			
			if (thirdParty != ''){
				log.debug('Execute AutoJournal for Third Party');
				createJournalSalary(newRecord, 'ThirdParty');
			}else{
				masterProjCode = record.load({
					type: 'customrecord_cseg_sim_seg_proj',
					id: projectCode,
					isDynamic: true
				});
				
				var nonBatch = masterProjCode.getValue('custrecord_sim_non_batch_block');
				
				if (!nonBatch){
					log.debug('Execute AutoJournal for Batch !');
					createJournalSalary(newRecord, 'Batch');
				}else{
					log.debug('Execute AutoJournal for Non Batch !');
					createJournalSalary(newRecord, 'NonBatch');
				}
			}
		}
		
		if (context.type == context.UserEventType.EDIT){
			var oldRecord = context.oldRecord;
			
			if (relatedJournal != ''){
				if (
					oldRecord.getValue('employee') != newRecord.getValue('employee')||
					oldRecord.getValue('cseg_sim_seg_tparty') != newRecord.getValue('cseg_sim_seg_tparty')||
					oldRecord.getText('trandate') != newRecord.getText('trandate')||
					oldRecord.getValue('department') != newRecord.getValue('department')||
					oldRecord.getValue('class') != newRecord.getValue('class')||
					oldRecord.getValue('location') != newRecord.getValue('location')||
					oldRecord.getValue('cseg_sim_seg_proj') != newRecord.getValue('cseg_sim_seg_proj')||
					oldRecord.getValue('cseg_paactivitycode') != newRecord.getValue('cseg_paactivitycode')||
					oldRecord.getValue('cseg_sim_gangmandor') != newRecord.getValue('cseg_sim_gangmandor')||
					oldRecord.getValue('memo') != newRecord.getValue('memo')||
					oldRecord.getValue('custcol_sim_workday_type') != newRecord.getValue('custcol_sim_workday_type')||
					oldRecord.getValue('custcol_sim_total_hk') != newRecord.getValue('custcol_sim_total_hk')||
					oldRecord.getValue('custcol_sim_rate_salary') != newRecord.getValue('custcol_sim_rate_salary')||
					oldRecord.getValue('custcol_sim_rate_premi_khusus_ga') != newRecord.getValue('custcol_sim_rate_premi_khusus_ga')||
					oldRecord.getValue('custcol_sim_ratepremi_timetrack') != newRecord.getValue('custcol_sim_ratepremi_timetrack')
				){
					log.debug('update Journal Salary !');
					if (thirdParty != ''){
						log.debug('Execute update for Third Party');
						updateJournalSalary(newRecord, 'ThirdParty');
					}else{
						masterProjCode = record.load({
							type: 'customrecord_cseg_sim_seg_proj',
							id: projectCode,
							isDynamic: true
						});
						
						var nonBatch = masterProjCode.getValue('custrecord_sim_non_batch_block');
						
						if (!nonBatch){
							log.debug('Update Salary Batch !');
							updateJournalSalary(newRecord, 'Batch');
						}else{
							log.debug('Update Salary Non Batch !');
							updateJournalSalary(newRecord, 'NonBatch');
						}
					}
				}else{
					log.debug('Update AutoJournal Not Triggered');
					return false;
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
		// log.debug('afterSubmit');
    }
	
	function createJournalSalary(newRecord, type){
		
		var trandate = newRecord.getValue('trandate');
		var employee = newRecord.getValue('employee');
		var workdayType = newRecord.getValue('custcol_sim_workday_type');
		var memo = newRecord.getValue('memo');
		
		var department = newRecord.getValue('department');
		var divisi = newRecord.getValue('class');
		var location = newRecord.getValue('location');
		var projectCode = newRecord.getValue('cseg_sim_seg_proj');
		var activityCode = newRecord.getValue('cseg_paactivitycode');
		var gangMandor = newRecord.getValue('cseg_sim_gangmandor');
		var thirdParty = newRecord.getValue('cseg_sim_seg_tparty');
		
		var hk = newRecord.getValue('custcol_sim_total_hk');
		
		var basicRate = newRecord.getValue('custcol_sim_rate_salary');
		var specialRate = newRecord.getValue('custcol_sim_rate_premi_khusus_ga');
		var totalPremi = newRecord.getValue('custcol_sim_ratepremi_timetrack');
		
		if (basicRate == '' || basicRate == null)
			basicRate = 0;
		if (specialRate == '' || specialRate == null)
			specialRate = 0;
		if (totalPremi == '' || totalPremi == null)
			totalPremi = 0;
		
		amount = basicRate + specialRate + totalPremi;
		
		masterActCode = record.load({
			type: 'customrecord_cseg_paactivitycode',
			id: activityCode,
			isDynamic: true
		});
		
		var costCenter = '';
		
		log.debug('costCenter Before '+costCenter);
		
		if (type == 'ThirdParty'){
			masterThirdParty = record.load({
				type: 'customrecord_cseg_sim_seg_tparty',
				id: thirdParty,
				isDynamic: true
			});
			
			costCenter = masterThirdParty.getValue('custrecord_3rdparty_ubcaccount');
			
			if (costCenter == ''){
				var costCenterError = error.create({
					name: 'Cost Center [Third Party] Not Found',
					message: ('Cost Center [Third Party] on ThirdParty ID '+thirdParty+' is empty, Ask Administrator immediately !'),
					notifyOff: false
				});
				
				throw costCenterError;
			}
		}
		
		
		if (type == 'Batch'){
			masterProjCode = record.load({
				type: 'customrecord_cseg_sim_seg_proj',
				id: projectCode,
				isDynamic: true
			});
			
			var matureProj = masterProjCode.getValue('custrecord_sim_maturity');
			
			if (matureProj){
				costCenter = masterActCode.getValue('custrecord_sim_cost_cent_am'); // After Maturity
			}else{
				costCenter = masterActCode.getValue('custrecord_sim_cost_cent_acc'); // Before	 Maturity
			}
			
			if (costCenter == ''){
				var costCenterError = error.create({
					name: 'Cost Center Not Found',
					message: ('Cost Center on Activity Code ID '+activityCode+' is empty, Ask Administrator immediately !'),
					notifyOff: false
				});
				
				throw costCenterError;
			}
		}
		
		if (type == 'NonBatch'){
			costCenter = masterActCode.getValue('custrecord_sim_cost_center_non_block');
			
			if (costCenter == ''){
				var costCenterError = error.create({
					name: 'Cost Center [Non Batch] Not Found',
					message: ('Cost Center [Non Batch] on Activity Code ID '+activityCode+' is empty, Ask Administrator immediately !'),
					notifyOff: false
				});
				
				throw costCenterError;
			}
		}
		
		log.debug('costCenter After '+costCenter);
		
		
		
		var journalSalary = record.create({
			type: 'customtransaction_sim_salary_transac',
			isDynamic: true
		});
		
		journalSalary.setValue('trandate', trandate);
		journalSalary.setValue('memo', memo);
		
		// Set Debit Line
		
		journalSalary.selectNewLine({
			sublistId : 'line'
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'account',
			value: costCenter
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'debit',
			value: amount
		});
		
		if (type == 'ThirdParty'){
			journalSalary.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'entity',
				value: employee
			});
			
			journalSalary.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'cseg_sim_seg_tparty',
				value: thirdParty
			});
		}else{
			masterEmployee = record.load({
				type: record.Type.EMPLOYEE,
				id: employee,
				isDynamic: true
			});
			
			var empThirdParty = masterEmployee.getValue('cseg_sim_seg_tparty');
			
			if (empThirdParty == ''){
				var empTPError = error.create({
					name: 'Employee Reference [Third Party] Not Found',
					message: ('ThirdParty on Employee ID '+employee+' is empty, Ask Administrator immediately !'),
					notifyOff: false
				});
				
				throw empTPError;
			}
			
			journalSalary.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'cseg_sim_seg_tparty',
				value: empThirdParty
			});
		}
		
		
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_gangmandor',
			value: gangMandor
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'custcol_sim_workday_type',
			value: workdayType
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'department',
			value: department
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'class',
			value: divisi
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'location',
			value: location
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_proj',
			value: projectCode
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_paactivitycode',
			value: activityCode
		});
		
		journalSalary.commitLine({
			sublistId: 'line'
		});
		
		// Set Credit Line
		
		journalSalary.selectNewLine({
			sublistId : 'line'
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'account',
			value: 483 // 11991 Other Accounts : Salary Transit Account
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'credit',
			value: amount
		});
		
		if (type == 'ThirdParty'){
			journalSalary.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'entity',
				value: employee
			});
			
			journalSalary.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'cseg_sim_seg_tparty',
				value: thirdParty
			});
		}else{
			masterEmployee = record.load({
				type: record.Type.EMPLOYEE,
				id: employee,
				isDynamic: true
			});
			
			var empThirdParty = masterEmployee.getValue('cseg_sim_seg_tparty');
			
			if (empThirdParty == ''){
				var empTPError = error.create({
					name: 'Employee Reference [Third Party] Not Found',
					message: ('ThirdParty on Employee ID '+employee+' is empty, Ask Administrator immediately !'),
					notifyOff: false
				});
				
				throw empTPError;
			}
			
			journalSalary.setCurrentSublistValue({
				sublistId: 'line',
				fieldId: 'cseg_sim_seg_tparty',
				value: empThirdParty
			});
		}
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_gangmandor',
			value: gangMandor
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'custcol_sim_workday_type',
			value: workdayType
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'department',
			value: department
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'class',
			value: divisi
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'location',
			value: location
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_proj',
			value: projectCode
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_paactivitycode',
			value: activityCode
		});
		
		journalSalary.commitLine({
			sublistId: 'line'
		});
		
		journalSalary.setValue('custbody_sim_related_timetrack', newRecord.id);
		
		journalSalary.save();
		
		log.debug('journalSalary id '+journalSalary.id);
		
		newRecord.setValue('custcol_sim_related_journal_salary', journalSalary.id);
	}
	
	function updateJournalSalary(newRecord, type){
		
		var trandate = newRecord.getValue('trandate');
		var employee = newRecord.getValue('employee');
		var workdayType = newRecord.getValue('custcol_sim_workday_type');
		var memo = newRecord.getValue('memo');
		
		var department = newRecord.getValue('department');
		var divisi = newRecord.getValue('class');
		var location = newRecord.getValue('location');
		var projectCode = newRecord.getValue('cseg_sim_seg_proj');
		var activityCode = newRecord.getValue('cseg_paactivitycode');
		var gangMandor = newRecord.getValue('cseg_sim_gangmandor');
		var thirdParty = newRecord.getValue('cseg_sim_seg_tparty');
		
		var hk = newRecord.getValue('custcol_sim_total_hk');
		
		var basicRate = newRecord.getValue('custcol_sim_rate_salary');
		var specialRate = newRecord.getValue('custcol_sim_rate_premi_khusus_ga');
		var totalPremi = newRecord.getValue('custcol_sim_ratepremi_timetrack');
		
		if (basicRate == '' || basicRate == null)
			basicRate = 0;
		if (specialRate == '' || specialRate == null)
			specialRate = 0;
		if (totalPremi == '' || totalPremi == null)
			totalPremi = 0;
		
		var amount = basicRate + specialRate + totalPremi;
		
		var relatedJournal = newRecord.getValue('custcol_sim_related_journal_salary');
		
		masterActCode = record.load({
			type: 'customrecord_cseg_paactivitycode',
			id: activityCode,
			isDynamic: true
		});
		
		var costCenter = '';
		
		log.debug('costCenter Before '+costCenter);
		
		if (type == 'ThirdParty'){
			masterThirdParty = record.load({
				type: 'customrecord_cseg_sim_seg_tparty',
				id: thirdParty,
				isDynamic: true
			});
			
			costCenter = masterThirdParty.getValue('custrecord_3rdparty_ubcaccount');
			
			if (costCenter == ''){
				var costCenterError = error.create({
					name: 'Cost Center [Third Party] Not Found',
					message: ('Cost Center [Third Party] on ThirdParty ID '+thirdParty+' is empty, Ask Administrator immediately !'),
					notifyOff: false
				});
				
				throw costCenterError;
			}
		}
		
		
		if (type == 'Batch'){
			masterProjCode = record.load({
				type: 'customrecord_cseg_sim_seg_proj',
				id: projectCode,
				isDynamic: true
			});
			
			var matureProj = masterProjCode.getValue('custrecord_sim_maturity');
			
			if (matureProj){
				costCenter = masterActCode.getValue('custrecord_sim_cost_cent_am'); // After Maturity
			}else{
				costCenter = masterActCode.getValue('custrecord_sim_cost_cent_acc'); // Before	 Maturity
			}
			
			if (costCenter == ''){
				var costCenterError = error.create({
					name: 'Cost Center Not Found',
					message: ('Cost Center on Activity Code ID '+activityCode+' is empty, Ask Administrator immediately !'),
					notifyOff: false
				});
				
				throw costCenterError;
			}
		}
		
		if (type == 'NonBatch'){
			costCenter = masterActCode.getValue('custrecord_sim_cost_center_non_block');
			
			if (costCenter == ''){
				var costCenterError = error.create({
					name: 'Cost Center [Non Batch] Not Found',
					message: ('Cost Center [Non Batch] on Activity Code ID '+activityCode+' is empty, Ask Administrator immediately !'),
					notifyOff: false
				});
				
				throw costCenterError;
			}
		}
		
		log.debug('costCenter After '+costCenter);
		
		
		
		var journalSalary = record.load({
			type: 'customtransaction_sim_salary_transac',
			id : relatedJournal,
			isDynamic: true
		});
		
		journalSalary.setValue('trandate', trandate);
		journalSalary.setValue('memo', memo);
		
		var numLines = journalSalary.getLineCount({
			sublistId : 'line'
		});
		
		log.debug('numLines '+numLines);
		
		if (numLines > 0){
			for (var i = numLines-1; i >= 0; i--){
				log.debug('remove line '+i);
				journalSalary.removeLine({
					sublistId : 'line',
					line : i
				});
			}
		}
		
		// Set Debit Line
		
		journalSalary.selectNewLine({
			sublistId : 'line'
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'account',
			value: costCenter
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'debit',
			value: amount
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'entity',
			value: employee
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_tparty',
			value: thirdParty
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_gangmandor',
			value: gangMandor
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'custcol_sim_workday_type',
			value: workdayType
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'department',
			value: department
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'class',
			value: divisi
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'location',
			value: location
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_proj',
			value: projectCode
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_paactivitycode',
			value: activityCode
		});
		
		journalSalary.commitLine({
			sublistId: 'line'
		});
		
		// Set Credit Line
		
		journalSalary.selectNewLine({
			sublistId : 'line'
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'account',
			value: 483 // 11991 Other Accounts : Salary Transit Account
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'credit',
			value: amount
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'entity',
			value: employee
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_tparty',
			value: thirdParty
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_gangmandor',
			value: gangMandor
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'custcol_sim_workday_type',
			value: workdayType
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'department',
			value: department
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'class',
			value: divisi
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'location',
			value: location
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_sim_seg_proj',
			value: projectCode
		});
		
		journalSalary.setCurrentSublistValue({
			sublistId: 'line',
			fieldId: 'cseg_paactivitycode',
			value: activityCode
		});
		
		journalSalary.commitLine({
			sublistId: 'line'
		});
		
		journalSalary.setValue('custbody_sim_related_timetrack', newRecord.id);
		
		journalSalary.save();
		
		log.debug('journalSalary id '+journalSalary.id);
		
		newRecord.setValue('custcol_sim_related_journal_salary', journalSalary.id);
	}
	
	function deleteRelJournalSalary(id){
		var journalSalary = record.load({
			type: 'customtransaction_sim_salary_transac',
			id: id,
			isDynamic: true,
		});
		
		journalSalary.setValue('custcol_sim_related_journal_salary', '');
		
		journalSalary.save();
		
		var delStatJE = record.delete({
		   type: 'customtransaction_sim_salary_transac',
		   id: id
		});
	}
	
    return {
        // beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    };
    
});