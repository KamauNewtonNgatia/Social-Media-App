import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { uploadCloudinary } from '../utils/uploading';
import { Toaster, toast } from "sonner";

const EditProfile = () => {
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()


    const postData = async(data) => {
        try {
            const response = await axios.post(`http://localhost:4000/user/profile`,data, {withCredentials:true});
            console.log(response.data)
            

            if (response.data.newProfile) {
                toast.success("Profile updated successful!", { duration: 3000 });
            }
        } catch (error) {
            console.log(error)
        }finally{
            // navigate("/profile")
            setIsLoading(false)
        }
    }
    const handleSubmit =async (e) => {
        e.preventDefault();
        setIsLoading(true)

        // if (!validateInputs()) return;
        console.log("uploading")
        const imageUrl = await uploadCloudinary(image);
        // console.log(res)

        if(imageUrl){
            const data = {
                profileImage: imageUrl, bio
            }
            console.log(data)
            postData(data)
        }
        
        
    };
  return (
    <div>
        <form onSubmit={handleSubmit} className="space-y-4">

                {/* Bio Input */}
                <div>
                    <label htmlFor="bio">
                        Bio
                    </label>
                    <input
                        type="text"
                        id="bio"
                        placeholder="Tell us about you"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                      

                {/* Image Input */}

                <div>
                    <label htmlFor="image" >
                        Upload profile
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full ${isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
                        } text-white font-semibold py-2 rounded-md`}
                    disabled={isLoading}
                >
                    {isLoading ? "updating profile..." : "Update"}
                </button>

                <Toaster position="bottom-center" richColors />

            </form>
    </div>
  )
}

export default EditProfile