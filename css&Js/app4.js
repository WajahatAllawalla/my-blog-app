import {
    signInWithEmailAndPassword,
    auth,
    getDoc,
    db,
    doc,
    collection,
    getDocs,
    updateDoc
} from "./firebase.js"


const Profiledata = document.getElementById("Profiledata")

const getdata = async () => {
    try {
        const uid = localStorage.getItem("uid")
        const data = await getDoc(doc(db, "users", uid))
        console.log(data.data());

        Profiledata.innerHTML = `<div id= "container">
                <h2 class="container">Full Name:</h2>
                <h2>${data.data().username}</h2>   
                <button class="btn" onclick="editFname()">Edit</button>

                <h2 class="container">CNIC:</h2>
                <h2>${data.data().cnic}</h2>
                <button class="btn" onclick="editLname()">Edit</button>

                <h2 class="container">Email:</h2>
                <h2>${data.data().email}</h2>
                <button class="btn" onclick="editemail()">Edit</button>`

    } catch (error) {
        console.log(error.message)
    }

}


const editFname = async () => {

    const uid = localStorage.getItem("uid")
    const newFName = prompt("Enter new First Name:");
    if (!newFName) return;

    try {
        await updateDoc(doc(db, "users", uid), {
            firstName: newFName

        });
        alert("First name updated successfully!");
        getdata()
    } catch (error) {
        console.error("Failed to update First Name:", error.message);
    }
};

const editLname = async () => {

    const uid = localStorage.getItem("uid")
    const newLName = prompt("Enter new Last Name:");
    if (!newLName) return;

    try {
        await updateDoc(doc(db, "users", uid), {
            lastName: newLName

        });
        alert("Last name updated successfully!");
        getdata()
    } catch (error) {
        console.error("Failed to update Last Name:", error.message);
    }
};

const editemail = async () => {

    const uid = localStorage.getItem("uid")
    const newemail = prompt("Enter new Last Name:");
    if (!newemail) return;

    try {
        await updateDoc(doc(db, "users", uid), {
            email: newemail

        });
        alert("Email updated successfully!");
        getdata()
    } catch (error) {
        console.error("Email update Last Name:", error.message);
    }
};

window.getdata = getdata
window.editFname = editFname
window.editLname = editLname
window.editemail = editemail