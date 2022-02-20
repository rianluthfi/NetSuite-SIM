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
			if ('line' ==  context.sublistId) {
				var curRec = context.currentRecord
				var deptValue = curRec.getCurrentSublistValue({
					sublistId: 'line',
					fieldId: 'department'
				});
				
				var classValue = curRec.getCurrentSublistValue({
					sublistId: 'line',
					fieldId: 'class'
				});

				if (deptValue.length != '' && classValue.length != '') {
					return true;
				}
				else {
					alert('Please enter a value for Department/Class Field');
					return false;
				}
			}
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