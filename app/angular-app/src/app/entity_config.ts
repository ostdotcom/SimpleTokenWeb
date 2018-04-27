export let entityConfig = {
"entity_configs" : {

    "kyc_user_details": {
        "admin_status": {
                        "values": [{"value": "all", "display_text": "All"},
                                 {"value":"un_processed_admin_status", "display_text": "Unprocessed"},
                                 {"value":"qualified_admin_status" , "display_text": "Qualified" },
                                 {"value":"denied_admin_status" , "display_text":"Denied"  } ],
                        "data_type": "array"
                    } ,
        "admin_review_status": {
                        "values": [{"value": "no", "display_text": "No Review Action"},
                                 {"value": "any", "display_text": "Any Review Action"},
                                 {"value": "data_mismatch", "display_text": "Data Mismatch"},
                                 {"value": "document_id_issue", "display_text": "Document Id Issue"},
                                 {"value": "selfie_issue", "display_text": "Selfie Image Issue"},
                                 {"value": "residency_issue", "display_text": "Proof of Residence Issue"}],
                        "data_type": "array"
                        } ,
        "cynopsis_status": {
                       "values": [
                         {"value": "all", "display_text": "All"},
                         {"value": "un_processed_cynopsis_status", "display_text": "Unprocessed"},
                         {"value": "cleared_cynopsis_status", "display_text": "Cleared"},
                         {"value": "pending_cynopsis_status", "display_text": "Pending"},
                         {"value": "approved_cynopsis_status", "display_text": "Approved"},
                         {"value": "cleared_cynopsis_status:approved_cynopsis_status", "display_text": "Cleared | Approved"},
                         {"value": "rejected_cynopsis_status", "display_text": "Rejected"}],
                         "data_type": "array"

        },

        "sort_by" :  	{
                        "values": [{"value": "desc", "display_text": "Newest"},
                                 {"value": "asc", "display_text": "Oldest"}],
                        "data_type": "array"
                    }
    }
  }
}
