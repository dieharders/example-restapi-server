const Customer = require('../models/customer.model.js');

// Init local database. Mimicks a mongo setup.
// Any edits/changes will be lost when restarting the front-end.
var customers = [
    {
        _id: "1",
        firstname: "Joe",
        lastname: "Thomas",
        age: 36
    },
    {
        _id: "2",
        firstname: "Peter",
        lastname: "Smith",
        age: 18
    },
    {
        _id: "3",
        firstname: "Lauren",
        lastname: "Taylor",
        age: 31
    },
    {
        _id: "4",
        firstname: "Mary",
        lastname: "Taylor",
        age: 24
    },
    {
        _id: "5",
        firstname: "David",
        lastname: "Moore",
        age: 25
    },
    {
        _id: "6",
        firstname: "Holly",
        lastname: "Davies",
        age: 27
    },
    {
        _id: "7",
        firstname: "Michael",
        lastname: "Brown",
        age: 45
    }
]

//** Functions for local DB **//
//
// Find index of customer by their _id
function findCustomerIndex(id) {
    let index = customers.findIndex(function(item, i){
        return item._id === id; // Check id's and return object's index in array
    });
    return index;
}
// POST a Customer //
exports.create = (req, res) => {
    // Need to add a unique id to this object (Auto added by MongoDB, etc)
    let newObj = req.body;
    let randNum = Math.round(100000*Math.random());
    newObj._id = randNum.toString();
    // Add a new Customer to local DB
    customers.push(newObj);
    // Send updated Customer list to client
    res.json(customers);
};
// FETCH a customers
exports.findAll = (req, res) => {
    // Send Customers list to client
    res.json(customers);
};
// FIND a Customer
exports.findOne = (req, res) => {
    let id = req.params.customerId;
    let index = findCustomerIndex(id);
    res.json(customers[index]);
};
// UPDATE a Customer
exports.update = (req, res) => {
    // Find customer and update it
    let id = req.body._id;
    let index = findCustomerIndex(id);
    // Edit local db with new customer
    customers[index] = req.body;
    // Send new customer to client
    res.json(req.body);
};
// DELETE a Customer
exports.delete = (req, res) => {
    let id = req.params.customerId;
    let index = findCustomerIndex(id);
    // Delete customer from array at position 'index'
    customers.splice(index, 1);
    // Send updated customer data
    res.json(customers);
};

//** Functions for MongoDB **//
/*
//
// POST a Customer
exports.create = (req, res) => {
    // Create a Customer
    const customer = new Customer(req.body);

    // Save a Customer in the MongoDB
    customer.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({
            msg: err.message
        });
    });
};
// FETCH all Customers
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.json(customers);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};
// FIND a Customer
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });            
        }
        res.json(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).json({
            msg: "Error retrieving Customer with id " + req.params.customerId
        });
    });
};
// UPDATE a Customer
exports.update = (req, res) => {
    // Find customer and update it
    Customer.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });
        }
        res.json(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).json({
            msg: "Error updating customer with id " + req.params.customerId
        });
    });
};
// DELETE a Customer
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });
        }
        res.json({msg: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).json({
            msg: "Could not delete customer with id " + req.params.customerId
        });
    });
};
*/