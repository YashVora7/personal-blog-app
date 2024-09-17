// API URL (replace with your backend API URL)
const API_URL = 'http://localhost:8080/blog/';

// Get the form and post container elements from the DOM
const postForm = document.getElementById('post-form');
const editForm = document.getElementById('edit-form');
const postsContainer = document.getElementById('posts-container');
const createPostSection = document.getElementById('create-post-section');
const editPostSection = document.getElementById('edit-post-section');

// Function to fetch posts from the API
async function fetchPosts() {
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        postsContainer.innerHTML = '<p>Failed to load posts. Try again later.</p>';
    }
}

// Function to render blog posts on the page
function renderPosts(posts) {
    postsContainer.innerHTML = '';  // Clear the current posts

    // Check if there are any posts
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No blog posts yet. Create one!</p>';
        return;
    }

    // Loop through each post and create HTML to display it
    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('bg-white', 'p-4', 'mb-4', 'border', 'border-gray-300', 'rounded');

        postElement.innerHTML = `
            <h3 class="text-lg font-bold mb-2">${post.title}</h3>
            <p class="text-gray-600 mb-2">By: ${post.author}</p>
            <p class="text-gray-700 mb-2">${post.description}</p>
            <div class="flex space-x-2">
                <button onclick="editPost('${post._id}')" class="bg-yellow-500 text-white p-1 rounded">Edit</button>
                <button onclick="deletePost('${post._id}')" class="bg-red-500 text-white p-1 rounded">Delete</button>
            </div>
        `;

        // Append the post element to the posts container
        postsContainer.appendChild(postElement);
    });
}


// Handle form submit to create a new post
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent form from submitting to a server

    // Get the values from the form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;

    if (!title || !author || !description) {
        alert('Title, author, and description are required!');
        return;
    }

    // Create the new post object
    const newPost = { title, author, description };

    // Send POST request to create the new post
    try {
        const response = await fetch("http://localhost:8080/blog/post", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            fetchPosts();  // Re-fetch and render the posts after the new one is created
            postForm.reset();  // Clear the form
        } else {
            console.error('Failed to create post');
        }
    } catch (error) {
        console.error('Error creating post:', error);
    }
});


// Function to delete a post
async function deletePost(id) {
    try {
        const response = await fetch(`http://localhost:8080/blog/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchPosts();  // Re-fetch and render the posts after deletion
        } else {
            console.error('Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// Function to edit a post (populate the form with existing data)
function editPost(id) {
    // Fetch the specific post to be edited
    fetch(`http://localhost:8080/blog/${id}`)
        .then((response) => response.json())
        .then((post) => {
            // Populate the edit form with the post data
            document.getElementById('edit-id').value = post._id;
            document.getElementById('edit-title').value = post.title;
            document.getElementById('edit-author').value = post.author;
            document.getElementById('edit-description').value = post.description;

            // Show the edit form and hide the create form
            editPostSection.classList.remove('hidden');
            createPostSection.classList.add('hidden');
        })
        .catch((error) => console.error('Error fetching post for edit:', error));
}

// Handle edit form submission to update a post
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value;
    const author = document.getElementById('edit-author').value;
    const description = document.getElementById('edit-description').value;

    if (!title || !author || !description) {
        alert('Title, author, and description are required!');
        return;
    }

    const updatedPost = { title, author, description };

    try {
        const response = await fetch(`http://localhost:8080/blog/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost),
        });

        if (response.ok) {
            fetchPosts();  // Re-fetch and render posts after update
            editForm.reset();  // Clear the form
            editPostSection.classList.add('hidden');
            createPostSection.classList.remove('hidden');
        } else {
            console.error('Failed to update post');
        }
    } catch (error) {
        console.error('Error updating post:', error);
    }
});


// Handle cancel edit (show the create form and hide the edit form)
document.getElementById('cancel-edit').addEventListener('click', (e) => {
    e.preventDefault();
    editForm.reset();
    editPostSection.classList.add('hidden');
    createPostSection.classList.remove('hidden');
});

// Fetch and display all posts on page load
fetchPosts();
