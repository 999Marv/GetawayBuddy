import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Landing from "./Landing";
import Home from "./Home";
import Profile from "./Profile";

export default function App() {
  return (
    <Router>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <SignedIn>
              <Home />
            </SignedIn>
          }
        />
        <Route
          path="/profile"
          element={
            <SignedIn>
              <Profile />
            </SignedIn>
          }
        />
      </Routes>
    </Router>
  );
}
