import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyles, AppContainer } from "./styles";
import PlacesPage from "./pages/places/PlacesPage";
import RequestPage from "./pages/RequestPage";
import PlacePage from "./pages/place/PlacePage";
import routes from "./routes";
import FriendsPage from "./pages/friends/FriendsPage";
import MyPage from "./pages/mypage/MyPage";
import BookingPage from "./pages/place/ReservationPage";
import BookingConfirmPage from "./pages/place/ReservationConfirmPage";
import MyXirclePage from "./pages/mypage/MyXirclePage";
import ModifyProfilePage from "./pages/mypage/ModifyProfilePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/auth/Auth";
import { config } from "dotenv";
import SocialRedirect from "./pages/RedirectPage";

config();

function App() {
  return (
    <div>
      <GlobalStyles />
      <AppContainer>
        <Router>
          <Switch>
            <Route path={routes.root} exact>
              <LandingPage />
            </Route>
            <Route path={routes.socialRedirect} exact>
              <SocialRedirect />
            </Route>
            <Route path={routes.places}>
              <PlacesPage />
            </Route>
            <Route path={routes.place}>
              <PlacePage />
            </Route>
            <Route path={routes.friends}>
              <FriendsPage />
            </Route>
            <Route path={routes.mypage}>
              <MyPage />
            </Route>
            <Route path={routes.reservation}>
              <BookingPage />
            </Route>
            <Route path={routes.reservationConfirm}>
              <BookingConfirmPage />
            </Route>
            <Route path={routes.request}>
              <RequestPage />
            </Route>
            <Route path={routes.myxirclepage}>
              <MyXirclePage />
            </Route>
            <Route path={routes.myprofilemodifypage}>
              <ModifyProfilePage />
            </Route>
            <Route path={routes.auth}>
              <AuthPage />
            </Route>
          </Switch>
        </Router>
      </AppContainer>
    </div>
  );
}

export default App;
