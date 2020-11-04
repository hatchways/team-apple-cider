import React from "react";
import ProfileDisplay from "body/ProfileDisplay";

import Header from "layout/Header";
import Page from "layout/Page";
import Body from "layout/Body";


}));

const Profile = (props) => {
  return (
    <Page>
      <Header />
      <Body>
        <ProfileDisplay {...props} />
      </Body>
    </Page>
  );
};

export default Profile;
