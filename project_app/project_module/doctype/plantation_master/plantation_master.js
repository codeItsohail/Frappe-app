frappe.ui.form.on('Plantation Master', {
	crop_master: function(frm) {
    if (frm.doc.crop_master) {
        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype : "Crop Master",
                filters: {
                    name : frm.doc.crop_master
                }
            },
            callback: function(r) {
                if (r.message) {
                    frm.set_value('crop_name',r.message.crop_name);
            	    frm.set_value('crop_variety',r.message.crop_variety);
		            frm.set_value('maturity_period_in_days',r.message.maturity_period_in_days);
		            
		            frm.clear_table('fertilizer_calculator');
		            
		            r.message.fertilizer_suggestion.forEach(function(item) {
		                var child = frm.add_child('fertilizer_calculator');
		                child.dose = item.dose ;
		                child.days = item.days ;
		              //  child.suggested_date = 'plantation_date';
		                child.fertilizer_name = item.fertilizer_name ;
		                child.quantity = item.quantity * 3;
		                child.units_of_measure = item.units_of_measure ;
		               
		            });
		            frm.refresh_field('fertilizer_calculator')
                }
            }
        });
    }
	},
	plantation_date:function(frm){
		var dateValue = frm.doc.plantation_date
		frm.doc.fertilizer_calculator.forEach(row=>{
			var date = new Date(dateValue);
			date.setDate(date.getDate() + row.days);
// 			var newDateValue = frappe.datetime.format(date);
			row.suggested_date = date;
			console.log(row.date)
			
		})
		frm.refresh_field("fertilizer_calculator")
	}
})

