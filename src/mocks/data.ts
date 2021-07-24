import { Pizza, PizzaSize, Topping } from "api/types";

export const pizzas: Pizza[] = [
	{
		id: PizzaSize.SMALL,
		name: "Small",
		price: 15,
	},
	{
		id: PizzaSize.MEDIUM,
		name: "Medium",
		price: 20,
	},
	{
		id: PizzaSize.LARGE,
		name: "Large",
		price: 25,
	},
];

export const toppings: Topping[] = [
	{
		id: "olives",
		name: "Olives",
		price: 3,
	},
	{
		id: "pepperoni",
		name: "Pepperoni",
		price: 4,
	},
	{
		id: "mushrooms",
		name: "Mushrooms",
		price: 2,
	},
	{
		id: "pepper",
		name: "Pepper",
		price: 2,
	},
];
