/**  
*@NApiVersion 2.x  
*@NScriptType Suitelet  
*/ 


define(['N/ui/serverWidget', 'N/search', 'N/record', 'N/task'],
	function(ui, search, record, task) {  
		function onRequest(context) { 
			if (context.request.method === 'GET') {
				var form = ui.createForm({
					title: 'Update USD Currency'
				});

				var subject = form.addField({
					id: 'custpage_new_currency',     
					type: ui.FieldType.CURRENCY,    
					label: 'New Currency Value'    
				});

                form.addSubmitButton({ 
					label: 'Submit'  
				});

				context.response.writePage(form);        

			} else {
				var request = context.request;  
				var newCurrency = request.parameters.custpage_new_currency;
				
				log.debug('newCurrency', newCurrency);
				
				var mrTask = task.create({
					taskType: task.TaskType.MAP_REDUCE,
					scriptId: 'customscript_sim_mr_upd_new_currency',
					deploymentId: 'customdeploy_sim_mr_upd_new_currency'
				}); 
				
				mrTask.params = {'custscript_sim_new_currency': newCurrency};
				
				var mrTaskId = mrTask.submit();
				
				var res = task.checkStatus({
					taskId: mrTaskId
				});
				log.debug('Initial status: ' + res.status);

				// log.debug({ 
					// title: 'newCurrency',  
					// details: 'newCurrency ' +newCurrency     
				// }); 

				// var mySearch = search.create({
					// type: search.Type.ACCOUNT,
					// columns: ['internalid', 'custrecord_account_usd_ratereport', 'custrecord_account_usd_ratereport_abs']
				// });
				
				// var myResultSet = mySearch.run();

				// var resultRange = myResultSet.getRange({
					// start: 0,
					// end: 1000
				// });

				// for (var i = 0; i < resultRange.length; i++) {
					// // log.debug('result',resultRange[i]);
					// log.debug('account', resultRange[i]['id']);
					
					// var objAccount = record.load({
						// type: record.Type.ACCOUNT,
						// id: resultRange[i]['id'],
						// isDynamic: true,
					// });
					
					// objAccount.setValue('custrecord_account_usd_ratereport', newCurrency*-1);
					// objAccount.setValue('custrecord_account_usd_ratereport_abs', newCurrency);
					
					// objAccount.save();
					
				// }  
			}
		}			

	return { 
		onRequest: onRequest 
	};
});     