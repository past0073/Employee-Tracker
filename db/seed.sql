  
-- Departments
INSERT INTO department (name) VALUES ("Production");
INSERT INTO department (name) VALUES ("Community Employment");
INSERT INTO department (name) VALUES ("Admin");
INSERT INTO department (name) VALUES ("Facilities");
INSERT INTO department (name) VALUES ("Programs");

-- Roles
INSERT INTO role (title, salary, department_id) VALUES ("Work Floor Coordinator", 40000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Team Lead", 30000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Production Manager", 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Community Employment Specialist", 38000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("CE Supervisor", 42000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Accounts Payable", 39000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Receptionist", 30000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Controller", 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Facilities Manager", 50000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Case Manager", 38000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Program Services Supervisor", 40000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Program Manager", 50000, 5);

-- Employees
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Andrew", "Anderson", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Dan", "Dahl", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Gwen", "Reddig", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Amy", "Pastorius", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Ifrah", "Ayir", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("William", "Anderson", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Angela", "Forslund", null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Barbara", "Biskey", null, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Sami", "Olson", null, 8);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Troy", "Spaulding", null, 9);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Tou", "Yang", null, 10);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Caitlin", "Baker", null, 11);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Katie", "Swirtz", null, 12);