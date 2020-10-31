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
  // const user = null;

  // TODO: Header and dashContainer are very similar to the ones found in Dashboard.js,
  //       so they could be their own components and have the differing content passed
  //       to them as children
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
