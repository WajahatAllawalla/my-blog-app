import {
  getDoc,
  db,
  doc,
  updateDoc,
} from "./firebase.js";

const Profiledata = document.getElementById("Profiledata");

const getdata = async () => {
  try {
    const userUid = localStorage.getItem("uid");
    if (!userUid) throw new Error("User is not logged in.");

    const userDoc = await getDoc(doc(db, "users", userUid));
    if (!userDoc.exists()) throw new Error("User data not found.");

    const userData = userDoc.data();

    Profiledata.innerHTML = `
      <div id="container">
        <h2>Full Name:</h2>
        <h2>${userData.username || "Not Provided"}</h2>
        <button class="btn" onclick="editFullname()">Edit</button>
        
        <h2>CNIC:</h2>
        <h2>${userData.cnic || "Not Provided"}</h2>
        <button class="btn" onclick="editCnic()">Edit</button>

        <h2>Email:</h2>
        <h2>${userData.email || "Not Provided"}</h2>
        <button class="btn" onclick="editemail()">Edit</button>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    alert("Failed to load user data. Please try again later.");
  }
};

// const editFullname = async () => {
//   const userUid = localStorage.getItem("uid");
//   if (!userUid) return alert("User is not logged in.");

//   const newFullName = prompt("Enter new Full Name:");
//   if (!newFullName) return;

//   try {
//     await updateDoc(doc(db, "users", userUid), { username: newFullName.trim() });
//     alert("Full Name updated successfully!");
//     getdata();
//   } catch (error) {
//     console.error("Failed to update Full Name:", error.message);
//     alert("Failed to update Full Name. Please try again.");
//   }
// };

const editCnic = async () => {
  const userUid = localStorage.getItem("uid");
  if (!userUid) return alert("User is not logged in.");

  const newCnic = prompt("Enter new CNIC:");
  if (!newCnic) return;

  try {
    await updateDoc(doc(db, "users", userUid), { cnic: newCnic.trim() });
    alert("CNIC updated successfully!");
    getdata();
  } catch (error) {
    console.error("Failed to update CNIC:", error.message);
    alert("Failed to update CNIC. Please try again.");
  }
};

const editemail = async () => {
  const userUid = localStorage.getItem("uid");
  if (!userUid) return alert("User is not logged in.");

  const newEmail = prompt("Enter new Email:");
  if (!newEmail) return;

  try {
    await updateDoc(doc(db, "users", userUid), { email: newEmail.trim() });
    alert("Email updated successfully!");
    getdata();
  } catch (error) {
    console.error("Failed to update Email:", error.message);
    alert("Failed to update Email. Please try again.");
  }
};



const editFullname = async () => {
  const userUid = localStorage.getItem("uid");
  if (!userUid) return alert("User is not logged in.");

  const newFullName = prompt("Enter new Full Name:");
  if (!newFullName) return;

  // Validate Full Name (optional)
  if (newFullName.trim().length < 3) {
    return alert("Full Name should be at least 3 characters long.");
  }

  try {
    await updateDoc(doc(db, "users", userUid), { username: newFullName.trim() });
    alert("Full Name updated successfully!");
    getdata();
  } catch (error) {
    console.error("Failed to update Full Name:", error.message);
    alert("Failed to update Full Name. Please try again.");
  }
};


const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const validateCnic = (cnic) => {
  const re = /^\d{13}$/;
  return re.test(cnic);
};

function toggleEdit(field) {
  const display = document.getElementById(`${field}-display`);
  const input = document.getElementById(`${field}-input`);
  const button = display.nextElementSibling;

  if (input.style.display === 'none') {
      input.style.display = 'inline-block';
      display.style.display = 'none';
      button.textContent = 'Save';
  } else {
      input.style.display = 'none';
      display.style.display = 'inline-block';
      button.textContent = 'Edit';
      // Call the update function here to save the new value
      updateUserData(field, input.value);
  }
}

const updateUserData = async (field, value) => {
  const userUid = localStorage.getItem("uid");
  if (!userUid) return alert("User is not logged in.");
  
  try {
      await updateDoc(doc(db, "users", userUid), { [field]: value.trim() });
      alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
      getdata();
  } catch (error) {
      console.error(`Failed to update ${field}:`, error.message);
      alert(`Failed to update ${field}. Please try again.`);
  }
};

 window.getdata = getdata;

window.editFullname = editFullname;
window.editCnic = editCnic;
window.editemail = editemail;
window.validateEmail=validateEmail;
window.validateCnic=validateCnic;
window.toggleEdit=toggleEdit;
