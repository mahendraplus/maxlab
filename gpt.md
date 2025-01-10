Here is the SQL script to create the required database tables and perform the given queries:

1. Create the Tables with Key Constraints

CREATE TABLE STUDENT (
    rollno INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    class VARCHAR(10),
    birthdate DATE
);

CREATE TABLE COURSE (
    courseno INT PRIMARY KEY,
    coursename VARCHAR(50) NOT NULL,
    max_marks INT NOT NULL,
    pass_marks INT NOT NULL
);

CREATE TABLE SC (
    rollno INT,
    courseno INT,
    marks INT,
    PRIMARY KEY (rollno, courseno),
    FOREIGN KEY (rollno) REFERENCES STUDENT(rollno),
    FOREIGN KEY (courseno) REFERENCES COURSE(courseno),
    CHECK (marks BETWEEN 0 AND 100)
);


---

2. Insert Rows with Substitution Variables

INSERT INTO STUDENT VALUES (&rollno, '&name', '&class', '&birthdate');
INSERT INTO COURSE VALUES (&courseno, '&coursename', &max_marks, &pass_marks);
INSERT INTO SC VALUES (&rollno, &courseno, &marks);

Example Data:

INSERT INTO STUDENT VALUES (1, 'Mahendra', '12A', '1980-05-10');
INSERT INTO STUDENT VALUES (2, 'Ashweena', '12B', '1982-07-15');
INSERT INTO COURSE VALUES (101, 'Database Management System', 100, 40);
INSERT INTO COURSE VALUES (102, 'Data Structures', 100, 35);
INSERT INTO SC VALUES (1, 101, 85);
INSERT INTO SC VALUES (2, 102, 75);


---

3. Add a Constraint for Marks Range

ALTER TABLE SC ADD CONSTRAINT chk_marks CHECK (marks BETWEEN 0 AND 100);


---

4. Display Students Taking the 'Database Management System' Course

SELECT s.*
FROM STUDENT s
JOIN SC sc ON s.rollno = sc.rollno
JOIN COURSE c ON sc.courseno = c.courseno
WHERE c.coursename = 'Database Management System';


---

5. Display the Average Marks Obtained by Each Student

SELECT s.rollno, s.name, AVG(sc.marks) AS average_marks
FROM STUDENT s
JOIN SC sc ON s.rollno = sc.rollno
GROUP BY s.rollno, s.name;


---

6. Select Courses Where Passing Marks > 30% of Average Maximum Mark

SELECT *
FROM COURSE
WHERE pass_marks > (0.3 * (SELECT AVG(max_marks) FROM COURSE));


---

7. Display Students Born in 1980 or 1982

SELECT *
FROM STUDENT
WHERE EXTRACT(YEAR FROM birthdate) IN (1980, 1982);


---

8. Create a View for Student Course Number and Marks

CREATE VIEW StudentCourseMarks AS
SELECT rollno, courseno, marks
FROM SC;


---

9. Customers from Lalbaug City of Ahmedabad and Baroda

SELECT *
FROM CUSTOMER
WHERE city = 'Lalbaug' AND (state = 'Ahmedabad' OR state = 'Baroda');


---

10. Find Customers Whose Name Starts with 'P'

SELECT *
FROM CUSTOMER
WHERE name LIKE 'P%';


---

11. Find Total, Average, Highest, and Lowest Unit Price of an Item

SELECT 
    SUM(unit_price) AS total_price,
    AVG(unit_price) AS average_price,
    MAX(unit_price) AS highest_price,
    MIN(unit_price) AS lowest_price
FROM ITEM;

Replace CUSTOMER and ITEM tables with appropriate schema definitions as per your requirement. Let me know if you need further clarification or modifications.

