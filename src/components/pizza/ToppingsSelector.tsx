import { Box, HStack } from "@chakra-ui/react";
import { Topping, ToppingType } from "api/types";
import { useEffect, useState, VFC } from "react";

import ToppingImage from "./ToppingImage";

interface ToppingsSelectorProps {
	toppings: Topping[] | undefined;
	onChange: (toppings: ToppingType[]) => void;
}

const ToppingsSelector: VFC<ToppingsSelectorProps> = ({ toppings, onChange }) => {
	const [selected, setSelected] = useState<Topping["id"][]>([]);

	const handleChange = (topping: Topping): void => {
		if (!selected.includes(topping.id)) {
			setSelected([...selected, topping.id]);
		} else {
			setSelected(
				selected.filter((toppingId) => {
					return toppingId !== topping.id;
				}),
			);
		}
	};

	useEffect(() => {
		onChange(selected);
	}, [onChange, selected]);

	if (!toppings) {
		return null;
	}

	return (
		<HStack spacing="24px">
			{toppings.map((topping) => {
				return (
					<Box
						__css={{
							textAlign: "center",
							border: `${selected.includes(topping.id) ? "1px solid white" : "none"}`,
						}}
						key={topping.id}
						onClick={handleChange.bind(null, topping)}
					>
						{topping.name} {topping.price}$
						<Box width="50px" height="50px">
							<ToppingImage topping={topping} />
						</Box>
					</Box>
				);
			})}
		</HStack>
	);
};

export default ToppingsSelector;
