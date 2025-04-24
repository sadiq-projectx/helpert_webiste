const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.helperts.com/api";

const ApiEndpoints = {
  // User Endpoints
  login: `${BASE_URL}/user/login`,
  guestLogin: `${BASE_URL}/user/guest/login`,
  register: `${BASE_URL}/user/register`,
  deleteUser: `${BASE_URL}/user/delete/`,
  deactivateUser: `${BASE_URL}/user/deactivate/`,
  resetPassword: `${BASE_URL}/user/resetpassword`,
  userLocation: `${BASE_URL}/user/userLocation`,
  completeProfile: `${BASE_URL}/user/completeprofile`,
  updateUser: `${BASE_URL}/user/update`,
  homeProfile: `${BASE_URL}/user/detail`,
  socialSignUp: `${BASE_URL}/user/socialSignup`,
  socialLogin: `${BASE_URL}/user/socialLogin`,
  uploadProfilePicture: `${BASE_URL}/user/uploadProfilePic`,

  // Interest Endpoints
  getAllInterests: `${BASE_URL}/interest`,
  addUserInterest: `${BASE_URL}/interest/add`,
  getUserInterests: `${BASE_URL}/interest/user`,

  // Appointment Endpoints
  getAllAppointments: `${BASE_URL}/appointments/get/booked`,
  getAppointmentDetails: `${BASE_URL}/appointments/detail/`,
  bookAppointment: `${BASE_URL}/appointments/book`,
  updateAppointmentStatus: `${BASE_URL}/appointments/approval/status/`,
  updateAppointment: `${BASE_URL}/appointments/update`,
  getAgoraTokenByAppointmentId: `${BASE_URL}/appointments/agora`,
  appointments: {
    getAll: '/appointments',
    getDetails: (id: string) => `/appointments/${id}`,
    updateStatus: (id: string) => `/appointments/${id}/status`,
  },

  // Video Endpoints
  uploadVideo: `${BASE_URL}/video/upload`,
  deleteVideo: `${BASE_URL}/video/delete/`,
  viewVideo: `${BASE_URL}/video/view/`,
  reportVideo: `${BASE_URL}/video/report/`,
  getReportReason: `${BASE_URL}/video/report/reasons`,
  getTrendingVideos: `${BASE_URL}/video/trending`,
  getAllVideosByUser: `${BASE_URL}/video/getAllVideosByUser`,
  dislikeVideo: `${BASE_URL}/video/:videoID/dislike`,
  commentOnVideo: `${BASE_URL}/video/`,
  getVideoMetaData: `${BASE_URL}/video/:videoID`,
  deleteComment: `${BASE_URL}/video/comments/:commentID`,
  getVideoComments: `${BASE_URL}/video/:videoID/comments`,
  replyComment: `${BASE_URL}/video/:videoID/comments/:commentID/reply`,

  // Notification Endpoints
  sendNotification: `${BASE_URL}/notification/sendNotification`,
  pushNotification: `${BASE_URL}/notification/push`,
  getNotifications: `${BASE_URL}/notification/getNotifications`,

  // Session Endpoints
  createSession: `${BASE_URL}/session/create`,
  updateSession: `${BASE_URL}/session/update`,
  deleteSession: `${BASE_URL}/session/delete`,
  getSession: `${BASE_URL}/session/get/:id?`,
  expertSession: `${BASE_URL}/session/expert`,

  // Expert Endpoints
  addSpecialization: `${BASE_URL}/expert/specializations/add`,
  getSpecializations: `${BASE_URL}/expert/specializations/all`,
  getCompanies: `${BASE_URL}/expert/companies/:id?`,
  getPortfolio: `${BASE_URL}/expert/getPortfolio`,
  updatePortfolio: `${BASE_URL}/expert/portfolio/update/`,
  getAllPortfolios: `${BASE_URL}/expert/portfolio/all`,
  setPortfolio: `${BASE_URL}/expert/portfolio/set/`,
  deletePortfolio: `${BASE_URL}/expert/portfolio/delete/`,
  addPortfolio: `${BASE_URL}/expert/portfolio/add`,
  getProfile: `${BASE_URL}/expert/profile?expert_id=`,
  updateProfile: `${BASE_URL}/expert/updateExpert`,
  addSessionRate: `${BASE_URL}/expert/sessionrate`,
  getAllSlots: `${BASE_URL}/expert/slots/all`,
  getVerificationStatus: `${BASE_URL}/expert/check/verification`,
  userVerification: `${BASE_URL}/expert/start/verification`,
  getExpertAvailableSlots: `${BASE_URL}/booking/available/slots`,
  setExpertAvailableSlots: `${BASE_URL}/expert/slots/set`,
  followExpert: `${BASE_URL}/expert/followingExpert`,

  // Common Endpoints
  getCommonToken: `${BASE_URL}/common/getCommonToken`,
  homeScreen: `${BASE_URL}/common/dashboard`,
  getFollowers: `${BASE_URL}/common/follower/list?expert_id=`,
  getFollowing: `${BASE_URL}/common/following/list?expert_id=`,
  getReviews: `${BASE_URL}/common/review/list?expert_id=`,
  getCategorizedExperts: `${BASE_URL}/expert/categories?`,
  getBecomeExpertData: `${BASE_URL}/common/becomeExpert`,
  getScheduleDayAndTime: `${BASE_URL}/expert/slots/all`,
  forceUpdate: `${BASE_URL}/common/forceUpdate`,

  // Search Endpoints
  searchExperts: `${BASE_URL}/expert/search`,

  // Payment Endpoints
  addPaymentMethodUpi: `${BASE_URL}/payment/add/upi`,
  addPaymentMethodBank: `${BASE_URL}/payment/add/bank`,
  getPaymentMethod: `${BASE_URL}/payment/account/details`,

  // Miscellaneous Endpoints
  uploadAttachment: `${BASE_URL}/conversations/attachment/upload`,
  getProfileDetails: `${BASE_URL}/user/profile?user_id=`,
  createOrder: `${BASE_URL}/booking/order/create`,
  startConversation: `${BASE_URL}/conversations/start`,
  getAllConversations: `${BASE_URL}/conversations/get/all`,
  getMessages: `${BASE_URL}/conversations/get/messages`,
  sendMessage: `${BASE_URL}/conversations/send/messages`,
  myEarnings: `${BASE_URL}/earning/`,
  getAgoraToken: `${BASE_URL}/common/agora/key`,
};

export default ApiEndpoints;