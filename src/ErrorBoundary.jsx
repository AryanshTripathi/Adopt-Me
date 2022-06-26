import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

/* So what is an Error Boundary? Basically what we are saying is that hey, if you caught an error, don't crash my application, just catch the error  
   and then do something with it. So it's a good idea to put one error boundary at the very top level and then if anywhere something bad happens, 
   let's recover and just take user to a good state and not crash the application altogether. */
class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasError: false, redirect: false };
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error, info) {
		console.error("ErrorBoundary caught an error", error, info);
		setTimeout(() => this.setState({ redirect: true }), 5000); // Waiting for 5 seconds
	}
	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />;
		} else if (this.state.hasError) {
			return (
				<h2>
					This Listing has an error.
					<Link to="/">Click Here</Link> to go back to the home page or wait
					five seconds.
				</h2>
			);
		}
		return this.props.children;
	}
}

/* <ErrorBoundary>
    <h1>Hi There!</h1>
   </ErrorBoundary>; */

/* This is the child of this.props.children is referring to. So basically what we are doing is, we are asking this component to stay invisible and appear  
   only when an error occurs that means if the commented out section would have been included, then if everything is fine that will be rendered and as soon 
   as an error occurs, the other component will be rendered. */

export default ErrorBoundary;
