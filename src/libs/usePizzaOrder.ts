import { Pizza, ToppingType } from "api/types";
import { useCallback, useReducer } from "react";

const initialState = {
	pizza: null as unknown as Pizza,
	toppings: [] as ToppingType[],
	canSubmit: false,
};

export type PizzaOrderState = typeof initialState;

function canSubmit(state: PizzaOrderState): boolean {
	return state.pizza !== null && state.toppings.length > 0;
}

type Action = { type: "selectPizza"; pizza: Pizza } | { type: "selectToppings"; toppings: ToppingType[] };

function reducer(state: PizzaOrderState, action: Action) {
	switch (action.type) {
		case "selectPizza": {
			const newState = { ...state, pizza: action.pizza };
			return { ...newState, canSubmit: canSubmit(newState) };
		}
		case "selectToppings": {
			const newState = { ...state, toppings: action.toppings };
			return { ...newState, canSubmit: canSubmit(newState) };
		}
		default:
			throw new Error();
	}
}

export default function usePizzaOrder() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return {
		state,
		selectPizza: useCallback((pizza: Pizza) => {
			dispatch({ type: "selectPizza", pizza });
		}, []),
		selectToppings: useCallback((toppings: ToppingType[]) => {
			dispatch({ type: "selectToppings", toppings });
		}, []),
	};
}
