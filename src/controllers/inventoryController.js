const connection = require('../dbService.js')

const getInventories = async function (req, res) {
    try {
        const Inventories = await new Promise((resolve,reject)=>{
            query = "Select * from inventories";
            connection.query(query,[bagId],(err,result)=>{
              if(err) reject(new Error(err));
              resolve(result);
            })
        });
        res.status(201).send({ status: true, message: `Success`, data: Inventories });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getInventoryById = async function (req, res) {
    try {
        const bagId = req.params.inventoryId
        const Inventory = await new Promise((resolve,reject)=>{
            query = "Select * from inventories where id = ?";
            connection.query(query,[bagId],(err,result)=>{
              if(err) reject(new Error(err));
              resolve(result);
            })
        });
        res.status(201).send({ status: true, message: `Success`, data: Inventory });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getUserInventories = async function (req, res) {
    try {
        const userId = req.userId
        const Inventories = await new Promise((resolve,reject)=>{
            query = "Select id, name from inventories where owner_id = ?";
            connection.query(query,[userId],(err,result)=>{
              if(err) reject(new Error(err));
              resolve(result);
            })
        });
        res.status(201).send({ status: true, message: `Success`, data: Inventories });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


const updateInventory = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide book details' })
            return
        }

        const id = req.params.id
        const { name, address, owner_id } = requestBody;
        
        await new Promise((resolve,reject)=>{
            query = `UPDATE bags
                    SET name = ?, address = ?, owner_id = ?
                    WHERE id = ?;`;
            connection.query(query,[name, address, owner_id, id],(err,result)=>{
                if(err) reject(new Error(err));
                resolve(result);
            })
        });
        res.status(201).send({ status: true, message: `Success`});
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {
    getInventoryById,
    getInventories,
    getUserInventories,
    updateInventory
}

