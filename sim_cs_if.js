/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/record'],
    function(currentRecord, record) {
        function pageInit(context) {

        }
        function saveRecord(context) {
			var currentRecord = context.currentRecord;
			
			var numLines = currentRecord.getLineCount({
				sublistId: 'item'
			});
			
			if (numLines > 0){
				for (var i = 0; i < numLines; i++){
					var quantity = currentRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantity',
						line : i
					});
					
					var quantityremaining = currentRecord.getSublistValue({
						sublistId : 'item',
						fieldId : 'quantityremaining',
						line : i
					});
					
					if (quantityremaining != undefined){
						var record = currentRecord.selectLine({
							sublistId: 'item',
							line: i
						});
						
						currentRecord.setCurrentSublistValue({
							sublistId : 'item',
							fieldId : 'custcol_sim_temp_qtyremain',
							line : i,
							value : (quantityremaining-quantity)
						});
						
						currentRecord.commitLine({sublistId: 'item'});
					}
				} 
			}
			
			return true;
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
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            saveRecord: saveRecord
        };
    });