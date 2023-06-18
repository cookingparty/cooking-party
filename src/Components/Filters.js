import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LuVegan, LuWheatOff, LuDrumstick } from 'react-icons/lu';
import { VscFlame } from 'react-icons/vsc';

function Filters() {
	return (
		<List>
			<StyledLink to="/recipeSearch/paleo">
				<VscFlame />
				<h4>Paleo</h4>
			</StyledLink>
			<StyledLink to="/recipeSearch/keto">
				<LuDrumstick />
				<h4>Keto</h4>
			</StyledLink>
			<StyledLink to="/recipeSearch/gluten free">
				<LuWheatOff />
				<h4>Gluten Free</h4>
			</StyledLink>
			<StyledLink to="/recipeSearch/vegan">
				<LuVegan />
				<h4>Vegan</h4>
			</StyledLink>
		</List>
	);
}

const List = styled.div`
	display: flex;
	flex-direction: center;
	margin: 2rem 0rem;
	font-family: 'Montserrat', sans-serif;
`;

const StyledLink = styled(NavLink)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	margin-right: 2rem;
	text-decoration: none;
	background: linear-gradient(35deg, #494949, #313131);
	width: 6rem;
	height: 6rem;
	cursor: pointer;
	transform: scale(0.8);

	h4 {
		color: white;
		font-size: 0.9rem;
		margin: 0.5rem 0;
		text-align: center;
		line-height: 1rem;
		white-space: normal;
	}

	svg {
		color: white;
		font-size: 1.5rem;
		margin-bottom: 0rem;
	}
	&.active {
		background: linear-gradient(to right, #f27121, #e94057);

		svg {
			color: white;
		}
		h4 {
			color: white;
		}
	}
`;

export default Filters;
