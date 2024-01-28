-- Students table
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    PhoneNumber VARCHAR(15)  -- Assuming phone number for notifications
    -- Add other student-related fields as needed
);

-- Teachers table
CREATE TABLE Teachers (
    TeacherID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    PhoneNumber VARCHAR(15)  -- Assuming phone number for notifications
    -- Add other teacher-related fields as needed
);

-- Courses table
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100),
    TeacherID INT,  -- Reference to the teacher responsible for the course
    -- Add other course-related fields as needed
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID)
);

-- StudentsCourses table to represent the relationship between students and courses
CREATE TABLE StudentsCourses (
    StudentID INT,
    CourseID INT,
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- TeachersCourses table to represent the relationship between teachers and courses
CREATE TABLE TeachersCourses (
    TeacherID INT,
    CourseID INT,
    PRIMARY KEY (TeacherID, CourseID),
    FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Sessions table
CREATE TABLE Sessions (
    SessionID INT PRIMARY KEY,
    CourseID INT,
    SessionName VARCHAR(100),
    DayOfWeek VARCHAR(10),
    StartTime TIME,
    EndTime TIME,
    -- Add other session-related fields as needed
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Attendance table
CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY,
    StudentID INT,
    SessionID INT,
    AttendanceDate DATE,
    IsPresent BOOLEAN,
    -- Add other attendance-related fields as needed
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (SessionID) REFERENCES Sessions(SessionID)
);