// Init local database. Mimicks data in a mongo DB.
// Any edits/changes will be lost when restarting the front-end.
var customers = [
    {
        _id: "1",
        firstname: "Johnny",
        lastname: "Storm",
        age: 26,
        hobbies: [
            "Playing 🏆sports",
            "Dating 😎girls",
            "Catching 🔥fire"
        ]
    },
    {
        _id: "2",
        firstname: "Sue",
        lastname: "Storm",
        age: 29,
        hobbies: [
            "Turning ✨invisible",
            "Making 👘costumes",
            "Being sassy"
        ]
    },
    {
        _id: "3",
        firstname: "Reed",
        lastname: "Richards",
        age: 47,
        hobbies: [
            "Being a 🤬dick",
            "Being super stretchy",
            "Doing ⚗️science"
        ]
    },
    {
        _id: "4",
        firstname: "Ben",
        lastname: "Grimm",
        age: 35,
        hobbies: [
            "Clobberin 💪things",
            "Flying 🛩️planes",
            "Playing 🏈football"
        ]
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
    // Need to add a unique id to this object
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