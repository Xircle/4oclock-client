import { config } from "dotenv";
import { use100vh } from "react-div-100vh";
import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStyles, AppContainer } from "./styles/styles";
import routes from "./routes";
import { PortalProvider } from "./providers/PortalProvider";
import storage from "./lib/storage";
import { POP_UP } from "./components/shared/constants";
import { HelmetProvider } from "react-helmet-async";
import ImageGalleryPage from "./pages/ImageGalleryPage";
import SocialRedirect from "./pages/RedirectPage";
import PlaceFeedPage from "./pages/placeFeed/PlaceFeedPage";
import FriendsPage from "./pages/friend/FriendPage";
import MyPage from "./pages/my/MyPage";
import ChatListPage from "./pages/chat/ChatListPage";
import ChatRoomPage from "./pages/chat/ChatRoomPage";
import EditProfilePage from "./pages/my/EditProfilePage";
import PlacePage from "./pages/place/PlacePage";
import LandingPage from "./pages/LandingPage";
import UserProfilePage from "./pages/friend/UserProfilePage";
import MyPlacePage from "./pages/my/MyPlacePage";
import ParticipantsListPage from "./pages/participantsList/ParticipantsListPage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
config();

const ReservationConfirmPage = React.lazy(
  () => import("./pages/reservation/ReservationConfirmPage")
);
const ReservationPage = React.lazy(
  () => import("./pages/reservation/ReservationPage")
);
const RequestPage = React.lazy(() => import("./pages/RequestPage"));
const AuthPage = React.lazy(() => import("./pages/auth/Auth"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const CancelReservationPage = React.lazy(
  () => import("./pages/CancelReservationPage")
);

const AdminPage = React.lazy(() => import("./pages/Admin/AdminPage"));
const CreatePlacePage = React.lazy(
  () => import("./pages/Admin/CreatePlacePage")
);
const EditPlacesPage = React.lazy(() => import("./pages/Admin/EditPlacesPage"));
const EditPlacePage = React.lazy(() => import("./pages/Admin/EditPlacePage"));

function App() {
  useEffect(() => {
    if (storage.getItem(POP_UP) === null) {
      storage.setItem(POP_UP, "true");
    }
  }, []);
  const isUse100Vh = use100vh();

  return (
    <PortalProvider>
      <HelmetProvider>
        <GlobalStyles />
        <AppContainer style={{ minHeight: isUse100Vh ? isUse100Vh : "100vh" }}>
          <Suspense
            fallback={
              <div
                style={{
                  height: "90vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/fallback_icon.png" width="285px" height="160px" />
              </div>
            }
          >
            <Switch>
              <Route path={routes.root} component={LandingPage} exact />
              <Route
                path={routes.socialRedirect}
                component={SocialRedirect}
                exact
              />
              <Route
                path={routes.cancelReservation}
                component={CancelReservationPage}
              />
              <Route path={routes.placeFeed} component={PlaceFeedPage} />
              <Route path={routes.place} component={PlacePage} />
              <Route path={routes.imageGallery} component={ImageGalleryPage} />
              <Route path={routes.friend} component={FriendsPage} />
              <Route path={routes.userProfile} component={UserProfilePage} />
              <Route path={routes.myPage} component={MyPage}></Route>
              <Route
                path={routes.reservationConfirm}
                component={ReservationConfirmPage}
              />
              <Route path={routes.reservation} component={ReservationPage} />
              <Route path={routes.request} component={RequestPage} />
              <Route path={routes.myPlace} component={MyPlacePage} />
              <Route
                path={routes.editProfilePage}
                component={EditProfilePage}
              />
              <Route path={routes.auth} component={AuthPage} />
              <Route
                path={routes.participantsList}
                component={ParticipantsListPage}
              />
              {/* REMINDER Delete*/}
              <Route path={routes.chatList} component={ChatListPage} />
              <Route path={routes.chatRoom} component={ChatRoomPage} />
              <Route path={routes.admin} component={AdminPage} />
              <Route path={routes.createPlace} component={CreatePlacePage} />
              <Route path={routes.editPlaces} component={EditPlacesPage} />
              <Route path={routes.editPlace} component={EditPlacePage} />
              <Route path={routes.reviews} component={ReviewsPage} />
              {/* insert editPlace in the future*/}
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </AppContainer>
      </HelmetProvider>
    </PortalProvider>
  );
}

export default App;
