import React from "react";
import { StytchLogin } from "@stytch/react";
import { Products } from "@stytch/vanilla-js";
import { useTheme } from "@mui/material/styles";

/*
Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch

This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
https://stytch.com/docs/sdks/javascript-sdk#ui-configs
*/
const Login = () => {
  const styles = {
    hideHeaderText: true,
    container: {
      width: "100%",
      borderColor: "black"
    },
    buttons: {
      primary: {
        backgroundColor: "black",
        borderColor: "black",
      },
    },
  };
  const config = {
    products: [Products.emailMagicLinks],
    emailMagicLinksOptions: {
      loginRedirectURL: "http://localhost:3000/authenticate",
      loginExpirationMinutes: 60,
      signupRedirectURL: "http://localhost:3000/authenticate",
      signupExpirationMinutes: 60,
    },
  };

  return <StytchLogin config={config} styles={styles} />;
};

export default Login;
