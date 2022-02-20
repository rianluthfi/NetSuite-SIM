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
				
			if (sublistName === 'item') {
				if (sublistFieldName == 'cseg_sim_seg_proj'){
					var index = curRec.getCurrentSublistIndex({sublistId: 'item'});
					var projectCode = curRec.getCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'cseg_sim_seg_proj'
					});
					
					var balanceBibit = getBalanceBibit(projectCode);
					var totalInvestment = getTotalInvesment(projectCode);
					var rateInvestment = getRateInvestment(balanceBibit, totalInvestment);
					
					curRec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'custcol_sim_balance_bibit',
						value: balanceBibit,
						ignoreFieldChange: true
					});
					
					curRec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'custcol_sim_total_investment',
						value: totalInvestment,
						ignoreFieldChange: true
					});
					
					curRec.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'rate',
						value: rateInvestment,
						ignoreFieldChange: false
					});
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
		
		function getRateInvestment(balanceBibit, totalInvestment){
			if (balanceBibit > 0){
				var rate = totalInvestment/balanceBibit;
				return rate;
			}else{
				return 0;
			}
		}
		
		function getBalanceBibit(projCode){
			var tempCount = 0;
			
			var filters = [
				search.createFilter({
					name : 'account',
					operator : search.Operator.IS,
					values : '1026'
				}),
              
              /*
               * Account S1101 Seedling | ID 1026
               * */
				
				search.createFilter({
					name : 'line.cseg_paactivitycode',
					operator : search.Operator.NONEOF,
					values : ['210', '211', '212']
				}),
				
				/*
					Filter by NONEOF this Activity Code
					Internal ID		Name
					210				1100.Pre Nursery : 1101.PN_Seedling Purchase
					211				1100.Pre Nursery : 1102.PN_Seedling Bonus
					212				1100.Pre Nursery : 1103.PN_ Seedling Rejection
				*/
				
				search.createFilter({
					name : 'line.cseg_sim_seg_proj',
					operator : search.Operator.IS,
					values : projCode
				}),
			];
			
			var columns = [
				search.createColumn({
					name : 'amount',
					summary : search.Summary.SUM
				})
			];
			
			var tempSearch = search.create({
				type : search.Type.TRANSACTION,
				filters : filters,
				columns : columns
			});
			
			tempSearch.run().each(processResult);
			
			function processResult(result){
				var count = result.getValue({
					name : 'amount',
					summary : search.Summary.SUM
				});
				
				if (count == 0)
					count = 0;
				
				tempCount = count;
				
				return true;
			}
			return tempCount;
		}
		
		function getTotalInvesment (projCode){
			var tempCount = 0;
			
			var filters = [
				search.createFilter({
					name : 'account',
					operator : search.Operator.ANYOF,
					values : ['917', '918', '919']
				}),
				/*
				 * 
				 * Account Charge Out dari Nursery/Holding ke Block
				 * ================================================
					Filter by Child account of [ID : 223] --> 11900 Plantation In Progress
					Internal ID		Number		Account Name
					917				11901		11900 Plantation In Progress : 11901 Nursery Preparation (Persiapan Nursery)
					918				11902		11900 Plantation In Progress : 11902 Pre Nursery
					919				11903		11900 Plantation In Progress : 11903 Main Nursery
                    
                    Account di bawah lebih ke Estate [Tidak jadi dipakai di filter]
                    ========================================================
					920				11904		11900 Plantation In Progress : 11904 Land Clearing (Permbersihan Lahan)
					469				11905		11900 Plantation In Progress : 11905 New Infrastructure (Infrastruktur)
					470				11906		11900 Plantation In Progress : 11906 Infrastructure Maintenance (Pemeliharaan Infrastruktur)
					921				11907		11900 Plantation In Progress : 11907 Planting (Penanaman)
					922				11908		11900 Plantation In Progress : 11908 Upkeep (Pemeliharaan)
					473				11909		11900 Plantation In Progress : 11909 Transportation
					923				11910		11900 Plantation In Progress : 11910 Harvesting (Panen)
					924				11911		11900 Plantation In Progress : 11911 Supervision (Pengawasan)
					476			11919		11900 Plantation In Progress : 11919 GC Charge In
				*/
				
				search.createFilter({
					name : 'posting',
					operator : search.Operator.IS,
					values : true
				}),
				
				search.createFilter({
					name : 'memorized',
					operator : search.Operator.IS,
					values : false
				}),
				
				search.createFilter({
					name : 'line.cseg_sim_seg_proj',
					operator : search.Operator.IS,
					values : projCode
				}),
			];
			
			var columns = [
				search.createColumn({
					name : 'amount',
					summary : search.Summary.SUM
				})
			];
			
			var tempSearch = search.create({
				type : search.Type.TRANSACTION,
				filters : filters,
				columns : columns
			});
			
			tempSearch.run().each(processResult);
			
			function processResult(result){
				var count = result.getValue({
					name : 'amount',
					summary : search.Summary.SUM
				});
				
				if (count == 0)
					count = 0;
				
				tempCount = count;
				
				return true;
			}
			return tempCount;
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