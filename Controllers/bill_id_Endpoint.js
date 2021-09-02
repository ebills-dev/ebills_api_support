const handling_id_req = (db) => (req, res) =>{
    db("bills")
        .returning("*")
        .select("id_bill")
        .then(data => res.json(data.length+1))
        .catch(error => res.json('NULL'));
}

export default handling_id_req;