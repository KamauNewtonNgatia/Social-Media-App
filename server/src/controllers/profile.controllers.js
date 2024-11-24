import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProfile(req, res) {
    try {
      const { profileImage, bio } = req.body;
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
      const newProfile = await prisma.profile.create({
        data: {
          profileImage,
          bio,
          userId
        },
      });
  
      res.status(201).json(newProfile);
    } catch (e) {
      console.error("Error creating profile:", e.message);
      res.status(500).json({ message: e.message });
    }
  }
  
  

export async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;
    const profile = await prisma.profile.findFirst({
      where: { userId },
      include: {
        user: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "No profile yet" });
    }

    res.status(200).json(profile);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again later" });
  }
}
