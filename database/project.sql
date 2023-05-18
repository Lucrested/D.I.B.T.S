DROP TABLE Customer CASCADE;
DROP TABLE faculty CASCADE;
DROP TABLE invoice CASCADE;
DROP TABLE line CASCADE;
DROP TABLE item CASCADE;
DROP TABLE job CASCADE;
DROP TABLE staff CASCADE;
DROP TABLE student CASCADE;
DROP TABLE supplier CASCADE;
DROP TABLE Cart CASCADE;


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

CREATE TABLE Cart (
  itemCode varchar(10) PRIMARY KEY,
  cartItemQuantity      smallint not null DEFAULT 1,
  cartItemName          varchar(35),
  cartItemPrice         decimal(8,2),
CONSTRAINT itemCodeForeignKey FOREIGN KEY (itemCode) REFERENCES Item(itemCode)
	ON UPDATE CASCADE ON DELETE CASCADE
	
);



--trigger to check customer balance when adding to cart
CREATE FUNCTION checkBalance() RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
IF (balance - NEW.cartItemQuantity*NEW.cartItemPrice) < 0 THEN RAISE EXCEPTION 'Quantity not available';
END IF;
RETURN NEW;
END;
$$;
 

CREATE TRIGGER trgr BEFORE INSERT ON
Cart FOR EACH ROW
EXECUTE FUNCTION checkBalance();


--trigger to check quantity available when adding to cart (or updating)

CREATE FUNCTION checkQuantity() RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  currentQ int;

BEGIN
  currentQ := (SELECT itemQuantity FROM Item WHERE itemCode = NEW.itemCode);
  IF currentQ < NEW.cartItemQuantity THEN RAISE EXCEPTION 'Quantity not available';
  END IF;

  RETURN NEW;
END;
$$;


CREATE TRIGGER trQuantityCheck BEFORE INSERT ON Cart 
FOR EACH ROW
EXECUTE FUNCTION checkQuantity();




--------------trigger to decrease quantity after line

CREATE FUNCTION updateQuantity() RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE Item
  SET itemQuantity = itemQuantity - NEW.lineQuantity
  WHERE itemCode = (SELECT itemCode
                        FROM Item
                        WHERE itemCode = NEW.itemCode);
  RETURN NEW;
END;
$$;


CREATE TRIGGER trLineQuantity AFTER INSERT ON Line 
FOR EACH ROW
EXECUTE FUNCTION updateQuantity();


------------trigger to add new line to invoice

CREATE FUNCTION updateInvoice() RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO Invoice VALUES (NEW.invoiceNumber, NEW.customerID, NEW.invoiceDate, NEW.staffID );

  RETURN NEW;
END;
$$;


CREATE TRIGGER trInvoice AFTER INSERT ON Line 
FOR EACH ROW
EXECUTE FUNCTION updateInvoice();


----------------- trigger to update customer balance after something added to line

CREATE FUNCTION updateCustomer() RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE Customer
  SET customerBalance = customerBalance + NEW.unitPrice * NEW.lineQuantity
  WHERE customerID = (SELECT customerID
                        FROM Invoice
                        WHERE invoiceNumber = NEW.invoiceNumber);
  RETURN NEW;
END;
$$;


CREATE TRIGGER trLineBalance AFTER INSERT ON Line 
FOR EACH ROW
EXECUTE FUNCTION updateCustomer();

---------------- view for total cart

CREATE VIEW totalCart AS
SELECT SUM(cartItemPrice * cartItemQuantity)
FROM Cart;



