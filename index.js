const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(function(){
    db.run("CREATE Table Classroom(Building TEXT,Room_Number NUMBER,Capacity NUMBER)");
    db.run("INSERT INTO Classroom VALUES('Packard',101,500)");
    db.run("INSERT INTO Classroom VALUES('Painter',514,10)");
    db.run("INSERT INTO Classroom VALUES('Taylor',3128,70)");
    db.run("INSERT INTO Classroom VALUES('Watson',10,30)");
    db.run("INSERT INTO Classroom VALUES('Watson',120,50)");

    db.run("CREATE Table Department(Department_Name TEXT,Building TEXT,Budget NUMBER)");
    db.run("INSERT INTO Department VALUES('Biology','Watson',90000)");
    db.run("INSERT INTO Department VALUES('Comp Sci.','Taylor',90000)");
    db.run("INSERT INTO Department VALUES('Elec. Eng.','Taylor',90000)");
    db.run("INSERT INTO Department VALUES('Finance','Painter',90000)");
    db.run("INSERT INTO Department VALUES('History','Painter',90000)");
    db.run("INSERT INTO Department VALUES('Music','Packard',90000)");
    db.run("INSERT INTO Department VALUES('Physics','Painter',90000)");

    db.each("SELECT Room_Number, Building FROM Classroom WHERE Capacity > 50",function(err,row){
        if(err)
            console.log(err);
        console.log(row);
    });


    db.all("SELECT Department_Name FROM Department WHERE Budget > 85000",function(err,row){
        if(err)
            console.log(err);
        console.log(row);
    });
    
    db.each("SELECT Department.Department_Name, SUM(Capacity) AS Sum_Capacity FROM Classroom NATURAL JOIN Department GROUP BY Department.Department_Name",function(err,row){
        if(err)
            console.log(err);
        console.log(row);
    });
    




});