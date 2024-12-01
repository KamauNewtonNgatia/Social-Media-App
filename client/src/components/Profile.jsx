import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";

function Profile() {
  const { user, resetUser } = useUserStore();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleLogout = () => {
    setUserProfile(null);
    resetUser();
    navigate("/");
  };

  const getUserProfile = async () => {
    try {
      console.log(user.id);
      const response = await axios.get(
        `http://localhost:4000/user/${user.id}/profile`,
        { withCredentials: true },
      );
      setUserProfile({
        bio: response.data.bio,
        profileImage: response.data.profileImage,
      });
      console.log(userProfile);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      console.log(user.id);
      const response = await axios.get(
        `http://localhost:4000/posts/user/${user.id}`,
        { withCredentials: true },
      );
      setUserPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
    setTimeout(() => {
      getUserPosts();
    }, 2000);
  }, []);

  console.log(userPosts);

  return (
    <>
      {/* <Header /> */}
      <div></div>
      <div className="min-h-screen bg-gray-100">
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={userProfile?.profileImage}
                alt="profile pic"
                className="w-20 h-20 rounded-full object-cover"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.username}
              </h2>
            </div>

            <button
              onClick={handleEditProfile}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          </div>

          <p className="mt-6 text-gray-600">{userProfile?.bio}</p>

          <div className="flex justify-around mt-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {user?.followers}
              </p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {user?.following}
              </p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            My Posts
          </h3>

          {/* Check if there are no posts */}
          {userPosts && userPosts.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No posts found.
            </div>
          ) : (
            <div className="w-full">
              {userPosts &&
                userPosts.map((post, i) => (
                  <PostCard
                    postId={post.id}
                    owner={true}
                    key={i}
                    title={post.title}
                    excerpt={post.excerpt}
                    body={post.body}
                    image={post.image}
                    usernamer={post.username}
                    profileImage={post.profileImage}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
