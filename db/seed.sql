  
-- Departments
INSERT INTO department (name) VALUES ("Production");
INSERT INTO department (name) VALUES ("Community Employment");
INSERT INTO department (name) VALUES ("Admin");
INSERT INTO department (name) VALUES ("Facilities");
INSERT INTO department (name) VALUES ("Programs");

-- Roles
INSERT INTO role (title, salary, department_id) VALUES ("Work Floor Coordinator", 40000, (SELECT id FROM department WHERE name = "Production"));
INSERT INTO role (title, salary, department_id) VALUES ("Team Lead", 30000, (SELECT id FROM department WHERE name = "Production"));
INSERT INTO role (title, salary, department_id) VALUES ("Production Manager", 50000, (SELECT id FROM department WHERE name = "Production"));
INSERT INTO role (title, salary, department_id) VALUES ("Community Employment Specialist", 38000, (SELECT id FROM department WHERE name = "Community Employment"));
INSERT INTO role (title, salary, department_id) VALUES ("CE Supervisor", 42000, (SELECT id FROM department WHERE name = "Community Employment"));
INSERT INTO role (title, salary, department_id) VALUES ("Accounts Payable", 39000, (SELECT id FROM department WHERE name = "Admin"));
INSERT INTO role (title, salary, department_id) VALUES ("Receptionist", 30000, (SELECT id FROM department WHERE name = "Admin"));
INSERT INTO role (title, salary, department_id) VALUES ("Controller", 70000, (SELECT id FROM department WHERE name = "Admin"));
INSERT INTO role (title, salary, department_id) VALUES ("Facilities Manager", 50000, (SELECT id FROM department WHERE name = "Facilities"));
INSERT INTO role (title, salary, department_id) VALUES ("Case Manager", 38000, (SELECT id FROM department WHERE name = "Programs"));
INSERT INTO role (title, salary, department_id) VALUES ("Program Services Supervisor", 40000, (SELECT id FROM department WHERE name = "Programs"));
INSERT INTO role (title, salary, department_id) VALUES ("Program Manager", 50000, (SELECT id FROM department WHERE name = "Programs"));

-- Employees that manage others
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Amy", "Pastorius", null, (SELECT id FROM role WHERE title = "Production Manager"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Sami", "Olson", null, (SELECT id FROM role WHERE title = "Controller"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Troy", "Spaulding", null, (SELECT id FROM role WHERE title = "Facilities Manager"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Katie", "Swirtz", null, (SELECT id FROM role WHERE title = "Program Manager"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("William", "Anderson", (SELECT id FROM role WHERE title = "Production Manager"), (SELECT id FROM role WHERE title = "CE Supervisor"));

-- Employees
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Andrew", "Anderson", (SELECT id FROM role WHERE title = "Production Manager"), (SELECT id FROM role WHERE title = "Work Floor Coordinator"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Dan", "Dahl", (SELECT id FROM role WHERE title = "Production Manager"), (SELECT id FROM role WHERE title = "Work Floor Coordinator"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Gwen", "Reddig", (SELECT id FROM role WHERE title = "Production Manager"), (SELECT id FROM role WHERE title = "Team Lead"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Ifrah", "Ayir", (SELECT id FROM role WHERE title = "CE Supervisor"), (SELECT id FROM role WHERE title = "Community Employment Specialist"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Angela", "Forslund", (SELECT id FROM role WHERE title = "Controller"), (SELECT id FROM role WHERE title = "Accounts Payable"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Barbara", "Biskey", (SELECT id FROM role WHERE title = "Controller"), (SELECT id FROM role WHERE title = "Receptionist"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Tou", "Yang", (SELECT id FROM role WHERE title = "Program Manager"), (SELECT id FROM role WHERE title = "Case Manager"));
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Caitlin", "Baker", (SELECT id FROM role WHERE title = "Program Manager"), (SELECT id FROM role WHERE title = "Program Services Supervisor"));

