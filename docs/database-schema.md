# Database Schema Design for Odisha Government School Management System

## Recommended Database: PostgreSQL

### Why PostgreSQL?

For a government school management system handling structured data with complex relationships, **PostgreSQL** is the recommended choice due to:

1. **ACID Compliance**: Ensures data integrity for critical educational records
2. **Complex Relationships**: Better suited for relational data between students, teachers, classes, etc.
3. **Security**: Robust security features required for government systems
4. **Scalability**: Can handle large datasets efficiently
5. **Open Source**: Cost-effective for government implementation
6. **Compliance**: Better for audit trails and regulatory requirements

## Database Schema Design

### 1. Core Tables

#### Districts Table
```sql
CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state VARCHAR(50) DEFAULT 'Odisha',
    officer_name VARCHAR(100),
    total_schools INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Blocks Table
```sql
CREATE TABLE blocks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    district_id INTEGER REFERENCES districts(id),
    officer_name VARCHAR(100),
    total_schools INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Schools Table
```sql
CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    district_id INTEGER REFERENCES districts(id),
    block_id INTEGER REFERENCES blocks(id),
    address TEXT,
    phone VARCHAR(15),
    email VARCHAR(100),
    established_year INTEGER,
    principal_name VARCHAR(100),
    total_students INTEGER DEFAULT 0,
    total_teachers INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. User Management Tables

#### Users Table (Base table for all users)
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(15),
    role VARCHAR(30) NOT NULL,
    school_id INTEGER REFERENCES schools(id),
    district_id INTEGER REFERENCES districts(id),
    block_id INTEGER REFERENCES blocks(id),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### User Roles Table
```sql
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    permissions JSONB,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user_roles (role_name, description) VALUES
('student', 'Student access to view own records'),
('parent', 'Parent access to view children records'),
('teacher', 'Teacher access to manage classes'),
('headmaster', 'School-level administrative access'),
('block_officer', 'Block-level monitoring access'),
('district_officer', 'District-level oversight access');
```

### 3. Academic Structure Tables

#### Academic Years Table
```sql
CREATE TABLE academic_years (
    id SERIAL PRIMARY KEY,
    year_name VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Classes Table
```sql
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(20) NOT NULL,
    class_number INTEGER NOT NULL,
    school_id INTEGER REFERENCES schools(id),
    academic_year_id INTEGER REFERENCES academic_years(id),
    class_teacher_id INTEGER REFERENCES users(id),
    section VARCHAR(5) NOT NULL,
    max_students INTEGER DEFAULT 40,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Subjects Table
```sql
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(10),
    class_id INTEGER REFERENCES classes(id),
    teacher_id INTEGER REFERENCES users(id),
    total_marks INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Student Management Tables

#### Students Table
```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    admission_number VARCHAR(20) UNIQUE NOT NULL,
    roll_number VARCHAR(10),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    category VARCHAR(20),
    religion VARCHAR(30),
    caste VARCHAR(30),
    blood_group VARCHAR(5),
    address TEXT,
    pincode VARCHAR(10),
    aadhar_number VARCHAR(12),
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    guardian_name VARCHAR(100),
    father_occupation VARCHAR(50),
    mother_occupation VARCHAR(50),
    family_income DECIMAL(10,2),
    parent_phone VARCHAR(15),
    parent_email VARCHAR(100),
    class_id INTEGER REFERENCES classes(id),
    school_id INTEGER REFERENCES schools(id),
    admission_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Student Academic Records Table
```sql
CREATE TABLE student_academic_records (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    academic_year_id INTEGER REFERENCES academic_years(id),
    class_id INTEGER REFERENCES classes(id),
    section VARCHAR(5),
    roll_number VARCHAR(10),
    promotion_status VARCHAR(20),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Teacher Management Tables

#### Teachers Table
```sql
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    qualification VARCHAR(100),
    specialization VARCHAR(100),
    experience_years INTEGER,
    date_of_joining DATE,
    designation VARCHAR(50),
    salary DECIMAL(10,2),
    school_id INTEGER REFERENCES schools(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Attendance Management Tables

#### Attendance Table
```sql
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    class_id INTEGER REFERENCES classes(id),
    attendance_date DATE NOT NULL,
    status VARCHAR(10) NOT NULL, -- Present, Absent, Late
    marked_by INTEGER REFERENCES users(id),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Teacher Attendance Table
```sql
CREATE TABLE teacher_attendance (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER REFERENCES teachers(id),
    attendance_date DATE NOT NULL,
    status VARCHAR(10) NOT NULL,
    in_time TIME,
    out_time TIME,
    marked_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Examination and Assessment Tables

#### Examinations Table
```sql
CREATE TABLE examinations (
    id SERIAL PRIMARY KEY,
    exam_name VARCHAR(100) NOT NULL,
    exam_type VARCHAR(50), -- Unit Test, Mid Term, Final
    academic_year_id INTEGER REFERENCES academic_years(id),
    start_date DATE,
    end_date DATE,
    class_id INTEGER REFERENCES classes(id),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Exam Results Table
```sql
CREATE TABLE exam_results (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    examination_id INTEGER REFERENCES examinations(id),
    subject_id INTEGER REFERENCES subjects(id),
    marks_obtained DECIMAL(5,2),
    total_marks DECIMAL(5,2) DEFAULT 100,
    grade VARCHAR(5),
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8. Communication Tables

#### Announcements Table
```sql
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    target_audience VARCHAR(50), -- all, students, parents, teachers
    school_id INTEGER REFERENCES schools(id),
    class_id INTEGER REFERENCES classes(id),
    created_by INTEGER REFERENCES users(id),
    priority VARCHAR(20) DEFAULT 'Normal',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);
```

#### Messages Table
```sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_user_id INTEGER REFERENCES users(id),
    to_user_id INTEGER REFERENCES users(id),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    message_type VARCHAR(20) DEFAULT 'General',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 9. Fee Management Tables

#### Fee Structure Table
```sql
CREATE TABLE fee_structure (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id),
    academic_year_id INTEGER REFERENCES academic_years(id),
    fee_type VARCHAR(50), -- Tuition, Library, Lab, etc.
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Fee Payments Table
```sql
CREATE TABLE fee_payments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    fee_structure_id INTEGER REFERENCES fee_structure(id),
    amount_paid DECIMAL(10,2),
    payment_date DATE,
    payment_method VARCHAR(20),
    transaction_id VARCHAR(50),
    receipt_number VARCHAR(50),
    collected_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes for Performance

```sql
-- Performance indexes
CREATE INDEX idx_students_school_class ON students(school_id, class_id);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, attendance_date);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role_school ON users(role, school_id);
CREATE INDEX idx_exam_results_student_exam ON exam_results(student_id, examination_id);
CREATE INDEX idx_messages_to_user ON messages(to_user_id, is_read);
```

## Role-Based Access Control Implementation

### Access Control Rules

1. **Students**: Can view only their own records
2. **Parents**: Can view their children's records
3. **Teachers**: Can view/edit records of students in their classes
4. **Headmaster**: Can access all school-level data
5. **Block Officer**: Can view data from all schools in their block
6. **District Officer**: Can view data from all schools in their district

### Database Views for Role-Based Access

```sql
-- View for student's own data
CREATE VIEW student_view AS
SELECT s.*, c.class_name, sc.name as school_name
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN schools sc ON s.school_id = sc.id;

-- View for teacher's class data
CREATE VIEW teacher_class_view AS
SELECT s.*, c.class_name, c.section
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN subjects sub ON sub.class_id = c.id;
```

## Security Considerations

1. **Data Encryption**: Sensitive data should be encrypted at rest
2. **Audit Logs**: All data changes should be logged
3. **Backup Strategy**: Regular automated backups
4. **Access Logging**: Log all user access attempts
5. **Data Masking**: Mask sensitive information in development environments

## Scalability Considerations

1. **Partitioning**: Partition large tables by academic year or school
2. **Read Replicas**: Use read replicas for reporting queries
3. **Connection Pooling**: Implement connection pooling for better performance
4. **Caching**: Cache frequently accessed data
5. **Archive Strategy**: Archive old academic year data
