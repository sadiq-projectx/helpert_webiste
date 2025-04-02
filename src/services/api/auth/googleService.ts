export const initializeGoogleAPI = async () => {
  if (typeof window !== "undefined") {
    const { gapi } = await import("gapi-script");
    gapi.load("auth2", () => {
      gapi.auth2.init({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // Replace with your Google Client ID
      });
    });
  }
};

export const handleGoogleSignIn = async () => {
  if (typeof window !== "undefined") {
    const { gapi } = await import("gapi-script");
    const auth2 = gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;

    return {
      uuid: profile.getId(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      fullName: profile.getName(),
      imageUrl: profile.getImageUrl(),
      provider: "GMAIL",
      email: profile.getEmail(),
      idToken,
    };
  } else {
    throw new Error("Google Sign-In is only available on the client side.");
  }
};