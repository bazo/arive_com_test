import { Focused } from "react-credit-cards";

export enum PizzaSize {
	SMALL = "small",
	MEDIUM = "medium",
	LARGE = "large",
}

export interface Pizza {
	id: PizzaSize;
	name: string;
	price: number;
}

export type ToppingType = "olives" | "pepperoni" | "mushrooms" | "pepper";

export interface Topping {
	id: ToppingType;
	name: string;
	price: number;
}

export interface OrderPayload {
	pizza: {
		pizzaSize: PizzaSize;
		toppings: Topping["id"][];
	};
	payment: {
		cardNumber: string;
		customer: string;
	};
}

export interface OrderResponse extends OrderPayload {
	id: string;
	time: string;
	price: number;
}

export interface Card {
	cvc: string;
	expiry: string;
	focus: Focused | undefined;
	name: string;
	number: string;
}
