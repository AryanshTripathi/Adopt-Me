import { Component } from "react";
import { withRouter } from "react-router";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
	constructor() {
		super();
		this.state = { loading: true, showModal: false };
	}

	// We could do it this way if we installed the class-properties plugin.
	// state = { loading: true, showModal: false };

	// It is something which gets called whenever the React Component is rendered for the first time
	async componentDidMount() {
		const res = await fetch(
			// Refer to https://reactrouter.com/web/api/match to read about ".match.params" thing.
			/* The id we are referring to is the ":id" part of"<Route path="/details/:id">". So if we used "/details/:dog"
         we would have used "this.props.match.params.dog" instead. */
			`http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
		);
		const json = await res.json();

		/* I'm getting a bunch of states back from API, one way is to individually update all of them.

          this.setState({
            loading: false,
            name: json.pets[0].name,
            breed: json.pets[0].breed,
            animal: json.pets[0].animal
          });

       Other way could be to use "Object.assign". Basically what it does is it updates the loading state to false and everything else will be passed down directly from json.pets. Prefer using this while using typescript */
		this.setState(
			Object.assign(
				{
					loading: false,
				},
				json.pets[0]
			)
		);
	}

	toggleModal = () => this.setState({ showModal: !this.state.showModal });
	adopt = () => (window.location = "http://bit.ly/pet-adopt");
	render() {
		if (this.state.loading) {
			return <h2>loading ...</h2>;
		}
		const { animal, breed, city, state, description, name, images, showModal } =
			this.state;

		// throw new Error("lol it broke!");

		return (
			<div className="details">
				<Carousel images={images} />
				<div>
					<h1>{name}</h1>
					{/* You can use JSX format also for the below statement ,like {animal} - {breed} - ...*/}
					<h2>{`${animal} - ${breed} - ${city} - ${state}`}</h2>
					{/* Code below explains how to use theme context inside of a class component */}
					<ThemeContext.Consumer>
						{([theme]) => (
							<button
								onClick={this.toggleModal}
								style={{ backgroundColor: theme, color: "black" }}>
								Adopt {name}
							</button>
						)}
					</ThemeContext.Consumer>

					<p>{description}</p>
					{showModal ? (
						<Modal>
							<div>
								<h1>Would you like to adpot {name}?</h1>
								<div className="buttons">
									<button onClick={this.adopt}>Yes</button>
									<button onClick={this.toggleModal}>No</button>
								</div>
							</div>
						</Modal>
					) : null}
				</div>
			</div>
		);
	}
}

/* As you can see, we are exporting the "Details" after wrapping it inside of a "withrouter". Remember we used "this.props.match.params.id" in the fetch 
   while requesting data from API. By default, the React router does not pass down all its information to the "Details" component. So, by using "withrouter"
   we're basically saying that hey I need all this information so please give it to me. And "withrouter" will pass updated match, location, and history 
   props to the wrapped component whenever it renders. */
const DetailsWithRouter = withRouter(Details);
export default function DetailsWithErrorBoundary() {
	return <DetailsWithRouter />;
}
