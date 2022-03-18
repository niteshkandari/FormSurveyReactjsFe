import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  Skeleton
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../AuthService/AuthService";
import { useHistory } from "react-router-dom";
import { useFacade } from "../../../facade/facade";
import MoodIcon from "@mui/icons-material/Mood";

export default function Account() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.userReducer.id);
  const history = useHistory();
  const facade: any = useFacade();
  
  useEffect(() => {
    let mounted = true;
      getData();
    return () => {
      mounted = false;
    }
  },[])

  const getData = async () =>  {
    setLoading(true)
    facade
      .getAllForms()
      .then(async (response: { data: any }) => {
        const data = await response.data;
        setUser(data.Form);
        setLoading(false)
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleLogOut = () => {
    logOutUser(dispatch);
    history.replace("/");
  };

  return (
    <div className="account-module">
      <div className="account-header">
        <span
          style={{
            color: "gray",
            fontWeight: "bold",
            marginLeft: "15px",
          }}
        >
          Account Overview
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Chip icon={<FaceIcon />} label={userId} variant="outlined" />
          <Button size="large" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
      <div className="account-section">
       {loading && <Box sx={{ width: "100%",borderRadius:'10px' }}>
          <LinearProgress />
        </Box>}
        <div className="account-section-users">
          <Chip
            icon={<MoodIcon />}
            label="Total Users"
            color="primary"
            style={{
              marginLeft: "15px",
              marginTop: "10px",
            }}
          />
          <div className={"account-section-users-1"}>
            {user && user.map((user: any, idx) => {
                return (
                  <div key={idx}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <div className="avatar-box">{user.name[0]}</div>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {user.email}
                              </Typography>
                              {
                                " — I'll be in your neighborhood doing errands this…"
                              }
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </List>
                  </div>
                );
              })}  
          </div>
        </div>
      </div>
    </div>
  );
}
