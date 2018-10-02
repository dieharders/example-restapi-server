module.exports = function(app) {
 
    const customers = require('../controllers/customer.controller.js');
 
    // Create a new Customer
    app.post('/api/customers', customers.createNew); // .create
 
    // Retrieve all Customer
    app.get('/api/customers', customers.getAll); // .findAll
 
    // Retrieve a single Customer by Id
    app.get('/api/customers/:customerId', customers.findOneFake); // .findOne
 
    // Update a Customer with Id
    app.put('/api/customers', customers.updateFake); // .update
 
    // Delete a Customer with Id
    app.delete('/api/customers/:customerId', customers.deleteFake);
    //app.delete('/api/customers/:customerId', customers.delete);
}