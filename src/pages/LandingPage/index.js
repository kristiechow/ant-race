import React from "react";
import { Screen } from "./styles";
import Header from "./components/Header";
import Main from "./components/Main";

export default function LandingPage() {
  return (
    <Screen>
      <Header />
      <Main />
    </Screen>
  );
}
