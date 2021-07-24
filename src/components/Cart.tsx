import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { PizzaOrderState } from "libs/usePizzaOrder";
import { VFC } from "react";

interface CartProps {
	state: PizzaOrderState;
}

const Cart: VFC<CartProps> = ({ state }) => {
	return (
		<>
			<Box>Pizza: {state?.pizza?.name}</Box>
			<Box>
				Toppings:
				<UnorderedList>
					<ListItem>Lorem ipsum dolor sit amet</ListItem>
					<ListItem>Consectetur adipiscing elit</ListItem>
					<ListItem>Integer molestie lorem at massa</ListItem>
					<ListItem>Facilisis in pretium nisl aliquet</ListItem>
				</UnorderedList>
			</Box>
		</>
	);
};

export default Cart;
