/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/record', 'N/search'],
    function(currentRecord, record, search) {
        function pageInit(context) {
			// var curRec = context.currentRecord;
			
			// var employee = curRec.getValue('employee');
			// var customer = curRec.getValue('customer');
			// var casetaskevent = curRec.getValue('casetaskevent');
			
			// if (employee != '' && customer != '' && casetaskevent != ''){
				// // alert('Execute Init !');
				
				// var mProject = record.load({
					// type: record.Type.JOB,
					// id: customer,
					// isDynamic: true,
				// });
				
				// var mTask = record.load({
					// type: record.Type.PROJECT_TASK,
					// id: casetaskevent,
					// isDynamic: true,
				// });
				
				// var department = mProject.getValue('custentity_sim_segment_dept');
				// var divisi = mProject.getValue('custentity_sim_segment_class');
				// var segProjectCode = mProject.getValue('cseg_sim_seg_proj');
				
				// var activityCode = mTask.getValue('cseg_paactivitycode'); 
				// var lokasi = mTask.getValue('custevent_sim_task_location');
				
				// if (curRec.getValue('department') == ''){
					// curRec.setValue('department', department);
				// }
				
				// if (curRec.getValue('class') == ''){
					// curRec.setValue('class', divisi);
				// }
				
				// if (curRec.getValue('location') == ''){
					// curRec.setValue('location', lokasi);
				// }
				
				// if (curRec.getValue('cseg_sim_seg_proj') == ''){
					// curRec.setValue('cseg_sim_seg_proj', segProjectCode);
				// }
				
				// if (curRec.getValue('cseg_paactivitycode') == ''){
					// curRec.setValue('cseg_paactivitycode', activityCode);
				// }
			// }
        }
        function saveRecord(context) {
			
        }
        function validateField(context) {
			
        }
        function fieldChanged(context) {
			var curRec = context.currentRecord;
			
			var fieldName = context.fieldId;
			
			if (fieldName == 'employee'){
				
				curRec.setValue('department', '');
				curRec.setValue('class', '');
				curRec.setValue('cseg_sim_seg_proj', '');
				
				curRec.setValue('cseg_paactivitycode', '');
			}
			
			if (fieldName == 'customer'){
				var customer = curRec.getValue('customer');
				
				if (customer != ''){
					var projectData = search.lookupFields({
						type: record.Type.JOB,
						id: customer,
						columns: ['custentity_sim_segment_dept', 'custentity_sim_segment_class', 'cseg_sim_seg_proj']
					});
					
					if (projectData.custentity_sim_segment_dept[0] != undefined)
						curRec.setValue('department', projectData.custentity_sim_segment_dept[0].value);
					if (projectData.custentity_sim_segment_class[0] != undefined)
						curRec.setValue('class', projectData.custentity_sim_segment_class[0].value);
					if (projectData.cseg_sim_seg_proj[0] != undefined)
						curRec.setValue('cseg_sim_seg_proj', projectData.cseg_sim_seg_proj[0].value);
					
					curRec.setValue('casetaskevent', '');
				}else{
					curRec.setValue('department', '');
					curRec.setValue('class', '');
					curRec.setValue('cseg_sim_seg_proj', '');
					curRec.setValue('cseg_paactivitycode', '');
					curRec.setValue('location', '');
				}
			}
			
			if (fieldName == 'casetaskevent'){
				var casetaskevent = curRec.getValue('casetaskevent');
				
				if (casetaskevent != ''){
					var mTask = record.load({
						type: record.Type.PROJECT_TASK,
						id: casetaskevent,
						isDynamic: false,
					});
					
					var activityCode = mTask.getValue('cseg_paactivitycode'); 
					var lokasi = mTask.getValue('custevent_sim_task_location');
					
					curRec.setValue('cseg_paactivitycode', activityCode);
					curRec.setValue('location', lokasi);
				}else{
					curRec.setValue('cseg_paactivitycode', '');
					curRec.setValue('location', '');
				}
			}
			
			if (fieldName == 'cseg_paactivitycode'){
				var activityCode = curRec.getValue('cseg_paactivitycode');
				
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
					
					if (activityCodeData.custrecord_sim_statis_acc[0] != undefined)
						curRec.setValue('custcol_sim_statisticalacc', activityCodeData.custrecord_sim_statis_acc[0].value);
					if (activityCodeData.custrecord_sim_actcode_uom[0] != undefined)
						curRec.setValue('custcol_sim_time_perf_uom', activityCodeData.custrecord_sim_actcode_uom[0].value);
					if (activityCodeData.custrecord_sim_std_perform != undefined)
						curRec.setValue('custcol_sim_standardperform_timetrack', activityCodeData.custrecord_sim_std_perform);
					if (activityCodeData.custrecord_sim_statis_acc2[0] != undefined)
						curRec.setValue('custcol_sim_statisticalacc2', activityCodeData.custrecord_sim_statis_acc2[0].value);
					if (activityCodeData.custrecord_sim_uom_2[0] != undefined)
						curRec.setValue('custcol_sim_time_perf_uom2', activityCodeData.custrecord_sim_uom_2[0].value);
					if (activityCodeData.custrecord_sim_cost_premi != undefined)
						curRec.setValue('custcol_sim_ratepremi_timetrack', activityCodeData.custrecord_sim_cost_premi);
				}else{
					curRec.setValue('custcol_sim_statisticalacc', '');
					curRec.setValue('custcol_sim_time_perf_uom', '');
					curRec.setValue('custcol_sim_standardperform_timetrack', '');
					curRec.setValue('custcol_sim_statisticalacc2', '');
					curRec.setValue('custcol_sim_time_perf_uom2', '');
					curRec.setValue('custcol_sim_ratepremi_timetrack', '');
				}
			}
			
			if (fieldName == 'custcol_sim_statisticalacc'){
				var statAcc = curRec.getValue('custcol_sim_statisticalacc');
				
				if (statAcc != ''){
					var mAccount = record.load({
						type: record.Type.ACCOUNT,
						id: statAcc,
						isDynamic: true,
					});
			
					var uom = mAccount.getValue('unit');
					
					curRec.setValue('custcol_sim_time_perf_uom', uom);
				}
			}
			
			if (fieldName == 'custcol_sim_statisticalacc2'){
				var statAcc = curRec.getValue('custcol_sim_statisticalacc2');
				
				if (statAcc != ''){
					var mAccount = record.load({
						type: record.Type.ACCOUNT,
						id: statAcc,
						isDynamic: true,
					});
			
					var uom = mAccount.getValue('unit');
					
					curRec.setValue('custcol_sim_time_perf_uom2', uom);
				}
			}
			
			if (fieldName == 'custcol_sim_statisticalacc3'){
				var statAcc = curRec.getValue('custcol_sim_statisticalacc3');
				
				if (statAcc != ''){
					var mAccount = record.load({
						type: record.Type.ACCOUNT,
						id: statAcc,
						isDynamic: true,
					});
			
					var uom = mAccount.getValue('unit');
					
					curRec.setValue('custcol_sim_time_perf_uom3', uom);
				}
			}
			
			if (fieldName == 'custcol_sim_statisticalacc4'){
				var statAcc = curRec.getValue('custcol_sim_statisticalacc4');
				
				if (statAcc != ''){
					var mAccount = record.load({
						type: record.Type.ACCOUNT,
						id: statAcc,
						isDynamic: true,
					});
			
					var uom = mAccount.getValue('unit');
					
					curRec.setValue('custcol_sim_time_perf_uom4', uom);
				}
			}
			
			if (fieldName == 'custcol_sim_statisticalacc5'){
				var statAcc = curRec.getValue('custcol_sim_statisticalacc5');
				
				if (statAcc != ''){
					var mAccount = record.load({
						type: record.Type.ACCOUNT,
						id: statAcc,
						isDynamic: true,
					});
			
					var uom = mAccount.getValue('unit');
					
					curRec.setValue('custcol_sim_time_perf_uom5', uom);
				}
			}
        }
        function postSourcing(context) {
			
        }
        function lineInit(context) {
			
        }
        function validateDelete(context) {

        }
        function validateInsert(context) {
			
        }
        function validateLine(context) {
			
        }
        function sublistChanged(context) {

        }
        return {
			// pageInit: pageInit,
            fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };
    });