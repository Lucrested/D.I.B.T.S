var DataTypes = require("sequelize").DataTypes;
var _customer = require("./customer");
var _faculty = require("./faculty");
var _invoice = require("./invoice");
var _item = require("./item");
var _job = require("./job");
var _line = require("./line");
var _staff = require("./staff");
var _student = require("./student");
var _supplier = require("./supplier");

function initModels(sequelize) {
  var customer = _customer(sequelize, DataTypes);
  var faculty = _faculty(sequelize, DataTypes);
  var invoice = _invoice(sequelize, DataTypes);
  var item = _item(sequelize, DataTypes);
  var job = _job(sequelize, DataTypes);
  var line = _line(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var supplier = _supplier(sequelize, DataTypes);

  faculty.belongsTo(customer, { as: "customer", foreignKey: "customerid" });
  customer.hasOne(faculty, { as: "faculty", foreignKey: "customerid" });
  invoice.belongsTo(customer, { as: "customer", foreignKey: "customerid" });
  customer.hasMany(invoice, { as: "invoices", foreignKey: "customerid" });
  student.belongsTo(customer, { as: "customer", foreignKey: "customerid" });
  customer.hasOne(student, { as: "student", foreignKey: "customerid" });
  line.belongsTo(invoice, {
    as: "invoicenumber_invoice",
    foreignKey: "invoicenumber",
  });
  invoice.hasMany(line, { as: "lines", foreignKey: "invoicenumber" });
  line.belongsTo(item, { as: "itemcode_item", foreignKey: "itemcode" });
  item.hasMany(line, { as: "lines", foreignKey: "itemcode" });
  staff.belongsTo(job, { as: "jobcode_job", foreignKey: "jobcode" });
  job.hasMany(staff, { as: "staffs", foreignKey: "jobcode" });
  invoice.belongsTo(staff, { as: "staff", foreignKey: "staffid" });
  staff.hasMany(invoice, { as: "invoices", foreignKey: "staffid" });
  item.belongsTo(supplier, { as: "supplier", foreignKey: "supplierid" });
  supplier.hasMany(item, { as: "items", foreignKey: "supplierid" });

  return {
    Customer: customer,
    Faculty: faculty,
    Invoice: invoice,
    Item: item,
    Job: job,
    Line: line,
    Staff: staff,
    Student: student,
    Supplier: supplier,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
