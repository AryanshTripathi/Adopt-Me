import Pet from "./Pet";

/* Here we have used simple destructuring as a result of which we can simply use "pets" instead of "props.pets" if used
   just (props) instead of ({pets}) */
const Results = ({ pets }) => {
	return (
		<div className="search">
			{!pets.length ? (
				<h2>No Pets Found</h2>
			) : (
				// You can also destructure the (pet) into ({animal, key, ....}) if you want to
				pets.map((pet) => (
					<Pet
						animal={pet.animal}
						/* So there is q very basic quuestion that comes to mind i.e. we are already giving "pet.id" to "key", can't
               I just refer to key place instead of "id". The answer is no, you can't. "Key" is only used by react to keep
               track of changes.So basically it removes that key place when React passes it down to you. In other words,
               you can not have a props named "key" ever. Only a few are reserved, "key" is one and "childeren" is the
               other.
               So, what is "children"? You can actually pass down rendered components inside of something called "children"
               We'll talk more about it later. */
						key={pet.id}
						name={pet.name}
						breed={pet.breed}
						images={pet.images}
						location={`${pet.city}, ${pet.state}`}
						id={pet.id}></Pet>

					/* There is one lazy way of writing the <Pet> ....</Pet> snippet. But it is not a good idea in general.
          <Pet>
            {...pet}
            key = {pet.id}
          </Pet>
          The problem is that using spread operator makes so much harder to read what am I actually getting from Pet
          component and I have to take a look at pet component explicitally for that */
				))
			)}
		</div>
	);
};

export default Results;
