import { Image } from "@chakra-ui/react";
import { Topping } from "api/types";
import mushrooms from "assets/mushrooms.svg";
import olives from "assets/olives.svg";
import pepper from "assets/pepper.svg";
import pepperoni from "assets/pepperoni.svg";
import { VFC } from "react";

interface ToppingImageProps {
	topping: Topping;
}

const toppingImageMap = {
	pepperoni,
	olives,
	mushrooms,
	pepper,
};

const ToppingImage: VFC<ToppingImageProps> = ({ topping }) => {
	return <Image src={toppingImageMap[topping.id]} />;
};

export default ToppingImage;
