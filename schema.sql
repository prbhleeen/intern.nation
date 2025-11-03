-- database and tables for intern.nation

CREATE DATABASE IF NOT EXISTS intern_nation;
USE intern_nation;

-- student table
CREATE TABLE Student (
  student_id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  department VARCHAR(50),
  year_of_study INT,
  cgpa FLOAT CHECK (cgpa BETWEEN 0 AND 10),
  resume_path VARCHAR(255)
);

-- company table
CREATE TABLE Company (
  company_id VARCHAR(10) PRIMARY KEY,
  company_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  industry_type VARCHAR(50)
);

-- admin table
CREATE TABLE Admin (
  admin_id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

-- drive table
CREATE TABLE Drive (
  drive_id VARCHAR(10) PRIMARY KEY,
  drive_date DATE NOT NULL,
  drive_location VARCHAR(100) NOT NULL,
  eligibility_criteria VARCHAR(255),
  company_id VARCHAR(10),
  FOREIGN KEY (company_id) REFERENCES Company(company_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

-- application table
CREATE TABLE Application (
  application_id VARCHAR(10) PRIMARY KEY,
  status VARCHAR(50) DEFAULT 'Applied',
  student_id VARCHAR(10),
  drive_id VARCHAR(10),
  FOREIGN KEY (student_id) REFERENCES Student(student_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (drive_id) REFERENCES Drive(drive_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- selection_result table
CREATE TABLE Selection_Result (
  student_id VARCHAR(10),
  drive_id VARCHAR(10),
  result VARCHAR(50),
  offer_letter_date DATE,
  PRIMARY KEY (student_id, drive_id),
  FOREIGN KEY (student_id) REFERENCES Student(student_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (drive_id) REFERENCES Drive(drive_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
