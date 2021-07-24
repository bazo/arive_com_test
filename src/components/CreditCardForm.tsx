//from https://github.com/amaroteam/react-credit-cards
import "react-credit-cards/es/styles-compiled.css";

import { Box, FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import { Card } from "api/types";
import { ChangeEvent, useState, VFC } from "react";
import Cards, { Focused } from "react-credit-cards";

interface CreditCardFormProps {
	onChange: (card: Card) => void;
	value: Card;
}

const CreditCardForm: VFC<CreditCardFormProps> = ({ onChange, value }) => {
	const [state, setState] = useState(value);

	const handleInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
		const newState = { ...state, focus: e.target.name as Focused };
		setState(newState);
		onChange(newState);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const newState = { ...state, [name]: value };
		setState(newState);
		onChange(newState);
	};

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap={6}>
			<Cards cvc={state.cvc} expiry={state.expiry} focused={state.focus} name={state.name} number={state.number} />
			<Box>
				<FormControl id="number">
					<FormLabel>Card number</FormLabel>
					<Input
						type="tel"
						name="number"
						placeholder="Card Number"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
						value={state.number}
						maxLength={16}
					/>
				</FormControl>
				<FormControl id="name">
					<FormLabel>Your name</FormLabel>
					<Input
						type="text"
						name="name"
						placeholder="Your name"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
						value={state.name}
					/>
				</FormControl>
				<FormControl id="number">
					<FormLabel>Expiry</FormLabel>
					<Input
						type="text"
						name="expiry"
						placeholder="Expiry"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
						value={state.expiry}
						maxLength={4}
					/>
				</FormControl>
				<FormControl id="cvc">
					<FormLabel>CVC</FormLabel>
					<Input
						type="tel"
						name="cvc"
						placeholder="cvc"
						onChange={handleInputChange}
						onFocus={handleInputFocus}
						value={state.cvc}
						maxLength={3}
					/>
				</FormControl>
			</Box>
		</Grid>
	);
};

export default CreditCardForm;
