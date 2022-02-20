/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/record', 'N/search'],
    function(currentRecord, record, search) {
        function pageInit(context) {
			
        }
        function saveRecord(context) {
			
        }
        function validateField(context) {
			var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
            var sublistFieldName = context.fieldId;
			
			if (sublistName === 'item') {
                if (sublistFieldName === 'cseg_paactivitycode' || sublistFieldName === 'cseg_sim_seg_proj') {
					var projectCodeLine = currentRecord.getCurrentSublistValue({
						sublistId : sublistName, 
						fieldId : 'cseg_sim_seg_proj'
					});
					
					var activityCodeLine = currentRecord.getCurrentSublistValue({
						sublistId : sublistName, 
						fieldId : 'cseg_paactivitycode'
					});
					
					if (projectCodeLine != '' && activityCodeLine != ''){
						
						var projectCodeData = search.lookupFields({
							type: 'customrecord_cseg_sim_seg_proj',
							id: projectCodeLine,
							columns: ['custrecord_sim_maturity']
						});
						
						var activityCodeData = search.lookupFields({
							type: 'customrecord_cseg_paactivitycode',
							id: activityCodeLine,
							columns: ['custrecord_sim_cost_cent_acc', 'custrecord_sim_cost_cent_am']
						});
						
						if (projectCodeData['custrecord_sim_maturity']){
							if (activityCodeData.custrecord_sim_cost_cent_am[0] != undefined){
								currentRecord.setCurrentSublistValue({
									sublistId 	: sublistName,
									fieldId 	: 'custcol_sim_costcenter',
									value 		: activityCodeData.custrecord_sim_cost_cent_am[0].value
								});
							}else{
								currentRecord.setCurrentSublistValue({
									sublistId 	: sublistName,
									fieldId 	: 'custcol_sim_costcenter',
									value 		: ''
								});
							}
						}else{
							if (activityCodeData.custrecord_sim_cost_cent_acc[0] != undefined){
								currentRecord.setCurrentSublistValue({
									sublistId 	: sublistName,
									fieldId 	: 'custcol_sim_costcenter',
									value 		: activityCodeData.custrecord_sim_cost_cent_acc[0].value
								});
							}else{
								currentRecord.setCurrentSublistValue({
									sublistId 	: sublistName,
									fieldId 	: 'custcol_sim_costcenter',
									value 		: ''
								});
							}
						}
					}
				}
			}
			
			return true;
        }
        function fieldChanged(context) {
			
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
			var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
			var sublistFieldName = context.fieldId;
			
            if (sublistName === 'item'){
				var projCode = currentRecord.getCurrentSublistValue({
					sublistId : sublistName, 
					fieldId : 'cseg_sim_seg_proj'
				});
				
				var actCode = currentRecord.getCurrentSublistValue({
					sublistId : sublistName, 
					fieldId : 'cseg_paactivitycode'
				});
				
				if (projCode == ''){
					alert('Project Code cannot be empty !');
					return false;
				}
				
				if (actCode == ''){
					alert('Activity Code cannot be empty !');
					return false;
				}
			}
			return true;
        }
        function sublistChanged(context) {
			
        }
		
        return {
			// pageInit: pageInit,
            // fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            validateField: validateField,
            validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };
    });