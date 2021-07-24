import { Box, HStack } from "@chakra-ui/react";
import { Pizza } from "api/types";
import { useState, VFC } from "react";

import PizzaImage from "./PizzaImage";

interface PizzaSizeSelectorProps {
	pizzas: Pizza[] | undefined;
	onChange: (pizza: Pizza) => void;
}

const PizzaSizeSelector: VFC<PizzaSizeSelectorProps> = ({ pizzas, onChange }) => {
	const [selected, select] = useState<Pizza>();

	const handleChange = (pizza: Pizza): void => {
		select(pizza);
		onChange(pizza);
	};

	if (!pizzas) {
		return null;
	}

	return (
		<HStack spacing="24px">
			{pizzas.map((pizza) => {
				return (
					<Box
						__css={{ cursor: "pointer", textAlign: "center", border: `${selected?.id === pizza.id ? "1px solid white" : "none"}` }}
						key={pizza.id}
						onClick={handleChange.bind(null, pizza)}
					>
						{pizza.name} {pizza.price}$
						<Box width="200px" height="80px">
							<PizzaImage size={pizza.id} />
						</Box>
					</Box>
				);
			})}
		</HStack>
	);
};

export default PizzaSizeSelector;
