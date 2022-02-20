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

        }
        function fieldChanged(context) {
			var curRec = context.currentRecord;
			
			var sublistName = context.sublistId;
            var sublistFieldName = context.fieldId;
				
			if (sublistName === 'line') {
				if (sublistFieldName == 'cseg_paactivitycode'){
					var projectCode = curRec.getCurrentSublistValue({
						sublistId : 'line',
						fieldId : 'cseg_sim_seg_proj'
					});
					
					var projectCodeText = curRec.getCurrentSublistText({
						sublistId : 'line',
						fieldId : 'cseg_sim_seg_proj'
					});
					
					var activityCode = curRec.getCurrentSublistValue({
						sublistId : 'line',
						fieldId : 'cseg_paactivitycode'
					});
					
					var activityCodeText = curRec.getCurrentSublistText({
						sublistId : 'line',
						fieldId : 'cseg_paactivitycode'
					});
					
					var projectCodeData = search.lookupFields({
						type: 'customrecord_cseg_sim_seg_proj',
						id: projectCode,
						columns: ['custrecord_sim_maturity']
					});
					
					var activityCodeData = search.lookupFields({
						type: 'customrecord_cseg_paactivitycode',
						id: activityCode,
						columns: ['custrecord_sim_cost_cent_acc', 'custrecord_sim_cost_cent_am']
					});
					
					log.debug('projectCodeData ', projectCodeData);
					log.debug('activityCodeData ', activityCodeData);
					
					var debit = curRec.getCurrentSublistValue({
						sublistId : 'line',
						fieldId : 'debit'
					});
					
					var account = curRec.getCurrentSublistValue({
						sublistId : 'line',
						fieldId : 'account'
					});
					
					if (debit > 0){
						if (projectCodeData['custrecord_sim_maturity']){
							if (account != activityCodeData.custrecord_sim_cost_cent_am[0].value){
								var accountAM = activityCodeData.custrecord_sim_cost_cent_am[0].value;
								
								var accText = getAccountText(accountAM);
								
								alert('Project '+projectCodeText+' on After Maturity State, So Account for this line must be '+accText);
							}
						}else{
							if (account != activityCodeData.custrecord_sim_cost_cent_acc[0].value){
								var accountBM = activityCodeData.custrecord_sim_cost_cent_acc[0].value;
								
								var accText = getAccountText(accountBM);
								
								alert('Project '+projectCodeText+' on Before Maturity State, So Account for this line must be '+accText);
							}
						}
					}
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
		
		function getAccountText(accID){
			var accountData = record.load({
				type: record.Type.ACCOUNT,
				id: accID,
				isDynamic: true,
			});
			
			log.debug('accountData', accountData);
			
			var accNumber = accountData.getValue('acctnumber');
			var accParent = accountData.getText('parent');
			var accName = accountData.getValue('acctname');
			
			var fullName = accNumber+' '+accParent.substr(6, accParent.length)+' : '+accName;
			
			return fullName;
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