import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import OnlineUsers from "./OnlineUsers";
import OnlineFriends from "./OnlineFriends";
import Friends from "./Friends";
import Chat from "./Chat";
import Instafeed from "instafeed.js";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";

const drawerWidth = "25%";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
    backgroundColor: "#f5f5f5",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#f5f5f5",
  },
  drawerContainer: {
    position: "relative",
    width: "240px",
    display: "flex",
    flexDirection: "column",
    transition: "none !important",
  },
  chat: {
    marginTop: "20px",
    alignSelf: "flex-end",
  },
  instafeedContainer: {
    flexGrow: 1,
    padding: "20px",
  },
  listItemText: {
    marginLeft: "10px",
  },
  logoutButton: {
    marginTop: "auto",
  },
};

const Chatting = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

 

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div style={styles.chatLinks}>
          <Button onClick={handleDrawerToggle}>
            {open ? "Close Chats" : "Show Chats"}
          </Button>
        </div>
      </div>

      
      <Drawer
        style={styles.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: styles.drawerPaper,
        }}
        sx={{
          marginTop: "200px",
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <div style={styles.drawerContainer}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Badge badgeContent={2} color="primary">
                  <PeopleIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Online Users" style={styles.listItemText} />
              {!!auth.id && <OnlineUsers />}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Badge badgeContent={3} color="primary">
                  <GroupIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Online Friends" style={styles.listItemText} />
              {!!auth.id && <OnlineFriends />}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" style={styles.listItemText} />
              {!!auth.id && <Friends />}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Badge badgeContent={1} color="secondary">
                  <PersonIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Friend Requests" style={styles.listItemText} />
              {/* Add your Friend Requests component here */}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chat" style={styles.listItemText} />
              {!!auth.id && <Chat style={styles.chat} />}
            </ListItem>
          </List>
          <Divider />
        </div>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ExitToAppIcon />}
          style={styles.logoutButton}
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </Drawer>

      
    </div>
  );
};

export default Chatting;

























// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../store";
// import OnlineUsers from "./OnlineUsers";
// import OnlineFriends from "./OnlineFriends";
// import Friends from "./Friends";
// import Chat from "./Chat";
// import Instafeed from "instafeed.js";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";


// const drawerWidth = "25%";

// const styles = {
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "20px",
//   },
//   content: {
//     flexGrow: 1,
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   drawer: {
//     flexShrink: 0,
//     width: drawerWidth,
//     backgroundColor: "#f5f5f5",
//   },
//   drawerPaper: {
//     width: drawerWidth,
//     backgroundColor: "#f5f5f5",
//   },
//   drawerContainer: {
    
//     position: 'relative',
//     width: '240px',
//     display: "flex",
//     flexDirection: "column",
//     transition: 'none !important'
//   },
//   chat: {
//     marginTop: "20px",
//     alignSelf: "flex-end",
//   },
//   instafeedContainer: {
//     flexGrow: 1,
//     padding: "20px",
//   },
//   chatLinks: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "10px",
//     marginBottom: "10px",
//   },
// };

// const Chatting = () => {
//   const { auth } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };



//   return (
//     <div style={styles.root}>
//       <div style={styles.header}>
//       <div style={styles.chatLinks}>
//           <Button onClick={handleDrawerToggle}>
//             {open ? "Close Chats" : "Show Chats"}
//           </Button>
//         </div>
       
       
//       </div>

//  <Drawer
        
//         style={styles.drawer}
//         variant="persistent"
//         anchor="right"
//         open={open}
//         classes={{
//           paper: styles.drawerPaper,
//         }}
//         sx={{
//             marginTop: "200px",
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//         >
//         <div style={styles.drawerContainer}>
//           {!!auth.id && <Chat style={styles.chat} />}
         
//        </div>
//       </Drawer>
     
//     </div>
//   );
// };

// export default Chatting;


