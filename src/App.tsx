import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyles, AppContainer } from "./styles";
import PlaceFeedPage from "./pages/placeFeed/PlaceFeedPage";
import RequestPage from "./pages/RequestPage";
import PlacePage from "./pages/place/PlacePage";
import routes from "./routes";
import FriendsPage from "./pages/friends/FriendsPage";
import MyPage from "./pages/mypage/MyPage";
import ReservationPage from "./pages/reservation/ReservationPage";
import ReservationConfirmPage from "./pages/reservation/ReservationConfirmPage";
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
            <Route path={routes.placeFeed}>
              <PlaceFeedPage />
            </Route>
            <Route path={routes.place} component={PlacePage} />
            <Route path={routes.friends}>
              <FriendsPage />
            </Route>
            <Route path={routes.mypage}>
              <MyPage />
            </Route>
            <Route path={routes.reservation}>
              <ReservationPage />
            </Route>
            <Route path={routes.reservationConfirm}>
              <ReservationConfirmPage />
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
