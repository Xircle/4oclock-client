import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyles, AppContainer } from "./styles";
import PlaceFeedPage from "./pages/placeFeed/PlaceFeedPage";
import RequestPage from "./pages/RequestPage";
import PlacePage from "./pages/place/PlacePage";
import routes from "./routes";
import FriendsPage from "./pages/friend/FriendsPage";
import MyPage from "./pages/my/MyPage";
import ReservationPage from "./pages/reservation/ReservationPage";
import ReservationConfirmPage from "./pages/reservation/ReservationConfirmPage";
import MyPlacePage from "./pages/my/MyPlacePage";
import EditProfilePage from "./pages/my/EditProfilePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/auth/Auth";
import { config } from "dotenv";
import SocialRedirect from "./pages/RedirectPage";
import NotFoundPage from "./pages/NotFoundPage";

config();

function App() {
  return (
    <div>
      <GlobalStyles />
      <AppContainer>
        <Router>
          <Switch>
            <Route path={routes.root} component={LandingPage} exact />
            <Route
              path={routes.socialRedirect}
              component={SocialRedirect}
              exact
            />
            <Route path={routes.placeFeed} component={PlaceFeedPage} />
            <Route path={routes.place} component={PlacePage} />
            <Route path={routes.friends} component={FriendsPage} />
            <Route path={routes.mypage} component={MyPage}></Route>
            <Route
              path={routes.reservationConfirm}
              component={ReservationConfirmPage}
            />
            <Route path={routes.reservation} component={ReservationPage} />
            <Route path={routes.request} component={RequestPage} />
            <Route path={routes.myPlace} component={MyPlacePage} />
            <Route path={routes.editProfilePage} component={EditProfilePage} />
            <Route path={routes.auth} component={AuthPage} />

            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </AppContainer>
    </div>
  );
}

export default App;
