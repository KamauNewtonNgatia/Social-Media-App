import React, { useState } from 'react'
import Header from './Header';
import axios from "axios"
import { uploadCloudinary } from '../utils/uploading';
import { Toaster, toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()


    const postData = async(data) => {
        try {
            const response = await axios.post(`http://localhost:4000/posts`,data, {withCredentials:true});
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }finally{
            toast.success("Post created successful!", { duration: 3000 });
            navigate("/dashboard")
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
                image: imageUrl, title, excerpt, body
            }
            postData(data)
        }
        
        
    };

    

   

    return (

        <div>
            <Header/>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* image, title, excerpt, body */}

                {/* Title Input */}
                <div>
                    <label htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter the title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Excerpt Input */}
                <div>
                    <label htmlFor="excerpt" >
                    Excerpt
                    </label>
                    <input
                        type="text"
                        id="excerpt"
                        placeholder="Enter the Excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                    />
                </div>


                {/* Body Input */}
                <div>
                    <label htmlFor="password" >
                        Body
                    </label>
                    <input
                        type="text"
                        id="body"
                        placeholder="Enter the body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>

                {/* Image Input */}

                <div>
                    <label htmlFor="image" >
                        Upload image
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
                    {isLoading ? "creating post..." : "Post"}
                </button>

                <Toaster position="bottom-center" richColors />

            </form>
            
        </div>
    )
}

export default CreatePost