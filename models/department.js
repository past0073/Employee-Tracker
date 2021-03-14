const connection = require('../config/connection');

const Department = function(department) {
    this.connection = connection
};

module.exports = Department;