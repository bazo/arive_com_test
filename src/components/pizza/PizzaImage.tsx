import { Image } from "@chakra-ui/react";
import { PizzaSize } from "api/types";
import pizzaLarge from "assets/pizza_large.svg";
import pizzaMedium from "assets/pizza_medium.svg";
import pizzaSmall from "assets/pizza_small.svg";
import { VFC } from "react";

interface PizzaImageProps {
	size: PizzaSize;
}

const pizzaImageMap = {
	[PizzaSize.SMALL]: pizzaSmall,
	[PizzaSize.MEDIUM]: pizzaMedium,
	[PizzaSize.LARGE]: pizzaLarge,
};

const PizzaImage: VFC<PizzaImageProps> = ({ size }) => {
	return <Image src={pizzaImageMap[size]} />;
};

export default PizzaImage;
