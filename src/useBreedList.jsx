import { useState, useEffect } from "react";

const localCache = {};

// Concept: Custom Hooks

export default function useBreedList(animal) {
	const [breedList, setBreedList] = useState([]);

	/* This is just a string that represents what then state of the hook is in. Also, this thing is not necessary. We are doing this because if, say
      more than one developers are gonna use it. So, they will know whether someone has ever called it, whether new stuff is loading or the stuff is already loaded. */
	const [status, setStatus] = useState("unloaded");

	useEffect(() => {
		if (!animal) {
			setBreedList([]);
		} else if (localCache[animal]) {
			setBreedList(localCache[animal]);
		} else requestBreedList();

		async function requestBreedList() {
			/* We are setting breed list to empty because, suppose we have currently chosen dogs of breeds say, husky. Then I request for cat breeds. So I
         have emptied the breed list because we do not want any wierd interim state where breed is Husky and animal is Cat. because it makes no sense
         that there exist "cats that are huskies." */
			setBreedList([]);
			setStatus("loading");

			const res = await fetch(
				`http://pets-v2.dev-apis.com/breeds?animal=${animal}`
			);

			const json = await res.json();

			/* we are also using "|| []", because if for some reason, api was down or something, we do not want our application to crash. So in the worst
         case sccenario, localCache will store an empty array. Although this might cause a cache problem, but it is probaly better than application crashing */
			localCache[animal] = json.breeds || [];
			setBreedList(localCache[animal]);
			setStatus("loaded");
		}
	}, [animal]); // Every time we get a new animal, we want to re-run our effect

	return [breedList, status]; // You can also return an object
}
