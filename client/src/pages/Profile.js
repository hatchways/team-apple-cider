import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProfileDisplay from "body/ProfileDisplay";

import Header from "elements/Header";
import Page from "elements/Page";
import Body from "elements/Body";

const useStyles = makeStyles((theme) => ({
  //
}));

const Profile = (props) => {
  return (
    <Page>
      <Header />
      <Body>
        <ProfileDisplay />
      </Body>
    </Page>
  );
};

export default Profile;
