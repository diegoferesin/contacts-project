const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatase().db().collection('contacts').find().toArray(
        (err, lists) => {
            if (err) {
                res.status(500).json({ message: err });
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists);
            }
        }
    );
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid contact id to find a contact.");
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatase().db().collection('contacts').find({ _id: userId }).toArray(
        (err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result[0]);
            }
        }
    );
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthdate: req.body.birthdate
    };
    const response = await mongodb.getDatase().db().collection('contacts').insertOne(user);
    if (response.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the user");
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid contact id to update a contact.");
    }

    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthdate: req.body.birthdate
    };
    const response = await mongodb.getDatase().db().collection('contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the user");
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid contact id to delete a contact.");
    }

    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatase().db().collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting the user");
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};