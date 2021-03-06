const routes = {
  root: "/",
  socialRedirect: "/social/redirect",
  placeFeed: "/place-feed",
  place: "/place/:placeId",
  imageGallery: "/image/:index",
  friend: "/friend",
  userProfile: "/user-profile",
  myPage: "/my-page",
  reservation: "/reservation/:name",
  reservationConfirm: "/reservation/confirm",
  request: "/request",
  myPlace: "/my-place",
  editProfilePage: "/edit-profile-page",
  auth: "/auth",
  participantsList: "/participants-list/:name",
  cancelReservation: "/cancel-reservation",
  // REMINDER: deleteBelow
  chatList: "/chatList",
  chatRoom: "/chatRoom/:roomId",
  admin: "/admin",
  createPlace: "/createPlace",
  editPlaces: "/editPlaces",
  editPlace: "/editPlace/:placeId",
  reviews: "/reviews",
};

export default routes;
