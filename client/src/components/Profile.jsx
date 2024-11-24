import React, { useEffect, useState } from 'react';
import image1 from '../assets/hero-img.webp'
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Profile(){ 

    const {user, resetUser} = useUserStore()
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);

    const handleEditProfile = () => {
        navigate("/editprofile")
    }
    const handleLogout = () => {
        setUserProfile(null)
        resetUser();
        navigate("/")
    }

    const getUserProfile = async() => {
        try {
            console.log(user.id)
            const response = await axios.get(`http://localhost:4000/user/${user.id}/profile`, {withCredentials:true});
            // console.log(response.data)

            setUserProfile({
                bio: response.data.bio,
                profileImage: response.data.profileImage,
            })

            console.log(userProfile)

        } catch (error) {
            console.log(error)
        }
    }
    const getUserPosts = async() => {
        try {
            console.log(user.id)
            const response = await axios.get(`http://localhost:4000/posts/user/${user.id}`, {withCredentials:true});
            // console.log(response.data)

            setUserPosts(response.data)

            // console.log(userProfile)

        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        getUserProfile();
        setTimeout(() => {
            getUserPosts();
          }, "2000");
    }, [])

console.log(userPosts)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          {/* Profile Image and Username */}
          <div className="flex items-center space-x-4">
            <img
              src={userProfile?.profileImage}
              alt="profile pic"
              className="w-20 h-20 rounded-full object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
          </div>
          {/* Edit Profile Button */}
          <button onClick={handleEditProfile} className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
            Logout
          </button>
        </div>

        {/* Bio Section */}
        <p className="mt-6 text-gray-600">{userProfile?.bio}</p>

        {/* Followers and Following Section */}
        <div className="flex justify-around mt-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{user?.followers}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{user?.following}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Replace this with actual post components */}
          {userPosts && userPosts.map((post, i) => (
            <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-700 font-bold">{post.title}</p>
            <p className="text-gray-700">{post.excerpt}</p>
            <p className="text-gray-700">{post.body}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
