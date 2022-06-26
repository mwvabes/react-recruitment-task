import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Character from "./components/Character";
import Location from "./components/Location";
import LocationShortcut from "./components/LocationShortcut";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/location/:locationId" element={<Location />} />
          <Route
            path="/location/:locationId/:characterId"
            element={<Character />}
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
