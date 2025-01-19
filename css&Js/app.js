import {  auth, db, doc, getDoc, signInWithEmailAndPassword } from "./firebase.js";

const authCheck = () => {
    const userUid = localStorage.getItem("uid");
    if (userUid) {
        window.location.replace("./index1.html");
    }
};

const loginHandler = async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const loginButton = document.querySelector("#loginButton");

    // Basic validation
    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.value.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    loginButton.innerText = "Logging in...";
    loginButton.disabled = true;

    try {
        const response = await signInWithEmailAndPassword(auth, email.value, password.value);

        // Save user UID to local storage
        localStorage.setItem("uid", response.user.uid);

        // Redirect to dashboard
        window.location.replace("./index1.html");
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            alert("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
            alert("Incorrect password. Please try again.");
        } else {
            alert(`Error: ${error.message}`);
        }
    } finally {
        loginButton.innerText = "Login";
        loginButton.disabled = false;
    }
};

// Attach event listener to the form
document.getElementById("addStudentForm").addEventListener("submit", loginHandler);
window.loginHandler = loginHandler
window.authCheck = authCheck