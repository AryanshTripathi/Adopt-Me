import { Component } from "react";
import mapObject from "./data/Utility";

class Carousel extends Component {
	constructor() {
		super();
		this.state = {
			// We'll be recieving an array of images from the API. This is the index of first/default image which we will display on the screen.
			active: 0,
		};
	}

	// Make sure that defaultProps are static as they are usually declared static.
	static defaultProps = {
		images: [`http://pets-images.dev-apis.com/pets/none.jpg`],
	};

	/* If we were to use a normal function, we will have to bind "this" to make it work. There were 2 major ways:
     1) On line 38, we would have to use this.handleIndexClick.bind(this)
     2) Or we could have used a constructor and inside of it, we could have said this.handleIndexClick = handleIndexClick.bind(this)
     Both these methods work just fine, but since we are using "class-properties" plugin, we can do it this way as well. The reason this method works is
     the way arrow functions work. So whenever you create an arrow function, it doesn't create a new "this". What this means is, whenever this function 
     is called, it's not going to take "this" from wherever it's called but from where it was created. */
	handleIndexClick = (event) => {
		this.setState({
			// So as you can see we are accessing our custom attribute index by using dataset.index. The "+" sign is just to coerce the string to a number.
			active: +event.target.dataset.index,
		});
	};

	render() {
		const { active } = this.state;
		let { images } = this.props;

		images = images.map((image) => mapObject[image]);

		return (
			<div className="carousel">
				<img src={images[active]} alt="animal" />
				<div className="carousel-smaller">
					{/* As you can see that there is an attribute "data-index", "index" to be precise, in "img" but there is no such pre-defined attribute */}
					{/* This is a custom attribute. And remember whwnever you define a custom attribute just add "data-" to its prefix */}
					{images.map((photo, index) => (
						<img
							key={photo}
							src={photo}
							data-index={index}
							onClick={this.handleIndexClick}
							className={index === active ? active : ""}
							alt="animal thumbnail"
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Carousel;
