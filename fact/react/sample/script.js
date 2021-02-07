let search = document.querySelector(".search");
let uid = document.querySelector("#uid");
let name = document.querySelector(".profile-name");
let handle = document.querySelector(".profile-handle");
let bio = document.querySelector(".profile-bio");
let following = document.querySelector(".following .count");
let follower = document.querySelector(".follower .count");

search.addEventListener("click", async function () {
  let uidValue = uid.value;
  console.log(uidValue);

  // making request to server defined in the backend
  let userData = await axios.get(`http:localhost:3000/user/${uidValue}`);
  userData = userData.data.data;
  // console.log(userData);
  let followingData = await axios.get(
    `http:localhost:3000/user/request/following/${uidValue}`
  );
  let followerData = await axios.get(
    `http:localhost:3000/user/request/follower/${uidValue}`
  );
  //   console.log(followerData);
  //   console.log(followingData);
  let followingCount = followingData.data.data.length;
  let followerCount = followerData.data.data.length;

  name.innerHTML = userData.name;
  handle.innerHTML = userData.handle;
  bio.innerHTML = userData.bio;
  following.innerHTML = followerCount;
  follower.innerHTML = followerCount;
});
