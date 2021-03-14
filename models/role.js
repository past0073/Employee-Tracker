const connection = require('../config/connection');

const Role = function(role) {
    this.connection = connection
};

module.exports = Role;