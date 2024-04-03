const createPost  = async(req,res)=>{
    try {
        // Destructure
        const { title ,content} = req.body;
        // validation
        if(!title.trim())return res.status(400).json("Title is required");
        // craete post
        const newPost = await Post.create({})
        // sending response to FE
    } catch (error) {
        console.error("Error in post creation",error);
        return res.status(500).json(`Error in post creation ${error.message}`);

    }
}

module.exports = {createPost}