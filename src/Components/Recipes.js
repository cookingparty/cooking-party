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
    
    position: 'relative',
    width: '240px',
    display: "flex",
    flexDirection: "column",
    transition: 'none !important'
  },
  chat: {
    marginTop: "20px",
    alignSelf: "flex-end",
  },
  instafeedContainer: {
    flexGrow: 1,
    padding: "20px",
  },
  chatLinks: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },
};

const Recipes = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const userFeed = new Instafeed({
      get: "user",
      resolution: "medium_resolution",
      limit: 6,
      accessToken: "IGQVJWOFR4VzVuSGtQZAjNQQUpCRU12dEp0anNHU1dFbTE3QkxVM0tzSS1fRGVSU0swZA1RJQWVQWmszYTZAibVEtdmdwNFJQRnQtTk50Q1VaQ0s4N19UaUs4ZATlGUDUzQmpJTnRrOGttMXRLOXNqdzg4bQZDZD",
      target: "instafeed-container",
    });
    userFeed.run();
  }, []);

  return (
    <div style={styles.root}>
      <div style={styles.header}>
      <div style={styles.chatLinks}>
          <Button onClick={handleDrawerToggle}>
            {open ? "Close Chats" : "Show Chats"}
          </Button>
        </div>
       
       
      </div>

      <div style={styles.content}>
        Welcome {auth.username || auth.facebook_username}!!
        {!!auth.id && <OnlineUsers />}
        {!!auth.id && <OnlineFriends />}
        {!!auth.id && <Friends />}
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>

      <Drawer
        style={styles.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: styles.drawerPaper,
        }}
      >
        <div style={styles.drawerContainer}>
          {!!auth.id && <Chat style={styles.chat} />}
          {/* Place your drawer content here */}
        </div>
      </Drawer>

      <div style={styles.instafeedContainer} id="instafeed-container"></div>
    </div>
  );
};

export default Recipes;






// import React, {useEffect} from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../store";
// import OnlineUsers from "./OnlineUsers";
// import Friends from "./Friends";
// import Chat from "./Chat";
// import Instafeed from 'instafeed.js';

// const Recipes = () => {
//   const { auth } = useSelector((state) => state);
//   const dispatch = useDispatch();

 

//   useEffect(() => {
//     const userFeed = new Instafeed({
//       get: 'user',
//       resolution: 'medium_resolution',
//       limit: 6,
//       accessToken: 'IGQVJWOFR4VzVuSGtQZAjNQQUpCRU12dEp0anNHU1dFbTE3QkxVM0tzSS1fRGVSU0swZA1RJQWVQWmszYTZAibVEtdmdwNFJQRnQtTk50Q1VaQ0s4N19UaUs4ZATlGUDUzQmpJTnRrOGttMXRLOXNqdzg4bQZDZD',
//       target: 'instafeed-container'
//     });
//     userFeed.run();
//   }, [])

//   return (
//     <div>
//       <h1>Recipes</h1>
//       <div>
//         Welcome {auth.username}!!
//         <button onClick={() => dispatch(logout())}>Logout</button>
//         {!!auth.id && <OnlineUsers />}
//         {!!auth.id && <Friends />}
//         {!!auth.id && <Chat />}
//       </div>

//       <div id='instafeed-container'></div>
//     </div>
//   );
// };

// export default Recipes;
