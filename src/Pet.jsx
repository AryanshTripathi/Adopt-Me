import { Link } from "react-router-dom";
import mapObject from "./data/Utility";

const Pet = ({ name, animal, breed, images, location, id }) => {
	// This means that just in case API doesn't return any image, this image should be displayed

	let hero = "http://pets-images.dev-apis.com/pets/none.jpg";

	// Otherwise we'll use that image
	if (images.length) {
		hero = images[0];
	}

	hero = mapObject[hero];

	return (
		/* A very simple reason we are using "Link" tag and not "a" tag is because we do not want our application to reload. 
       When we are using "Link", react-router captures that routing/navigation event and it does the navigation without 
       reloading the application. "a" tag sends you to a brand new page while "Link" just takes you to a another component. */
		<Link to={`/details/${id}`} className="pet">
			<div className="image-container">
				<img src={hero} alt={name}></img>
			</div>

			<div className="info">
				<h2>{name}</h2>
				<h3>{`${animal}-${breed}-${location}`}</h3>
			</div>
		</Link>
	);
};

export default Pet;
