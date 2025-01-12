import {
    collection,
    db,
    getDocs,
    query,
    where,
    getDoc,
    doc,
    updateDoc,
    deleteDoc
} from "./firebase.js"


const getMyBlogs = async () => {
    console.log("Fetching my blogs...");
    try {
        const parent = document.getElementById("parent");
        parent.innerHTML = "";

        const userUid = localStorage.getItem("uid");
        const q = query(collection(db, "blogs"), where("uid", "==", userUid));

        const gettingdocs = await getDocs(q);

        gettingdocs.forEach((doc) => {
            const data = doc.data();
            const Id = doc.id;
            const isOwner = data.uid === userUid;

            parent.innerHTML += `
                <div class = "blog-container"">
                    <h5>${data.title}</h5>
                    <p>${data.description}</p>
                    <p><strong>${data.isprivate ? "Private" : "Public"}</strong></p>
                    ${isOwner ? `
                        <button onclick="editPost('${Id}')">EDIT</button>
                        <button onclick="deletePost('${Id}')">DELETE</button>
                    ` : ""}
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching blogs:", error.message);
    }
};


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
        getMyBlogs();
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
        getMyBlogs();
    } catch (error) {
        console.log("Error deleting post:", error.message);
        alert("Failed to delete post. Please try again.");
    }
};


window.getMyBlogs = getMyBlogs
window.editPost = editPost
window.deletePost = deletePost