import { OrderPayload, Pizza, PizzaSize, Topping } from "api/types";
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

function saveOrders(orders: OrderPayload[]) {
	localStorage.setItem(STORAGE_NAMESPACE, JSON.stringify(orders));
}

function decodeOrders(): OrderPayload[] {
	return (JSON.parse(localStorage.getItem(STORAGE_NAMESPACE) as string) || []) as OrderPayload[];
}
/*
function createOrder(pizza: Pizza, toppings: Topping[]): OrderPayload {
	return {
		pizzaSize: pizza.id,
		toppings: toppings.map(({ id }) => id),
	};
}
*/
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

		const newOrder = req.body;

		orders.push(newOrder);

		saveOrders(orders);

		return res(ctx.status(201), ctx.json(newOrder));
	}),
];
