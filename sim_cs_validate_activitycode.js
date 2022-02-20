/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/record'],
    function(currentRecord, record) {
        function pageInit(context) {
			
        }
        function saveRecord(context) {
			
        }
        function validateField(context) {

        }
        function fieldChanged(context) {
			var curRec = context.currentRecord;
			
			var fieldName = context.fieldId;
			
			if (fieldName == 'custrecord_sim_statis_acc'){
				var statAcc = curRec.getValue('custrecord_sim_statis_acc');
				
				var mAccount = record.load({
					type: record.Type.ACCOUNT,
					id: statAcc,
					isDynamic: true,
				});
		
				var uom = mAccount.getValue('unit');
				
				curRec.setValue('custrecord_sim_actcode_uom', uom);
			}
			
			if (fieldName == 'custrecord_sim_statis_acc2'){
				var statAcc = curRec.getValue('custrecord_sim_statis_acc2');
				
				var mAccount = record.load({
					type: record.Type.ACCOUNT,
					id: statAcc,
					isDynamic: true,
				});
		
				var uom = mAccount.getValue('unit');
				
				curRec.setValue('custrecord_sim_uom_2', uom);
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