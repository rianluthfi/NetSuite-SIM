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
			var sublistName = context.sublistId;
			
			if(fieldName == 'custbody_sim_electrical'){
				var electrical = curRec.getValue('custbody_sim_electrical');
				
				if (electrical){
					var numLines = curRec.getLineCount({
						sublistId: 'line'
					});
					
					if (numLines > 0){
						for (var i = 0; i < numLines; i++){
							var record = curRec.selectLine({
								sublistId: 'line',
								line: i
							});
							
							curRec.setCurrentSublistValue({
								sublistId: 'line',
								fieldId: 'class',
								value: 26
							});
							
							curRec.setCurrentSublistValue({
								sublistId: 'line',
								fieldId: 'cseg_paactivitycode',
								value: 817
							});
							
							curRec.commitLine({sublistId: 'line'});
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