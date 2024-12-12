document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const studentTable = document.getElementById("student-table").getElementsByTagName("tbody")[0]; // Find the tbody element
    const submitButton = document.getElementById("submit-button");
    let currentEditIndex = null;

    // Load students from Local Storage
    loadStudents();

    // Form submission to add new or update student data
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const id = document.getElementById("id").value;
        const email = document.getElementById("email").value;
        const contact = document.getElementById("contact").value;

        const studentData = { name, id, email, contact }; // Property Value Shorthand

        if (currentEditIndex !== null) {
            // Update student
            updateStudent(currentEditIndex, studentData);
        } else {
            // Add new student
            addStudent(studentData);
        }

        form.reset(); // Reset the form input values after update or add functionality

        currentEditIndex = null; 
        submitButton.textContent = "Add";
    });

    // Add student function
    function addStudent(student) {
        const students = getStudentsFromLocalStorage();
        students.push(student);
        saveStudentsToLocalStorage(students);
        loadStudents();
    }

    // Update student function
    function updateStudent(index, student) {
        const students = getStudentsFromLocalStorage();
        students[index] = student; // Find the Editable student
        saveStudentsToLocalStorage(students);
        loadStudents();
    }

    // Load all students into the table
    function loadStudents() {
        const students = getStudentsFromLocalStorage();
        studentTable.innerHTML = ""; // Clear existing rows

        students.forEach((student, index) => {
            const row = studentTable.insertRow();

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;

            // Attach event listeners to buttons
            const editButton = row.querySelector(".edit-btn");
            const deleteButton = row.querySelector(".delete-btn");

            editButton.addEventListener("click", () => editStudent(index));
            deleteButton.addEventListener("click", () => deleteStudent(index));
        });
    }

    // Edit student function
    function editStudent(index) {
        const students = getStudentsFromLocalStorage();
        const student = students[index];

        document.getElementById("name").value = student.name;
        document.getElementById("id").value = student.id;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        currentEditIndex = index;
        submitButton.textContent = "Update";
    }

    // Delete student function
    function deleteStudent(index) {
        const students = getStudentsFromLocalStorage();
        students.splice(index, 1);
        saveStudentsToLocalStorage(students);
        loadStudents();
    }

    // Get students from local storage
    function getStudentsFromLocalStorage() {
        const students = localStorage.getItem("students");
        return students ? JSON.parse(students) : [];
    }

    // Save students to local storage
    function saveStudentsToLocalStorage(students) {
        localStorage.setItem("students", JSON.stringify(students));
    }
});
