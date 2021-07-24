import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PizzaPage from "pages/PizzaPage";
import { handlers } from "mocks/handlers";
import { QueryClient, QueryClientProvider } from "react-query";
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

test("displays loading", async () => {
	render(
		<QueryClientProvider client={queryClient}>
			<PizzaPage />
		</QueryClientProvider>,
	);

	await waitFor(() => {
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});
});
