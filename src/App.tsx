import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyles, AppContainer } from "./styles";
import FeedPage from "./pages/feed/FeedPage";
import RequestPage from "./pages/RequestPage";
import PlacePage from "./pages/place/PlacePage";
import routes from "./routes";
import FriendsPage from "./pages/friends/FriendsPage";
import MyPage from "./pages/mypage/MyPage";
import BookingPage from "./pages/place/BookingPage";
import BookingConfirmPage from "./pages/place/BookingConfirmPage";
import MyXirclePage from "./pages/mypage/MyXirclePage";
import ModifyProfilePage from "./pages/mypage/ModifyProfilePage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div>
      <GlobalStyles />
      <AppContainer>
        <Router>
          <Switch>
            <Route path={routes.root}>
              <LandingPage />
            </Route>

            <Route path={routes.feed}>
              <FeedPage />
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
            <Route path={routes.booking}>
              <BookingPage />
            </Route>
            <Route path={routes.bookingconfirm}>
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
          </Switch>
        </Router>
      </AppContainer>
    </div>
  );
}

export default App;
