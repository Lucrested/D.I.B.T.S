const { sequelize, models } = require("./config/db.js");

const {
  Customer,
  Faculty,
  Invoice,
  Item,
  Job,
  Line,
  Staff,
  Student,
  Supplier,
} = models;

async function test() {
  try {
    await sequelize.authenticate();
    // const customer = await Customer.create({
    //   customerfname: "a",
    //   customerlname: "d",
    //   customerphone: 465,
    //   customeremail: "asda",
    //   customerbalance: 4656,
    //   customerpassword: "asds",
    //   cus_type: "s",
    // });

    const customers = await Customer.findOne({
      raw: true,
      attributes: ["customerfname"],
      where: { customerid: 1 },
    });
    console.log(customers);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

test();
