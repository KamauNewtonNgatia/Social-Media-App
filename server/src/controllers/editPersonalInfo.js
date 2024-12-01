import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function editPersonalInfo(req, res) {
  try {
    // Destructure fields from the request body
    const { firstName, lastName, userName, email } = req.body;
    console.log("Running the editPersonalInfo function");

    // Get userId from authenticated request (e.g., via middleware)
    const userId = req.userId;

    // Create an object with only the fields provided by the user
    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (userName) updates.username = userName;
    if (email) updates.email = email;

    // Check if there are any updates to be made
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    // Log the updates object for debugging
    console.log("Updating the following fields:", updates);

    // Update the user record in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });

    // Respond with the updated user data
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Error updating profile" });
  }
}
