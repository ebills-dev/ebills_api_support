const sendingWorkList = (db) => (req, res) =>{
    db('works')
        .returning('*')
        .select('*')
    .then( data => res.json(data))
    .catch( err => res.status(400).json('Works NOT founded'));
}

export default sendingWorkList;