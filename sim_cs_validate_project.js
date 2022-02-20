/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/record', 'N/search'],
    function(currentRecord, record, search) {
        function pageInit(context) {
			
			// PR untuk cek type data parent, pastikan type nya JOB
			var curRec = context.currentRecord;
			
			var parentProj = curRec.getValue('parent');
			var parentProjTxt = curRec.getText('parent');
			
			// var recordType = search.lookupFields({
				 // type: search.Type.ENTITY,
				 // id: parentProj,
				 // columns: 'type'
			// });
			
			// alert('type parent '+recordType['type'][0].value);
			
			var n = parentProjTxt.search(':');
			
			if (n > 0){
				if (parentProj != ''){
					var mProject = record.load({
						type: record.Type.JOB,
						id: parentProj,
						isDynamic: true,
					});
					
					var projectCode = mProject.getValue('cseg_sim_seg_proj');
					var dep = mProject.getValue('custentity_sim_segment_dept');
					
					if (projectCode != '' && dep != ''){
						if (curRec.getValue('custentity_sim_segment_dept') == '')
							curRec.setValue('custentity_sim_segment_dept', dep);
							
						if (curRec.getValue('cseg_sim_seg_proj') == '')
							curRec.setValue('cseg_sim_seg_proj', projectCode);
					}
				}
			}
				
			
        }
        function saveRecord(context) {
			
        }
        function validateField(context) {

        }
        function fieldChanged(context) {
			var curRec = context.currentRecord;
			
			var fieldName = context.fieldId;
			
			if (fieldName == 'parent'){
				var parentProj = curRec.getValue('parent');
				var parentProjTxt = curRec.getText('parent');
				
				var n = parentProjTxt.search(':');
			
				if (n > 0){
					var mProject = record.load({
						type: record.Type.JOB,
						id: parentProj,
						isDynamic: true,
					});
					
					var projectCode = mProject.getValue('cseg_sim_seg_proj');
					var dep = mProject.getValue('custentity_sim_segment_dept');
					
					curRec.setValue('cseg_sim_seg_proj', projectCode);
					curRec.setValue('custentity_sim_segment_dept', dep);
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
			pageInit: pageInit,
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