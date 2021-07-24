import { Box, Button, Flex, Grid, Heading, Spinner, StackDivider, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { createOrder, fetchPizzas, fetchToppings } from "api";
import Cart from "components/Cart";
import Modal from "components/Modal";
import PaymentForm, { PaymentFormValues } from "components/PaymentForm";
import PizzaSizeSelector from "components/pizza/PizzaSizeSelector";
import ToppingsSelector from "components/pizza/ToppingsSelector";
import usePizzaOrder from "libs/usePizzaOrder";
import { useRef, VFC } from "react";
import { FormRenderProps } from "react-final-form";
import { useMutation, useQuery } from "react-query";

const QUERY_KEY_PIZZAS = "pizzas";
const QUERY_KEY_TOPPINGS = "toppings";

const PizzaPage: VFC = () => {
	const { state, selectPizza, selectToppings } = usePizzaOrder();

	const submitRef = useRef<FormRenderProps["handleSubmit"]>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();

	const { data: pizzas, isLoading: isLoadingPizzas } = useQuery([QUERY_KEY_PIZZAS], fetchPizzas);
	const { data: toppings, isLoading: isLoadingToppings } = useQuery([QUERY_KEY_TOPPINGS], fetchToppings);

	const isLoading = isLoadingPizzas || isLoadingToppings;

	const createMutation = useMutation(createOrder, {
		onSuccess: () => {
			//queryClient.invalidateQueries(QUERY_KEY);
			toast({
				title: "Pizza order created.",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		},
	});

	const handleSubmit = (values: PaymentFormValues) => {
		createMutation.mutate({
			pizza: state.pizza,
			toppings: state.toppings,
			card: values.card,
		});
		onClose();
	};

	if (isLoading) {
		return <Spinner size="xl" />;
	}

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={6}>
			<Box>
				<VStack divider={<StackDivider />} spacing={10} align="stretch">
					<Flex>
						<Heading as="h2">Create a Pizza</Heading>
					</Flex>
					<PizzaSizeSelector pizzas={pizzas} onChange={selectPizza} />
					<ToppingsSelector toppings={toppings} onChange={selectToppings} />
					<Button colorScheme="green" disabled={!state.canSubmit} onClick={onOpen}>
						Order you pizza!
					</Button>
				</VStack>
				{
					<Modal
						title="Please pay for your pizza"
						isOpen={isOpen}
						onClose={onClose}
						body={<PaymentForm onSubmit={handleSubmit} submitRef={submitRef} />}
						buttons={[
							<Button
								colorScheme="green"
								key="submit"
								onClick={() => {
									if (submitRef.current) {
										submitRef.current();
									}
								}}
							>
								Pay
							</Button>,
						]}
					></Modal>
				}
			</Box>
			<Box>
				<Heading as="h2">Your order</Heading>
				<Cart state={state} />
			</Box>
		</Grid>
	);
};

export default PizzaPage;
