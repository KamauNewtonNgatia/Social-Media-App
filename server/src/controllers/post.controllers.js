import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost(req, res) {
  try {
    const { image, title, excerpt, body } = req.body;
    const userId = req.userId;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the post
    const newPost = await prisma.post.create({
      data: {
        image,
        title,
        excerpt,
        body,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(newPost);
  } catch (e) {
    console.error("Error creating post:", e);
    res.status(500).json({ message: "Failed to create post" });
  }
}

export async function fetchSinglePost(req, res) {
  try {
    const { id } = req.params;
    await prisma.post.findFirst({
      where: { id: id },
      include: {
        user: true,
      },
    });
    if (!post) {
      res.status(404).json({ message: "post not found" });
      return;
    }
    res.status(200).json(post);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again later" });
  }
}

export async function fetchUserPosts(req, res) {
  try {
    const { userId } = req.params;

    const posts = await prisma.post.findMany({
      where: { user: { id: userId } },
      include: { user: true },
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(posts);
  } catch (e) {
    console.error("Error fetching posts:", e);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
}

export async function fetchAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          include: {
            profile: true, // Include profile through the user relation
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
}

export async function deletePosts(req, res) {
  try {
    const { postId } = req.params;
    res.send(postId);
    // const userId = req.userId;
    // const post = await prisma.note.delete({
    //   where: {
    //     id: postId,
    //     owner: userId,
    //   },
    // });
    // res.status(200).json({ message: "post deleted successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "something went wrong please try again later" });
  }
}
