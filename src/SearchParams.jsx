import { useState, useEffect, useContext } from "react";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
	const [location, setLocation] = useState("");
	const [animal, setAnimal] = useState("");
	const [breed, setBreed] = useState("");
	const [pets, setPets] = useState([]);
	const [breeds] = useBreedList(animal);
	const [theme, setTheme] = useContext(ThemeContext);
	const [textColor, setTextColor] = useState("Black");

	useEffect(() => {
		requestPets();
	}, []);

	/* If we don't pass the second parameter to useEffect, i.e. [], it will make infinite requests from API. Basically it is telling useEffect when to re-run 
     it. If you leave it empthy, i.e. do not pass any 2nd parameter, it will re-run every time state is updated. By passing [] as the 2nd parameter, we
     are basically saying only run it just one time and not anymore unless I tell it to. */
	/* If we would have passed [animal] as the 2nd parameter, it will re-run every time we change animal */

	async function requestPets() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		);
		const json = await res.json();
		setPets(json.pets);
	}
	return (
		<div className="search-params">
			{/* Generally, it is considered as a better practice to use onSubmit attribute on form rather than onClick attribute
          of button (Refer to stackoverflow for reasons)*/}
			{/* There are a lots of ways to handling the user input(synthtic events) out there. Here is a link to react docs if
          you want to read more about them. */}
			{/* https://reactjs.org/docs/events.html#supported-events */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}>
				<label htmlFor="location">
					Location
					<select
						id="location"
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						onBlur={(event) => setLocation(event.target.value)}>
						<option />
						<option value="Seattle, WA">Seattle, WA</option>
						<option value="Minneapolis, MN">Minneapolis, MN</option>
						<option value="Denver, CO">Denver, CO</option>
						<option value="Charlotte, NC">Charlotte, NC</option>
						<option value="Tucson, AZ">Tucson, AZ</option>
						<option value="New Heaven, CT">New Heaven, CT</option>
						<option value="Madison, WI">Madison, WI</option>
					</select>
				</label>
				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						value={animal}
						onChange={(event) => setAnimal(event.target.value)}
						onBlur={(event) => setAnimal(event.target.value)}>
						<option></option>
						{ANIMALS.map((animal) => (
							<option value={animal} key={animal}>
								{" "}
								{/* This key here is something unique(like id). Don't use indexes as keys */}
								{/* If your array has duplicate items and no distinguishing feature, then you would probably use index */}
								{animal}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						value={breed}
						onChange={(event) => setBreed(event.target.value)}
						onBlur={(event) => setBreed(event.target.value)}>
						<option />
						{breeds.map((breed) => (
							<option value={breed} key={breed}>
								{breed}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="theme">
					Button's Theme
					<select
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						onBlur={(e) => setTheme(e.target.value)}>
						<option value="darkblue">Dark Blue</option>
						<option value="red">Red</option>
						<option value="purple">Purple</option>
						<option value="peru">Peru</option>
						<option value="pink">Pink</option>
					</select>
				</label>
				<label htmlFor="textColor">
					Button's Text Color
					<select
						value={textColor}
						onChange={(e) => setTextColor(e.target.value)}
						onBlur={(e) => setTextColor(e.target.value)}>
						<option value="darkblue">Dark Blue</option>
						<option value="red">Red</option>
						<option value="purple">Purple</option>
						<option value="peru">Peru</option>
						<option value="black">Black</option>
					</select>
				</label>
				<button style={{ backgroundColor: theme, color: textColor }}>
					Submit
				</button>
			</form>
			<Results pets={pets} />
		</div>
	);
};

export default SearchParams;
