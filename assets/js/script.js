'use strict';

class User {
  #id;
  #name;
  #userName;
  #email;
  #profileImage;

  constructor(id, name, userName, email, profileImage = './assets/img/user.png') {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
    this.#profileImage = profileImage;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get userName() {
    return this.#userName;
  }

  get email() {
    return this.#email;
  }

  get profileImage() {
    return this.#profileImage;
  }

  getInfo() {
    return {
      id: `ID: ${this.#id}`,
      name: `Name: ${this.#name}`,
      userName: `Username: ${this.#userName}`,
      email: `Email: ${this.#email}`
    };
  }

  updateProfileImage(image) {
    this.#profileImage = image;
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, profileImage, pages = [], groups = [], canMonetize = false) {
    super(id, name, userName, email, profileImage);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    return this.#pages;
  }

  get groups() {
    return this.#groups;
  }

  get canMonetize() {
    return this.#canMonetize;
  }

  getInfo() {
    const userInfo = super.getInfo();
    return {
      ...userInfo,
      pages: `Pages: ${this.#pages.join(', ') || 'None'}`,
      groups: `Groups: ${this.#groups.join(', ') || 'None'}`,
      canMonetize: `Can Monetize: ${this.#canMonetize ? 'Yes' : 'No'}`
    };
  }
}

const subscriberUser = new Subscriber(
  1028,
  'Jeff Shmezos', 
  'CoolJeff22', 
  'jeffshmezos@scamazon.com', 
  './assets/img/user.png', 
  ['Making Money', 'Business Startup'],
  ['Kings of Cash', 'Warehouse Warriors'],
  true
);

const currentUser = new User(
  1001,
  'Mathew Moesker', 
  'MRM64', 
  'mathewmoesker64@gmail.com', 
  './assets/img/user.png',
  false
);

function showModal() {
  const accountInfo = currentUser.getInfo();
  const accountInfoContainer = document.getElementById('accountInfo');
  
  accountInfoContainer.innerHTML = '';

  Object.values(accountInfo).forEach(info => {
    const infoDiv = document.createElement('div');
    infoDiv.textContent = info;
    accountInfoContainer.appendChild(infoDiv);
  });

  document.getElementById('accountModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('accountModal').style.display = 'none';
}

function triggerProfileImageUpload() {
  document.getElementById("profile-image").click();
}

function updateProfileImage() {
  const profileInput = document.getElementById("profile-image");
  const file = profileInput.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageUrl = event.target.result;
      currentUser.updateProfileImage(imageUrl);
      document.getElementById("profile-pic").src = imageUrl;
    }
    reader.readAsDataURL(file);
  }
}

function triggerFileInput() {
  document.getElementById("post-image").click();
}

function showFileName() {
  const fileInput = document.getElementById("post-image");
  const fileName = fileInput.files[0] ? fileInput.files[0].name : "No file chosen";
  document.getElementById("file-name").textContent = `Selected file: ${fileName}`;
}

function postContent() {
  const postText = document.getElementById("post-text").value.trim();
  const postImage = document.getElementById("post-image").files[0];
  const postsSection = document.getElementById("postsSection");

  if (!postText && !postImage) {
    document.getElementById('post-text').focus();
    return;
  }

  const post = document.createElement("div");
  post.className = "post";

  const postHeader = document.createElement("div");
  postHeader.className = "post-header";

  const profilePic = document.createElement("div");
  profilePic.className = "profile-pic";

  const profileImg = document.createElement("img");
  profileImg.src = currentUser.profileImage;
  profilePic.appendChild(profileImg);

  const userName = document.createElement("div");
  userName.textContent = `${currentUser.name}`;

  const date = document.createElement("div");
  date.textContent = new Date().toLocaleString();

  postHeader.appendChild(profilePic);
  postHeader.appendChild(userName);
  postHeader.appendChild(date);
  post.appendChild(postHeader);

  if (postText) {
      const textContent = document.createElement("p");
      textContent.textContent = postText;
      post.appendChild(textContent);
  }

  if (postImage) {
      const imageContent = document.createElement("img");
      imageContent.src = URL.createObjectURL(postImage);
      imageContent.style.maxWidth = "100%";
      imageContent.style.borderRadius = "5px";
      post.appendChild(imageContent);
      imageContent.onload = () => URL.revokeObjectURL(imageContent.src);
  }

  postsSection.prepend(post);

  document.getElementById("post-text").value = "";
  document.getElementById("post-image").value = "";
  document.getElementById("file-name").textContent = "No file chosen";
}
