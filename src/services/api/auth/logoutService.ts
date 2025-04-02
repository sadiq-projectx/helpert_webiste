// Sign Out
export const signOut = async (): Promise<void> => {
  try {
    localStorage.removeItem("jwtToken"); // Clear local storage
    console.log("User signed out successfully.");
  } catch (error) {
    throw new Error("Failed to sign out. Please try again.");
  }
};