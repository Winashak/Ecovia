const { validator } = require('../utils')
const connection = require('../dbService.js')

const createBag = async function (req, res) {
    try {

        const requestBody = req.body;

        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide book details' })
            return
        }

        const { size, weight, flap_color, inventory_id, state } = requestBody;

        if (!validator.isValidBag(size, weight, flap_color, inventory_id, state)) {
            res.status(400).send({ status: false, message: 'Please enter a valid book' })
            return
        }

        await new Promise((resolve,reject)=>{
            query = "INSERT INTO bags (size,weight,flap_color,inventory_id,state) VALUES (?,?,?,?)";
            connection.query(query,[size, weight, flap_color, inventory_id, state],(err,result)=>{
              if(err) reject(new Error(err));
              resolve(result);
            })
        });
          
        res.status(201).send({ status: true, message: `Success` });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


const getBagById = async function (req, res) {
    try {
        const bagId = req.params.bagId
        const Bag = await new Promise((resolve,reject)=>{
            query = "Select * from bogs where id = ?";
            connection.query(query,[bagId],(err,result)=>{
              if(err) reject(new Error(err));
              resolve(result);
            })
        });
        res.status(201).send({ status: true, message: `Success`, data: Bag });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


const allInventoryBags = async function (req, res) {
    try {
        const inventoryId = req.params.inventoryId
        const allBags = await new Promise((resolve,reject)=>{
            query = "Select * from bags where inventory_id = ?";
            connection.query(query,[inventoryId],(err,result)=>{
                if(err) reject(new Error(err));
                resolve(result);
            })
        });
        res.status(201).send({ status: true, message: `Success`, data: allBags });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const allUserBags = async function (req, res) {
    try {
        const userId = req.userId
        const allBags = await new Promise((resolve,reject)=>{
            query = "Select * from bags inner join inventories on bags.inventories_id = inventories.id where inventory.owner_id = ?";
            connection.query(query,[userId],(err,result)=>{
                if(err) reject(new Error(err));
                resolve(result);
            })
        });
        res.status(201).send({ status: true, message: `Success`, data: allBags });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const updateBag = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!validator.isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide book details' })
            return
        }

        const id = req.params.id;
        const { size, weight, flap_color, inventory_id, state } = requestBody;

        if (!validator.isValidBag(size, weight, flap_color, inventory_id, state)) {
            res.status(400).send({ status: false, message: 'Please enter a valid book' })
            return
        }
        
        await new Promise((resolve,reject)=>{
            query = `UPDATE bags
                    SET size = ?, weight = ?, flap_color = ?, inventory_id = ?, state = ?
                    WHERE id = ?;`;
            connection.query(query,[size, weight, flap_color, inventory_id, state, id],(err,result)=>{
                if(err) reject(new Error(err));
                resolve(result);
            })
        });
        res.status(201).send({ status: true, message: `Success`, data: allBags });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const deleteBagByID = async function (req, res) {
    try {
        const bagId = req.params.bagId
        const Bag = await new Promise((resolve,reject)=>{
            query = "Select uuid from bags where id = ?";
            connection.query(query,[bagId],(err,result)=>{
              if(err) reject(new Error(err));
              resolve(result);
            })
        });
        if(Bag.length==0)
        {
            res.status(201).send({ status: false, message: `Sorry but bag does not exist` });
        }
        else
        {
            await new Promise((resolve,reject)=>{
                query = "Delete from bags where id = ?";
                connection.query(query,[bagId],(err,result)=>{
                  if(err) reject(new Error(err));
                  resolve(result);
                })
            });
            res.status(201).send({ status: true, message: `Success` });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {
    createBag,
    allInventoryBags,
    getBagById,
    allUserBags,
    updateBag,
    deleteBagByID,
}

