import { OrderPayload, OrderResponse, Pizza, PizzaSize, Topping } from "api/types";
import { rest, RestRequest } from "msw";

const pizzas: Pizza[] = [
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

const toppings: Topping[] = [
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

const STORAGE_NAMESPACE = "pizzas";

function saveOrders(orders: OrderResponse[]) {
	localStorage.setItem(STORAGE_NAMESPACE, JSON.stringify(orders));
}

function decodeOrders(): OrderResponse[] {
	return (JSON.parse(localStorage.getItem(STORAGE_NAMESPACE) as string) || []) as OrderResponse[];
}

function createOrder(payload: OrderPayload): OrderResponse {
	return {
		id: Math.random().toString(36).substr(2, 9),
		time: new Date().toISOString(),
		...payload,
	};
}

export const handlers = [
	rest.get("/pizzas", (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(pizzas));
	}),

	rest.get("/toppings", (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(toppings));
	}),

	rest.get("/orders", (req, res, ctx) => {
		return res(ctx.status(200), ctx.text(localStorage.getItem(STORAGE_NAMESPACE) as string));
	}),

	rest.post("/orders", (req: RestRequest<OrderPayload>, res, ctx) => {
		const orders = decodeOrders();

		const newOrder = createOrder(req.body);

		orders.push(newOrder);

		saveOrders(orders);

		return res(ctx.status(201), ctx.json(newOrder));
	}),
];
