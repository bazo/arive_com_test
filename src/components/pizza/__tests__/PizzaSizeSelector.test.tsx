import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PizzaSizeSelector from "../PizzaSizeSelector";
import { pizzas } from "mocks/data";
import { PizzaSize } from "api/types";

test("displays loading", async () => {
	const onChange = jest.fn();
	render(<PizzaSizeSelector pizzas={pizzas} onChange={onChange} />);

	expect(screen.getByTestId(PizzaSize.SMALL)).toBeInTheDocument();
	expect(screen.getByTestId(PizzaSize.MEDIUM)).toBeInTheDocument();
	expect(screen.getByTestId(PizzaSize.LARGE)).toBeInTheDocument();

	fireEvent.click(screen.getByTestId(PizzaSize.LARGE));

	expect(onChange).toHaveBeenCalledWith(pizzas[2]);
});
