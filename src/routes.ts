const routes = {
  root: "/v1",
  placeFeed: "/v1/place-feed",
  place: "/v1/place/:placeId",
  imageGallery: "/v1/image/:index",
  friend: "/v1/friend",
  userProfile: "/v1/user-profile",
  myPage: "/v1/my-page",
  reservation: "/v1/reservation/:name",
  reservationConfirm: "/v1/reservation/confirm",
  request: "/v1/request",
  myPlace: "/v1/my-place",
  editProfilePage: "/v1/edit-profile-page",
  auth: "/v1/auth",
  participantsList: "/v1/participants-list/:name",
  cancelReservation: "/v1/cancel-reservation",
  // REMINDER: deleteBelow
  chatList: "/v1/chatList",
  chatRoom: "/v1/chatRoom/:roomId",
  admin: "/v1/admin",
  createPlace: "/v1/createPlace",
  editPlaces: "/v1/editPlaces",
  editPlace: "/v1/editPlace/:placeId",
  reviews: "/v1/reviews",
  payments: "/v1/payments",

  // v2
  v2Root: "/",
  v2Login: "/v2/login",
  socialRedirect: "/v2/social/redirect",
  v2MyPage: "/v2/mypage",
  v2LeaderPage: "/v2/leaderpage",
  v2TeamPage: "/v2/team/:teamId",
  v2ApplyPage: "/v2/apply/:teamId",
};

export default routes;
