import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useHistory } from "react-router-dom";
import { NavLink, useRouteMatch } from "react-router-dom";
import { HomeRoutes } from "./HomeRoutes";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

function Home() {
  const history: any = useHistory();
  const match: any = useRouteMatch();
  const [value, setValue] = React.useState();
  return (
    <div className="menu-page-wrapper">
      <BottomNavigation
        showLabels
        className="mobile-menu"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Create"
          onClick={() => history.push(`${ match.path + '/create' }`)}
          icon={<ModeEditOutlineIcon style={{ color: "white" }} />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Forms"
          onClick={() => history.push(`${ match.path + '/forms' }`)}
          icon={<FavoriteIcon style={{ color: "white" }} />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Accounts"
          onClick={() => history.push(`${ match.path + '/account' }`)}
          icon={<ManageAccountsIcon style={{ color: "white" }} />}
        />
      </BottomNavigation>
      <div className="home-wrapper">
        <HomeRoutes />
      </div>
    </div>
  );
}

export default Home;
