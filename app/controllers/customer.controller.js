const Customer = require('../models/customer.model.js');

// Init temp data
var customers = [
    {
        firstname: "Joe",
        lastname: "Thomas",
        age: 36
    },
    {
        firstname: "Peter",
        lastname: "Smith",
        age: 18
    },
    {
        firstname: "Lauren",
        lastname: "Taylor",
        age: 31
    },
    {
        firstname: "Mary",
        lastname: "Taylor",
        age: 24
    },
    {
        firstname: "David",
        lastname: "Moore",
        age: 25
    },
    {
        firstname: "Holly",
        lastname: "Davies",
        age: 27
    },
    {
        firstname: "Michael",
        lastname: "Brown",
        age: 45
    }
]

// **POST fake Customer
exports.createNew = (req, res) => {
    // Create a Customer
    customers.push(req.body);
    // Send a Customer to client
    console.log(customers);
    res.json(customers);
};

// **FETCH fake customers
exports.getAll = (req, res) => {
    // Send a Customers to client
    res.json(customers);
};

// **FIND a Fake Customer
exports.findOneFake = (req, res) => {
    console.log(customers[0]);
    res.json(customers[0]);
};
// **UPDATE fake Customer
exports.updateFake = (req, res) => {
    // Find customer and update it
    console.log(req.body);
    customers[0] = req.body;
    res.json(req.body);
};
// **DELETE fake Customer
exports.deleteFake = (req, res) => {
    let id = req.params.customerId;
    console.log(id);
    customers.shift(); //Remove first entry
    res.json(customers);
};

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