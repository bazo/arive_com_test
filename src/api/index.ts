import { Card, OrderPayload, Pizza, Topping, ToppingType } from "./types";

export async function fetchOrders(): Promise<OrderPayload[]> {
	const response = await fetch("/orders", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export async function fetchPizzas(): Promise<Pizza[]> {
	const response = await fetch("/pizzas", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export async function fetchToppings(): Promise<Topping[]> {
	const response = await fetch("/toppings", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.json();
}

export async function createOrder({ pizza, toppings, card }: { pizza: Pizza; toppings: ToppingType[]; card: Card }): Promise<OrderPayload> {
	const payload: OrderPayload = {
		pizza: {
			pizzaSize: pizza.id,
			toppings: toppings,
		},
		payment: {
			cardNumber: card.number, //in real case this would be some hash from payment service
		},
	};

	console.log({ payload });

	const response = await fetch("/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	return response.json();
}
