/**
Date Created	: August 25th, 2020
Created By		: Rian Luthfi Gazali
Project			: Implementation PT. Spice Islands Maluku
Code Version	: 1.0
Function		: Creating Custom GL line on Stock Insurance Voucher (SIV) Transaction,
				  Logic this custom GL is to change Expense Account Item by Activity Code that declared on transaction Record,
				  
				  #Design Custom GL#
				  Account WIP					| Cost of Sales		| Department	| Class		| Location	| Activity Code		| Project Code	| Third Party
						Inventory				| Cost of Sales		| Department	| Class		| Location	| Activity Code		| Project Code	| Third Party
				  Account by Activity Code		| Custom Gl			| Department	| Class		| Location	| Activity Code		| Project Code	| Third Party
						Account WIP				| Custom GL			| Department	| Class		| Location	| Activity Code		| Project Code	| Third Party
						
Status			: In Progress
Pending Function: - Less data for flagging using (Account Before Mature) and (Account After Mature) that define on Master Activity Code
				  - Standard Classification (Department, Class and Location) cannot be set yet (Still Enhanced on NetSuite Support)
				  - There is bug standarLines disappear, but customLines still (Need More Testing)
				  
*/

function customizeGlImpact(transactionRecord, standardLines, customLines, book)
{	
	var recordId = transactionRecord.getId();
	var recordType = transactionRecord.getRecordType();
	var countLineTransaction = transactionRecord.getLineItemCount('item');	// Getting transaction line
	
	for (var i = 1; i <= countLineTransaction; i++)	{	// loop by count transaction line
	
		var item = transactionRecord.getLineItemValue('item', 'quantity', i);
		var itemActivityCode = transactionRecord.getLineItemValue('item', 'quantity', i); 
		var itemCostCenter = transactionRecord.getLineItemValue('item', 'custcol_sim_costcenter', i);
		
		// nlapiLogExecution("DEBUG", "INFO", "itemActivityCode "+itemActivityCode+" itemCostCenter "+itemCostCenter);
											
		var wipline = standardLines.getLine((i*3)-1);	// getting target base standardLines information	
		var account = wipline.getAccountId();			// get Account on target standardLines
		var amount = wipline.getDebitAmount();			// get Amount on target standardLines
		var entityId = wipline.getEntityId();			// get Entity on target standardLines
		var department = wipline.getDepartmentId();		// get Department on target standardLines
		var divisi = wipline.getClassId();				// get Class on target standardLines
		var lokasi = wipline.getLocationId();			// get Location on target standardLines
		var projectCode = wipline.getSegmentValueId("cseg_sim_seg_proj");		// get projectCode on target standardLines
		var activityCode = wipline.getSegmentValueId("cseg_paactivitycode");	// get activityCode on target standardLines
		var thirdParty = wipline.getSegmentValueId("cseg_sim_seg_tparty");		// get thirdParty on target standardLines
		
		var costCenter = parseInt(transactionRecord.getLineItemValue('item', 'custcol_sim_costcenter', i)); // Getting CostCenter from transaction line
		
		nlapiLogExecution("DEBUG", "costCenter Value on item "+costCenter);
		
		/**
		// For Testing Data Log
		nlapiLogExecution("DEBUG", "INFO",	' | account '+account+' type '+typeof account+
											' | accBeforeMature '+accBeforeMature+' type '+typeof accBeforeMature+
											' | accAfterMature '+accAfterMature+' type '+typeof accAfterMature+
											' | amount '+amount+' type '+typeof amount+
											' | entityId '+entityId+' type '+typeof entityId+
											' | department '+department+' type '+typeof department+
											' | divisi '+divisi+' type '+typeof divisi+
											' | lokasi '+lokasi+' type '+typeof lokasi+
											' | projectCode '+projectCode+' type '+typeof projectCode+
											' | activityCode '+activityCode+' type '+typeof activityCode+
											' | thirdParty '+thirdParty+' type '+typeof thirdParty);
		*/
		
		
		/**
		-------------------------------------------------------------------------------
		Code below for logic for creating this custom GL (Define Debit and Credit Line)
		-------------------------------------------------------------------------------
		*/
		
		if (costCenter == ''){
			nlapiCreateError('Error Cost Center', 'Cannnot Find Cost Centre, please check Custom Form and make sure Cost Center Column available', suppressNotification)
		}else{
			nlapiLogExecution("DEBUG", "costCenter Value on item GOOD "+costCenter);
		}
		// Execute Line when amoun > 0 / There is COGS Value
		if (amount > 0){
			// Set Debit Line on Custom GL									
			var newLine = customLines.addNewLine();		// Define newLine on customLines
			newLine.setAccountId(costCenter); 			// This account from costCenter (Before/After Mature define on client script for validation)
			newLine.setDebitAmount(amount);				// Set Amount on customLines
			newLine.setMemo("Custom GL SIM");			// Set Memo on customLines
			newLine.setEntityId(entityId);				// Set Entity on customLines		
			newLine.setDepartmentId(department);		// Set Department on customLines	--> Still Enhanced on NetSuite Support
			newLine.setClassId(divisi);					// Set Class on customLines			--> Still Enhanced on NetSuite Support
			newLine.setLocationId(lokasi);				// Set Location on customLines		--> Still Enhanced on NetSuite Support
			newLine.setSegmentValueId('cseg_paactivitycode', activityCode);	// Set activityCode on customLines
			newLine.setSegmentValueId('cseg_sim_seg_proj', projectCode);	// Set projectCode on customLines
			newLine.setSegmentValueId('cseg_sim_seg_tparty', thirdParty);	// Set thirdParty on customLines
			
			// Set Credit Line on Custom GL										
			var newLine = customLines.addNewLine();		// Define newLine on customLines
			newLine.setAccountId(account); 				// This account from standardLines
			newLine.setCreditAmount(amount);			// Set Amount on customLines
			newLine.setMemo("Custom GL SIM");			// Set Memo on customLines
			newLine.setEntityId(entityId);				// Set Entity on customLines
			newLine.setDepartmentId(department);		// Set Department on customLines	--> Still Enhanced on NetSuite Support
			newLine.setClassId(divisi);					// Set Class on customLines			--> Still Enhanced on NetSuite Support
			newLine.setLocationId(lokasi);				// Set Location on customLines		--> Still Enhanced on NetSuite Support
			newLine.setSegmentValueId('cseg_paactivitycode', activityCode);	// Set activityCode on customLines
			newLine.setSegmentValueId('cseg_sim_seg_proj', projectCode);	// Set projectCode on customLines
			newLine.setSegmentValueId('cseg_sim_seg_tparty', thirdParty);	// Set thirdParty on customLines
		}else{
			nlapiLogExecution("DEBUG", "No COGS Value on item "+item+"|RecID "+recordId+"|RecType "+recordType+"|Loc "+lokasi);
		}
	}
}
/**
	Revision Note !
	Date	: 15 Oct 2020
	1. Validation for Cost Center Before/After Mature on Client Script
	2. Cost Center Just take it from Cost Center Line on Transaction
*/