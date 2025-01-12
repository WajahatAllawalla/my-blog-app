import { addDoc, auth, collection, db, doc, getDocs, getDoc,updateDoc,deleteDoc } from "./firebase.js"


// onAuthStateChanged(auth, (user) => {
//     if (!user) {
//         window.location.replace("./index.html")
//     } else {
//     }
// })

const authCheck = async () => {
    const userUid = localStorage.getItem("uid")
    console.log("userUid", userUid)
    if (!userUid) {
        window.location.replace("./index.html")
    }   
    const userDoc = await getDoc(doc(db, "users", userUid));
    // console.log(userDoc.data())
}

const blogpost = async () => {
    try{

        const title  = document.getElementById("title")
        const description = document.getElementById("description")
        const checkbox = document.getElementById("checkbox")
        
        const obj = {
            title: title.value,
            description: description.value,
            isprivate : checkbox.checked,
            uid : localStorage.getItem("uid")
        }
        
        await addDoc(collection(db, "blogs"), obj)
        alert("blog created successfully!")
        getPost()
    } 
    catch(error){
        console.log(error.message)
    }
             
}

const getPost = async () => {
    console.log("Fetching posts...");
    try {
        const parent = document.getElementById("parent");
        parent.innerHTML = ""; 

        const snapShot = await getDocs(collection(db, "blogs"));

        snapShot.forEach((doc) => {
            const data = doc.data();
            const Id = doc.id;
            // console.log("Id" , Id)
            const isOwner = data.uid === localStorage.getItem("uid");

            if (data.isprivate && !isOwner) {
                return;
            }

            parent.innerHTML += `
                <div class = "blog-container">
                    <h5>${data.title}</h5>
                    <p>${data.description}</p>
                    <p><strong>${data.isprivate ? "Private" : "Public"}</strong></p>
                    ${isOwner ? `<button onclick="editPost('${Id}')">EDIT</button>` : ""}
                    ${isOwner ? `<button onclick="deletePost('${Id}')">Delete</button>` : ""}
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
    }
};

// const editPost = async () =>{
//     try{
        
//     const docs = await getDocs(collection(db, "blogs"));

//     // docs.forEach((doc) =>{
//     //     const data = doc.data();
//     //     const blogid = doc.id
//     //     const isOwner = data.uid === localStorage.getItem("uid");
//     //     console.log("blog id",blogid)
//     //     console.log(isOwner)
        
//     // });




//     }
//     catch(error){
//         console.log(error.message)
//     }
// }

const editPost = async (Id) => {
    try {
        const gettingdoc = await getDoc(doc(db, "blogs", Id));
        console.log(gettingdoc);


        const newTitle = prompt("Edit Title:", gettingdoc.data().title);
        const newDescription = prompt("Edit Description:", gettingdoc.data().description);

        if (newTitle === null || newDescription === null) {
            alert("Edit canceled.");
            return;
        }

        await updateDoc(doc(db, "blogs", Id), {
            title: newTitle,
            description: newDescription,
        });

        alert("Post updated successfully!");
        getPost();
    } catch (error) {
        console.log("Error editing post:", error.message);
        alert("Failed to edit post. Please try again.");
    }
};

const deletePost = async (Id) => {
    try {
        const gettingdoc = doc(db, "blogs", Id);

        await deleteDoc(gettingdoc);

        alert("Post deleted successfully!");
        getPost(); 
    } catch (error) {
        console.log("Error deleting post:", error.message);
        alert("Failed to delete post. Please try again.");
    }
};

const logout = () => {
    try {
        localStorage.removeItem("uid");
        localStorage.clear();

        window.location.replace("./index.html");
    } catch (error) {
        console.log("Error during logout:", error.message);
        alert("Failed to logout. Please try again.");
    }
}

window.blogpost = blogpost
window.authCheck = authCheck    
window.getPost = getPost
window.editPost = editPost
window.deletePost = deletePost
window.logout = logout
