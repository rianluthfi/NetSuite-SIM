/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/error', 
        'N/record', 
        'N/runtime',
        'N/search'],
/**
 * @param {email} email
 * @param {error} error
 * @param {record} record
 * @param {runtime} runtime
 * @param {search} search
 */
function(error, record, runtime, search) 
{
   
	/**
	 * Map/Reduce Script:
	 * Sample Map/Reduce script for blog post.  
	 */
	
	
    /**
     * Marks the beginning of the Map/Reduce process and generates input data.
     *
     * @typedef {Object} ObjectRef
     * @property {number} id - Internal ID of the record instance
     * @property {string} type - Record type id
     *
     * @return {Array|Object|Search|RecordRef} inputSummary
     * @since 2015.1
     */
    function getInputData() 
    {   
		var mySearch = search.create({
			type: search.Type.ACCOUNT,
			columns: ['internalid', 'custrecord_account_usd_ratereport', 'custrecord_account_usd_ratereport_abs']
		});
		
		// var myResultSet = mySearch.run();

		// var resultRange = myResultSet.getRange({
			// start: 0,
			// end: 1000
		// });
		
		return mySearch.run().getRange({
            start: 0,
            end: 1000
        });
		
		// log.debug('execute getInputData');
    }

    /**
     * Executes when the map entry point is triggered and applies to each key/value pair.
     *
     * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
     * @since 2015.1
     */
    function map(context) 
    {
		log.debug({
			title : 'Key',
			details : context.value
		});
		
		context.write({
			key: context.value,
			value: 'data'
		});
		
		log.debug('execute map');
    }
	
	function reduce(context) 
    {
		var ObjJson = JSON.parse(context.key);
		
		log.debug('Key Reduce', ObjJson);
		log.debug('execute reduce');
		var newCurrency = runtime.getCurrentScript().getParameter({
            name: 'custscript_sim_new_currency'
        });
		
		log.debug('newCurrency', newCurrency);
		
		var idAccount = parseFloat(ObjJson['id']);
		
		log.debug('idAccount', idAccount);
		var objAccount = record.load({
			type: record.Type.ACCOUNT,
			id: idAccount,
			isDynamic: true,
		});
		
		objAccount.setValue('custrecord_account_usd_ratereport', newCurrency*-1);
		objAccount.setValue('custrecord_account_usd_ratereport_abs', newCurrency);
		
		objAccount.save();
	}

    /**
     * Executes when the summarize entry point is triggered and applies to the result set.
     *
     * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
     * @since 2015.1
     */
    function summarize(summary) 
    {
		log.debug('END Map Reduce!');
    	// log.debug('Summary Time','Total Seconds: '+summary.seconds);
    	// log.debug('Summary Usage', 'Total Usage: '+summary.usage);
    	// log.debug('Summary Yields', 'Total Yields: '+summary.yields);
    	
    	// log.debug('Input Summary: ', JSON.stringify(summary.inputSummary));
    	// log.debug('Map Summary: ', JSON.stringify(summary.mapSummary));
    	// log.debug('Reduce Summary: ', JSON.stringify(summary.reduceSummary));
    	
    	// //Grab Map errors
    	// summary.mapSummary.errors.iterator().each(function(key, value) {
			// log.error(key, 'ERROR String: '+value);
			
			
			// return true;
		// });
    	
    }

    return {
        getInputData: getInputData,
        map: map,
		reduce: reduce,
        summarize: summarize
    };
    
});