import { Pizza, Topping, ToppingType } from "api/types";

export const getToppingById = (id: Topping["id"], toppings: Topping[]): Topping | undefined => toppings.find((topping) => topping.id === id);

export const getPizzaBySize = (size: Pizza["id"], pizzas: Pizza[]): Pizza | undefined => pizzas.find((pizza) => pizza.id === size);

export const getTotalPrice = (pizza: Pizza, toppingIds: ToppingType[], toppings: Topping[]): number => {
	let price = pizza?.price || 0;
	toppingIds.forEach((toppingId) => {
		const topping = getToppingById(toppingId, toppings);
		price += topping?.price || 0;
	});

	return price;
};
