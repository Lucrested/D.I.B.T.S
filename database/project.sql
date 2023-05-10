DROP TABLE Customer CASCADE;
DROP TABLE faculty CASCADE;
DROP TABLE invoice CASCADE;
DROP TABLE line CASCADE;
DROP TABLE item CASCADE;
DROP TABLE job CASCADE;
DROP TABLE staff CASCADE;
DROP TABLE student CASCADE;
DROP TABLE supplier CASCADE;


CREATE TABLE Customer (
 customerID  int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 customerFname      varchar(15) not null,
 customerLname     varchar(15) not null,
 customerPhone     char(8) not null,
 customerEmail		varchar(20) not null,
 customerBalance       decimal(8, 2) not null DEFAULT 0,
 customerPassword		varchar(30) not null,
 cus_Type			char(1) not null
);

CREATE TABLE Supplier (
 supplierID    int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 supplierName          varchar(35) not null,
 contactPerson 			varchar(15) not null,
 supplierNumber         char(8) not null
);


CREATE TABLE Item (
 itemCode           varchar(10) PRIMARY KEY,
 itemDescription           varchar(35) not null,
 itemName           varchar(35) not null,
 itemPrice                 decimal(8, 2),
 itemQuantity        smallint not null,
 supplierID            int,

 CONSTRAINT supplies FOREIGN KEY (supplierID) REFERENCES Supplier(supplierID)
                      ON UPDATE CASCADE ON DELETE SET NULL
);


CREATE TABLE Job (
 jobCode           varchar(10) PRIMARY KEY,
 jobName           varchar(35) not null,
 hoursPay          decimal(8, 2)
);

CREATE TABLE Staff(
 staffID  int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 staffFname      varchar(15) not null,
 staffLname     varchar(15) not null,
 staffPhone     char(8) not null,
 staffEmail		varchar(20) not null,
 staffDOB		char(8) not null,
 staffPassword		varchar(30) not null,
 jobCode varchar,
	
 CONSTRAINT staff FOREIGN KEY (jobCode) REFERENCES Job(jobCode)
	ON UPDATE CASCADE ON DELETE SET NULL

);


CREATE TABLE Invoice (
 invoiceNumber int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 customerID  int not null,
 invoiceDate   date not null,
 staffID		int not null,
 CONSTRAINT generates FOREIGN KEY (customerID) REFERENCES Customer(customerID)
                       ON UPDATE CASCADE ON DELETE CASCADE,
 CONSTRAINT generate FOREIGN KEY (staffID) REFERENCES Staff(staffID)
                       ON UPDATE CASCADE ON DELETE CASCADE
);

-------------

CREATE TABLE Line (
 invoiceNumber int,
 lineNumber    smallint,
 itemCode   varchar(10) not null,
 lineQuantity      smallint not null DEFAULT 1,
 unitPrice     decimal(8, 2) not null,
 PRIMARY KEY (invoiceNumber, lineNumber),
 UNIQUE(invoiceNumber, itemCode),
 CONSTRAINT contains FOREIGN KEY (invoiceNumber) REFERENCES Invoice(invoiceNumber)
                      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT is_found_in FOREIGN KEY (itemCode) REFERENCES Item(itemCode)
                          ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE Faculty (
  customerID int PRIMARY KEY REFERENCES customer(customerID),
  department VARCHAR(50)
);

CREATE TABLE Student (    
  customerID int PRIMARY KEY REFERENCES customer(customerID),
  major VARCHAR(50)
);


