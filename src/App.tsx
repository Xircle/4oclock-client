import { config } from "dotenv";
import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStyles, AppContainer } from "./styles/styles";
import routes from "./routes";
import { PortalProvider } from "./providers/PortalProvider";
import { HelmetProvider } from "react-helmet-async";
config();

const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const SocialRedirect = React.lazy(() => import("./pages/RedirectPage"));
const PlaceFeedPage = React.lazy(
  () => import("./pages/placeFeed/PlaceFeedPage")
);
const PlacePage = React.lazy(() => import("./pages/place/PlacePage"));
const FriendsPage = React.lazy(() => import("./pages/friend/FriendPage"));
const ParticipantProfilePage = React.lazy(
  () => import("./pages/friend/ParticipantProfilePage")
);
const MyPage = React.lazy(() => import("./pages/my/MyPage"));
const ReservationConfirmPage = React.lazy(
  () => import("./pages/reservation/ReservationConfirmPage")
);
const ReservationPage = React.lazy(
  () => import("./pages/reservation/ReservationPage")
);
const RequestPage = React.lazy(() => import("./pages/RequestPage"));
const MyPlacePage = React.lazy(() => import("./pages/my/MyPlacePage"));
const EditProfilePage = React.lazy(() => import("./pages/my/EditProfilePage"));
const AuthPage = React.lazy(() => import("./pages/auth/Auth"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const ParticipantsListPage = React.lazy(
  () => import("./pages/participantsList/ParticipantsListPage")
);

function App() {
  return (
    <PortalProvider>
      <HelmetProvider>
        <GlobalStyles />
        <AppContainer>
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
                <img
                  width={200}
                  height={300}
                  src="https://raw.githubusercontent.com/Xircle/xircle-client/master/public/Logo/Xircle_Logo.svg"
                />
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
              <Route path={routes.placeFeed} component={PlaceFeedPage} />
              <Route path={routes.place} component={PlacePage} />
              <Route path={routes.friend} component={FriendsPage} />
              <Route
                path={routes.participantProfile}
                component={ParticipantProfilePage}
              />
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
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </AppContainer>
      </HelmetProvider>
    </PortalProvider>
  );
}

export default App;
