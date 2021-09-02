import checking_password from "../utility_methods/check_password.js";

const saving_new_work = (db, base_url) => (req,res) => {

    const {work_name, measurement_unit, unit_price, password} = req.body;
    
    //! remember that this part is only for checking the values
    [work_name, measurement_unit, unit_price, password].forEach(property => {
        if (!property){
            return res.status('410').json('Registro fallido') }
    });

    //! checking if the password is correct
    if (!checking_password(password, base_url)) {
        return res.status('402').json('El registro no pudo completarse')
    }

    const values_work = {
        work_name: work_name,
        measurement_unit: measurement_unit,
        unit_price: unit_price
    }

    db.transaction(async (trx) => {
        try {
            const id_customer = await trx.insert(values_work)
                .into('works').returning('*');
            res.json("success")
            trx.commit;
        }
        catch (err) {
            trx.rollback;
            console.log(err);
            return res.status('400').json('El registro ha fallado')
        }
    });
}

export default saving_new_work;