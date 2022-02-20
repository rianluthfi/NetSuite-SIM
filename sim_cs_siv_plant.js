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
			var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
            var sublistFieldName = context.fieldId;
				
			if (sublistName === 'item') {	
				if (sublistFieldName == 'quantity'){
					currentRecord.setCurrentSublistValue({
						sublistId 	: sublistName,
						fieldId 	: 'amount',
						value 		: 0
					});
				}
			}
        }
        function postSourcing(context) {
			var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
            var sublistFieldName = context.fieldId;
			
			if (sublistName === 'item' && sublistFieldName === 'item'){
				
				var currIndex = currentRecord.getCurrentSublistIndex({
					sublistId: 'item'
				});
				
				if (currIndex == 0){
					if (currentRecord.getValue('location') != '' && currentRecord.getCurrentSublistValue({sublistId : sublistName, fieldId : 'location'}) == ''){
						currentRecord.setCurrentSublistValue({
							sublistId 	: sublistName,
							fieldId 	: 'location',
							value 		:currentRecord.getValue('location')
						});
					}
					if (currentRecord.getValue('cseg_sim_seg_proj') != '' && currentRecord.getCurrentSublistValue({sublistId : sublistName, fieldId : 'cseg_sim_seg_proj'}) == ''){
						currentRecord.setCurrentSublistValue({
							sublistId 	: sublistName,
							fieldId 	: 'cseg_sim_seg_proj',
							value 		:currentRecord.getValue('cseg_sim_seg_proj')
						});
					}
					if (currentRecord.getValue('cseg_paactivitycode') != '' && currentRecord.getCurrentSublistValue({sublistId : sublistName, fieldId : 'cseg_paactivitycode'}) == ''){
						currentRecord.setCurrentSublistValue({
							sublistId 	: sublistName,
							fieldId 	: 'cseg_paactivitycode',
							value 		:currentRecord.getValue('cseg_paactivitycode')
						});
					}
				}
				
				currentRecord.setCurrentSublistValue({
					sublistId 	: sublistName,
					fieldId 	: 'amount',
					value 		: 0
				});
				
				if (currentRecord.getValue('department') != ''){
					currentRecord.setCurrentSublistValue({
						sublistId 	: sublistName,
						fieldId 	: 'department',
						value 		:currentRecord.getValue('department')
					});
				}
				
				if (currentRecord.getValue('class') != ''){
					currentRecord.setCurrentSublistValue({
						sublistId 	: sublistName,
						fieldId 	: 'class',
						value 		:currentRecord.getValue('class')
					});
				}
				
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
						}
					}else{
						if (activityCodeData.custrecord_sim_cost_cent_acc[0] != undefined){
							currentRecord.setCurrentSublistValue({
								sublistId 	: sublistName,
								fieldId 	: 'custcol_sim_costcenter',
								value 		: activityCodeData.custrecord_sim_cost_cent_acc[0].value
							});
						}
					}
				}
			}
        }
        function lineInit(context) {
			var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
            var sublistFieldName = context.fieldId;
			
			if (currentRecord.getValue('department') != '' && currentRecord.getCurrentSublistValue({sublistId : sublistName, fieldId : 'department'}) == ''){
				currentRecord.setCurrentSublistValue({
					sublistId 	: sublistName,
					fieldId 	: 'department',
					value 		:currentRecord.getValue('department')
				});
			}
			if (currentRecord.getValue('location') != '' && currentRecord.getCurrentSublistValue({sublistId : sublistName, fieldId : 'location'}) == ''){
				currentRecord.setCurrentSublistValue({
					sublistId 	: sublistName,
					fieldId 	: 'location',
					value 		:currentRecord.getValue('location')
				});
			}
			if (currentRecord.getValue('class') != '' && currentRecord.getCurrentSublistValue({sublistId : sublistName, fieldId : 'class'}) == ''){
				currentRecord.setCurrentSublistValue({
					sublistId 	: sublistName,
					fieldId 	: 'class',
					value 		:currentRecord.getValue('class')
				});
			}
			if (currentRecord.getValue('cseg_sim_seg_proj') != '' && currentRecord.getCurrentSublistValue({sublistId : sublistName, fieldId : 'cseg_sim_seg_proj'}) == ''){
				currentRecord.setCurrentSublistValue({
					sublistId 	: sublistName,
					fieldId 	: 'cseg_sim_seg_proj',
					value 		:currentRecord.getValue('cseg_sim_seg_proj')
				});
			}
			if (currentRecord.getValue('cseg_paactivitycode') != '' && currentRecord.getCurrentSublistValue({sublistId : sublistName, fieldId : 'cseg_paactivitycode'}) == ''){
				currentRecord.setCurrentSublistValue({
					sublistId 	: sublistName,
					fieldId 	: 'cseg_paactivitycode',
					value 		:currentRecord.getValue('cseg_paactivitycode')
				});
			}
			
			// try {
                // /** this will disable the amount for existing line */
                // var currentRecord = context.currentRecord;
                // var itemCount = currentRecord.getLineCount('item');
                // var sublistName = context.sublistId;
                // var line = currentRecord.getCurrentSublistIndex({ sublistId: 'item' });
                // if (itemCount > line) {
                    // var theField = currentRecord.getSublistField({
                        // sublistId: sublistName,
                        // fieldId: 'custcol_sim_costcenter',
                        // line: line
                    // });
                    // theField.isDisabled = true;
                // }
                // /** this will hide the amount label for the new line : inspect the tag ID input#amount_formattedValue*/
                // // if (!document.getElementById('hidden-amount-style')) {
                    // // var css = 'input#amount_formattedValue { display: none; }',
                        // // head = document.getElementsByTagName('head')[0],
                        // // style = document.createElement('style');
                    // // head.appendChild(style);
                    // // style.type = 'text/css';
                    // // style.id = 'hidden-amount-style';
                    // // style.appendChild(document.createTextNode(css));
                // // }
            // } catch (e) {
                // console.error('🛑 lineInit', JSON.stringify(e, null, 4));
            // }
        }
        function validateDelete(context) {

        }
        function validateInsert(context) {
			
        }
        function validateLine(context) {
			// var currentRecord = context.currentRecord;
            // var sublistName = context.sublistId;
			// var sublistFieldName = context.fieldId;
            // if (sublistName === 'item'){
				// var estCost = currentRecord.getCurrentSublistValue({
					// sublistId : sublistName, 
					// fieldId : 'costestimate'
				// });
				
				// if (estCost == 0 || estCost == ''){
					// if (estCost == '')
						// estCost = 0;
					// var item = currentRecord.getCurrentSublistText({
						// sublistId : sublistName, 
						// fieldId : 'item'
					// });
					// var location = currentRecord.getCurrentSublistText({
						// sublistId : sublistName, 
						// fieldId : 'location'
					// });
					// alert(item+' on Location '+location+' have '+estCost+' value !, cannot submit Item with cost value 0 !');
					// return false;
				// }
			// }
			// return true;
        }
        function sublistChanged(context) {
			
        }
		
        return {
			// pageInit: pageInit,
            fieldChanged: fieldChanged,
            postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            lineInit: lineInit,
            validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };
    });