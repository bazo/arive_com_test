import { Box, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { fetchOrders } from "api";
import { VFC } from "react";
import { useQuery } from "react-query";

const QUERY_KEY = "orders";

const OrdersPage: VFC = () => {
	const { data: orders, isLoading } = useQuery([QUERY_KEY], fetchOrders);

	if (isLoading) {
		return <Spinner size="xl" />;
	}

	return (
		<Box>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Time</Th>
						<Th>Pizza</Th>
						<Th>Toppings</Th>
						<Th>Customer</Th>
						<Th>Price</Th>
					</Tr>
				</Thead>
				<Tbody>
					{orders?.map((order) => {
						return (
							<Tr key={order.id}>
								<Td>{new Date(order.time).toLocaleString()}</Td>
								<Td>{order.pizza.pizzaSize}</Td>
								<Td>{order.pizza.toppings.join(",")}</Td>
								<Td>{order.payment.customer}</Td>
								<Td>{order.price}$</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Box>
	);
};

export default OrdersPage;
