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
import ImageGalleryPage from "./pages/v1/ImageGalleryPage";
import SocialRedirect from "./pages/v2/RedirectPage";
import PlaceFeedPage from "./pages/v1/placeFeed/PlaceFeedPage";
import FriendsPage from "./pages/v1/friend/FriendPage";
import MyPage from "./pages/v1/my/MyPage";
import ChatListPage from "./pages/v1/chat/ChatListPage";
import ChatRoomPage from "./pages/v1/chat/ChatRoomPage";
import EditProfilePage from "./pages/v1/my/EditProfilePage";
import PlacePage from "./pages/v1/place/PlacePage";
import LandingPage from "./pages/v1/LandingPage";
import UserProfilePage from "./pages/v1/friend/UserProfilePage";
import MyPlacePage from "./pages/v1/my/MyPlacePage";
import ParticipantsListPage from "./pages/v1/participantsList/ParticipantsListPage";
import ReviewsPage from "./pages/v1/reviews/ReviewsPage";
import V2LandingPage from "./pages/v2/Landing/V2LandingPage";
import V2LoginPage from "./pages/v2/Login/V2LoginPage";
import V2TeamPage from "./pages/v2/Team/V2TeamPage";
import { Provider } from "react-redux";
import { store } from "./lib/v2/reducers/reducer";
config();

const ReservationConfirmPage = React.lazy(
  () => import("./pages/v1/reservation/ReservationConfirmPage"),
);

const V2CreatePlacePage = React.lazy(
  () => import("./pages/v2/PlaceManage/V2CreatePlacePage"),
);

const V2CreateTeamPage = React.lazy(
  () => import("./pages/v2/Team/V2CreateTeamPage"),
);

const V2LeaderInfoPage = React.lazy(
  () => import("./pages/v2/Team/V2LeaderInfoPage"),
);
const ReservationPage = React.lazy(
  () => import("./pages/v1/reservation/ReservationPage"),
);
const RequestPage = React.lazy(() => import("./pages/v1/RequestPage"));
const AuthPage = React.lazy(() => import("./pages/v2/auth/Auth"));
const NotFoundPage = React.lazy(() => import("./pages/v1/NotFoundPage"));
const CancelReservationPage = React.lazy(
  () => import("./pages/v1/CancelReservationPage"),
);

const AdminPage = React.lazy(() => import("./pages/v1/Admin/AdminPage"));
const CreatePlacePage = React.lazy(
  () => import("./pages/v1/Admin/CreatePlacePage"),
);
const EditPlacesPage = React.lazy(
  () => import("./pages/v1/Admin/EditPlacesPage"),
);
const EditPlacePage = React.lazy(
  () => import("./pages/v1/Admin/EditPlacePage"),
);

const V2ApplyingPage = React.lazy(
  () => import("./pages/v2/Applying/V2ApplyingPage"),
);

const V2MyPage = React.lazy(() => import("./pages/v2/MyPage/V2MyPage"));

const V2LeaderPage = React.lazy(() => import("./pages/v2/MyPage/V2LeaderPage"));

const V2LeaderApprovePage = React.lazy(
  () => import("./pages/v2/MyPage/V2LeaderApprovePage"),
);

const V2LeaderApproveDetailPage = React.lazy(
  () => import("./pages/v2/MyPage/V2LeaderApproveDetailPage"),
);

const PaymentPage = React.lazy(() => import("./pages/v1/payment/PaymentPage"));

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
        <Provider store={store}>
          <GlobalStyles />
          <AppContainer
            style={{
              minHeight: isUse100Vh ? isUse100Vh : "100vh",
            }}
          >
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
                <Route path={routes.v2Root} component={V2LandingPage} exact />
                <Route path={routes.v2Login} component={V2LoginPage} />
                <Route path={routes.v2MyPage} component={V2MyPage} />
                <Route
                  path={routes.v2LeaderInfoPage}
                  component={V2LeaderInfoPage}
                />
                <Route
                  path={routes.v2LeaderApprovePage}
                  component={V2LeaderApprovePage}
                />
                <Route
                  path={routes.v2LeaderApproveDetailPage}
                  component={V2LeaderApproveDetailPage}
                />
                <Route path={routes.v2LeaderPage} component={V2LeaderPage} />
                <Route path={routes.v2TeamPage} component={V2TeamPage} />
                <Route path={routes.v2ApplyPage} component={V2ApplyingPage} />
                <Route
                  path={routes.v2CreatePlacePage}
                  component={V2CreatePlacePage}
                />

                <Route
                  path={routes.v2CreateTeamPage}
                  component={V2CreateTeamPage}
                />

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
                <Route
                  path={routes.imageGallery}
                  component={ImageGalleryPage}
                />
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
                <Route path={routes.v2Auth} component={AuthPage} />
                <Route
                  path={routes.participantsList}
                  component={ParticipantsListPage}
                />
                <Route path={routes.payments} component={PaymentPage} />
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
        </Provider>
      </HelmetProvider>
    </PortalProvider>
  );
}

export default App;
