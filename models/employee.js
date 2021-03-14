const connection = require('../config/connection');

const Employee = function(employee) {
    this.connection = connection
};

module.exports = Employee;