// Helper functions for loading and saving blogs
function loadBlogs() {
    return JSON.parse(localStorage.getItem("blogs") || "[]");
  }
  
  function saveBlogs(blogs) {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }
  
  // Load Latest Blogs and Most Viewed Blogs
  function loadLatestBlogs() {
    const blogs = loadBlogs();
    const latestBlogsContainer = document.getElementById("latest-blogs");
  
    latestBlogsContainer.innerHTML = '';
    blogs.slice(0, 5).forEach(blog => {
      latestBlogsContainer.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 class="text-xl font-semibold text-gray-800">${blog.title}</h3>
          <p class="text-gray-600 mt-2">${blog.content.slice(0, 100)}...</p>
          <a href="#" class="text-blue-500 mt-4 inline-block">Read More</a>
        </div>
      `;
    });
  }
  
  function loadMostViewed() {
    const blogs = loadBlogs();
    const mostViewedContainer = document.getElementById("most-viewed");
  
    mostViewedContainer.innerHTML = '';
    blogs.sort((a, b) => b.views - a.views).slice(0, 3).forEach(blog => {
      mostViewedContainer.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 class="text-xl font-semibold text-gray-800">${blog.title}</h3>
          <p class="text-gray-600 mt-2">${blog.content.slice(0, 100)}...</p>
          <span class="text-gray-500 text-sm">Views: ${blog.views}</span>
        </div>
      `;
    });
  }
  
  // Admin Login Logic
  document.getElementById("login-btn")?.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "admin" && password === "admin") {
      document.getElementById("login-section").classList.add("hidden");
      document.getElementById("admin-panel").classList.remove("hidden");
      loadBlogsForAdmin();
    } else {
      alert("Invalid credentials!");
    }
  });
  
  // Admin Logout Logic
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("admin-panel").classList.add("hidden");
  });
  
  // Load Blogs in Admin Panel
  function loadBlogsForAdmin() {
    const blogs = loadBlogs();
    const blogListContainer = document.getElementById("blog-list");
  
    blogListContainer.innerHTML = '';
    blogs.forEach((blog, index) => {
      blogListContainer.innerHTML += `
        <li class="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 class="text-xl font-semibold text-gray-800">${blog.title}</h3>
          <p class="text-gray-600 mt-2">${blog.content.slice(0, 100)}...</p>
          <div class="flex justify-between mt-4 space-x-4">
            <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onclick="editBlog(${index})">Edit</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onclick="deleteBlog(${index})">Delete</button>
          </div>
        </li>
      `;
    });
  }
  
  // Add New Blog
  document.getElementById("add-blog-btn")?.addEventListener("click", () => {
    const title = document.getElementById("blog-title").value;
    const content = document.getElementById("blog-content").value;
    const email = document.getElementById("email").value;
    const fileInput = document.getElementById("image-upload");
    const file = fileInput.files[0];
    const imageUrl = file ? URL.createObjectURL(file) : '';
  
    const blogs = loadBlogs();
    const newBlog = {
      title,
      content,
      email,
      image: imageUrl,
      views: 0,
    };
  
    blogs.push(newBlog);
    saveBlogs(blogs);
  
    alert("Blog added successfully!");
    loadBlogsForAdmin();
    loadLatestBlogs();
  });
  
  // Edit Blog Logic
  function editBlog(index) {
    const blogs = loadBlogs();
    const blog = blogs[index];
  
    document.getElementById("blog-title").value = blog.title;
    document.getElementById("blog-content").value = blog.content;
    document.getElementById("email").value = blog.email;
  
    // Optionally, handle image upload here as well
  }
  
  // Delete Blog Logic
  function deleteBlog(index) {
    const blogs = loadBlogs();
    blogs.splice(index, 1);
    saveBlogs(blogs);
    loadBlogsForAdmin();
    loadLatestBlogs();
  }
  
  // Initialize Page
  loadLatestBlogs();
  loadMostViewed();
  