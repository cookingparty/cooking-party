// import React, { useState } from "react";

// const Toggles =() => {
//     const { onlineUsers, friendships, messages, auth, users } = useSelector(
//         (state) => state )



//         const theme = useTheme();
//         const [open, setOpen] = React.useState(false);
//         const [messagesOpen, setMessagesOpen] = useState(false);
//         const [readMessages, setReadMessages] = useState([]);
//         const [onlineFriendsOpen, setOnlineFriendsOpen] = useState(false);
//         const [readOnlineFriends, setReadOnlineFriends] = useState([]);
//         const [onlineUsersOpen, setOnlineUsersOpen] = useState(false);
//         const [readOnlineUsers, setReadOnlineUsers] = useState([]);
//         const [friendsOpen, setFriendsOpen] = useState(false);
//         const [readFriends, setReadFriends] = useState([]);
//         const [friendRequestsOpen, setFriendRequestsOpen] = useState(false)
//         const [readFriendRequests, setReadFriendRequests] = useState()
//         const [friendRequests, setFriendRequests] = useState([]);

 
//         const handleToggleMessages = () => {
//             // dispatch(toggleMessage());
//             if (messagesOpen) {
//               setMessagesOpen(false);
//             } else {
//               setMessagesOpen(true);
//               setOnlineFriendsOpen(false);
//               setFriendsOpen(false);
//               setOnlineUsersOpen(false);
//               setFriendRequestsOpen(false);
//             }
//             setReadMessages(messages.map((message) => message.id));
//           };



// }

// export default Toggles