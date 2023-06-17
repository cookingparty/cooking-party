import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import OnlineUsers from './OnlineUsers';
import OnlineFriends from './OnlineFriends';
import Friends from './Friends';
import Chat from './Chat';
import Instafeed from 'instafeed.js';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { accessTokenIg } from '../../secrets';

const drawerwidth = '25%';

const styles = {
	instafeedContainer: {
		flexGrow: 1,
		padding: '20px',
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
			get: 'user',
			resolution: 'medium_resolution',
			limit: 6,
			accessToken: accessTokenIg,
			target: 'instafeed-container',
		});
		userFeed.run();
	}, []);

	return (
		<div style={styles.root}>
			<div style={styles.header}>
				<div style={styles.chatLinks}></div>
			</div>
			<div style={styles.instafeedContainer} id="instafeed-container"></div>
		</div>
	);
};

export default Recipes;
