import get_today_s_date from "../utility_methods/today_date.js";
import checking_password from "../utility_methods/check_password.js";

// import { get_today_s_date, checking_password } from "../imports.js";

const {dd, mm, yyyy} = get_today_s_date();
const today = `${yyyy}-${mm}-${dd}`;

const saving_form_data = (db, base_url) => (req,res) => {

    const {customer, company, direction, phone, city, email, 
    extra_info, password, order_data} = req.body;
    
    const obtained_values=[customer, company, direction, phone, city, email, 
    extra_info, password, order_data]
    
    // obtained_values.forEach(item => console.log(item));
    
    //! remember that this part is only for checking the values
    obtained_values.forEach(property => {
        if (!property){
            return res.status('410').json('Registro fallido') }
    });

    //! checking if the password is correct
    if (!checking_password(password, base_url)) {
        return res.status('402').json('El registro no pudo completarse')
    }
    
    const values_customer = {
        customer_name: customer,
        company_name: company,
        email: email,
        phone_number: phone,
        direction : direction ,
        city: city,
    };
    const values_bill = (id_customer) => {
        return {
            id_customer: id_customer[0],
            extra_info: extra_info,
            issue_date: today,
        }
    }

    db.transaction(async (trx) => {
        try {
            const id_customer = await trx.insert(values_customer)
                .into('customers').returning('id_customer');

            const id_bill = await trx.insert(values_bill(id_customer))
                .into('bills').returning('id_bill');     

            const fieldsToInsert = order_data.map(item => ({
                id_bill: id_bill[0],
                amount:item.amount,
                work_name: item.chosen_work }
            ));  

            const data = await trx.insert(fieldsToInsert).into('works_bills').returning("*");
            res.json("success")
            trx.commit;
        }
        catch (err) {
            trx.rollback
            console.log(err)
            return res.status('400').json('El registro ha fallado')
        }
    })
    
    






    

    // db.transaction(trx => {
	// 	trx.insert({
	// 		customer_name: customer,
    //         company_name: company,
    //         email: email,
    //         phone_number: phone,
    //         direction : direction ,
    //         city: city,
	// 	})
    //     .catch(err => console.log("\n\n\nsomething went wrong in step 0\n\n\n", err))
	// 	.into('customers')
	// 	.returning('id_customer')
    //     .catch(err => console.log("something went wrong in step 1", err))
    //     .then(id_customer => {
    //         trx.insert({
    //             id_customer: id_customer[0],
    //             extra_info: extra_info,
    //             issue_date: today,
    //         })
    //         .into('bills')
    //         .returning('id_bill')
    //         .catch(err => console.log('something went wrong in step 2'))
    //         .then(id_bill => {
    //             const fieldsToInsert = order_data.map(item => ({
    //                 id_bill: id_bill[0],
    //                 amount:item.amount,
    //                 work_name: item.chosen_work
    //             }));  
                
    //             console.log(fieldsToInsert, '\n')

    //             db.insert(fieldsToInsert)
    //                 .into('works_bills')
    //                 .returning("*")
    //                 .then(data => res.json("success"))
    //                 .catch(err => console.log("something went wrong in step 3", err))
    //         })
    //         .catch(err => console.log(err))

    //     })
    //     .then(trx.commit)
	// 	.catch(trx.rollback)
	// })
	// .catch(err => res.status(400).json('Something went wrong with registration'));
    
}
export default saving_form_data;
