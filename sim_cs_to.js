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
			var curRec = context.currentRecord;
			var sublistName = context.sublistId;
			
			if (sublistName == 'item'){
				curRec.setCurrentSublistValue({
					sublistId : sublistName,
					fieldId : 'custcol_sim_temp_qty_to', 
					value : curRec.getCurrentSublistValue({sublistId : 'item', fieldId : 'quantity'})
				});
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
            // validateField: validateField,
            validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };
    });