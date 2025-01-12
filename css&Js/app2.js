const authCheck = () => {
    const userUid = localStorage.getItem("uid")
    console.log("userUid", userUid)
    if (userUid) {
        window.location.replace("./index1.html")
    }

}



import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "./firebase.js";

const signupHandler = async (e) => {
    e.preventDefault();
    
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const username = document.querySelector("#username");
    const cnic = document.querySelector("#cnic");

    if (!username.value.trim() || !email.value.trim() || !password.value.trim() || !cnic.value.trim()) {
        alert("All fields are required.");
        return;
    }

    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicRegex.test(cnic.value.trim())) {
        alert("Invalid CNIC format. Use #####-#######-#.");
        return;
    }

    try {
        const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
        await setDoc(doc(db, "users", response.user.uid), {
            username: username.value,
            cnic: cnic.value,
            email: email.value,
        });

        alert("User successfully signed up!");
        window.location.href = "./index.html";
    } catch (error) {
        const errorMessages = {
            "auth/email-already-in-use": "This email is already registered.",
            "auth/weak-password": "Password should be at least 6 characters long.",
            "auth/invalid-email": "Invalid email address.",
        };
        alert(errorMessages[error.code] || "An unexpected error occurred.");
        console.log("Error:", error.message);
    }
};

document.getElementById('addStudentForm').addEventListener('submit', signupHandler);

window.signupHandler = signupHandler
window.authCheck = authCheck





// document.getElementById('addStudentForm').addEventListener('submit', function (e) async{
//     e.preventDefault();

//     const username = document.getElementById('username-input').value.trim();
//     const email = document.getElementById('email-input').value.trim();
//     const password = document.getElementById('password-input').value.trim();
//     const cnic = document.getElementById('cnic-input').value.trim();

//     const errors = [];
//     if (!username) errors.push("Name is required.");
//     if (!validateEmail(email)) errors.push("Invalid email format.");
//     if (!password || password.length < 6) errors.push("Password must be at least 6 characters long.");
//     if (!cnic.match(/^\d{5}-\d{7}-\d{1}$/)) errors.push("Invalid CNIC format. Use #####-#######-#.");

//     if (localStorage.getItem('student_' + cnic)) {
//         errors.push("Student with this CNIC already exists.");
//     }

//     if (errors.length > 0) {
//         alert(errors.join("\n"));
//         return;
//     }

//     const student = { username, email, password, cnic };
//     localStorage.setItem('student_' + cnic, JSON.stringify(student));
//     alert("Signup successful!");
//     this.reset();
// });

// Login Form Script (index.html)
// document.getElementById('addStudentForm').addEventListener('submit', function (e) {
//     e.preventDefault();

//     const email = document.getElementById('email-input').value.trim();
//     const password = document.getElementById('password-input').value.trim();

//     let studentFound = null;
//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         if (key.startsWith('student_')) {
//             const student = JSON.parse(localStorage.getItem(key));
//             if (student.email === email && student.password === password) {
//                 studentFound = student;
//                 break;
//             }
//         }
//     }

//     if (studentFound) {
//         alert(`Welcome back, ${studentFound.username}!`);
//         window.location.href = './index1.html';
//         // Redirect or show dashboard
//     } else {
//         alert("Invalid email or password.");
//     }
// });

// // Helper Functions
// function validateEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
// }
