import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { Topping } from "api/types";
import { getToppingById } from "libs/functions";
import { PizzaOrderState } from "libs/usePizzaOrder";
import { VFC } from "react";

interface CartProps {
	state: PizzaOrderState;
	toppings?: Topping[];
}

const Cart: VFC<CartProps> = ({ state, toppings }) => {
	if (!toppings) {
		return null;
	}

	let price = state?.pizza?.price || 0;
	return (
		<>
			<Box>
				Pizza: {state?.pizza?.name} {state?.pizza?.price}$
			</Box>
			<Box>
				Toppings:
				<UnorderedList>
					{state?.toppings.map((toppingId) => {
						const topping = getToppingById(toppingId, toppings);
						price += topping?.price || 0;
						return (
							<ListItem key={toppingId}>
								{topping?.name} {topping?.price}$
							</ListItem>
						);
					})}
				</UnorderedList>
			</Box>
			<Box>
				Total: <strong>{price}$</strong>
			</Box>
		</>
	);
};

export default Cart;
