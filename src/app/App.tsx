import { Container } from "@chakra-ui/react";
import Header from "components/Header";
import OrdersPage from "pages/OrdersPage";
import PizzaPage from "pages/PizzaPage";
import { VFC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const queryClient = new QueryClient();

const App: VFC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Header />
				<Container maxW="container.xl" marginTop="5">
					<Switch>
						<Route path="/orders" exact>
							<OrdersPage />
						</Route>
						<Route path="/" exact>
							<PizzaPage />
						</Route>
					</Switch>
				</Container>
			</Router>
		</QueryClientProvider>
	);
};

export default App;
