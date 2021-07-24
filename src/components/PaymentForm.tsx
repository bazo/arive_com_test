import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Card } from "api/types";
import cardValidator from "card-validator";
import { ValidationErrors } from "final-form";
import { MutableRefObject } from "react";
import { Field, Form, FormRenderProps } from "react-final-form";

import CreditCardForm from "./CreditCardForm";

export interface PaymentFormValues {
	card: Card;
}

interface PaymentFormProps {
	onSubmit: (values: PaymentFormValues) => void;
	submitRef?: MutableRefObject<FormRenderProps["handleSubmit"] | undefined>;
}

const initialState = {
	card: {
		cvc: "123",
		expiry: "1225",
		focus: undefined,
		name: "John Doe",
		number: "4111111111111111",
	},
};

const PaymentForm = ({ onSubmit, submitRef }: PaymentFormProps) => {
	const validate = (values: PaymentFormValues): ValidationErrors | Promise<ValidationErrors> => {
		if (values.card) {
			const res = cardValidator.number(values.card.number);
			if (!res.isValid) {
				return { card: "Card number is not valid" };
			}
		}
		return {};
	};

	return (
		<>
			<Form<PaymentFormValues>
				onSubmit={onSubmit}
				validate={validate}
				initialValues={initialState}
				validateOnBlur
				render={({ handleSubmit }) => {
					if (submitRef) {
						submitRef.current = handleSubmit;
					}
					return (
						<form onSubmit={handleSubmit}>
							<Field name="card">
								{({ input, meta }) => {
									return (
										<>
											<CreditCardForm onChange={input.onChange} value={input.value} />
											<FormControl id="name" isInvalid={meta.touched && meta.error}>
												<FormErrorMessage>{meta.error}</FormErrorMessage>
											</FormControl>
										</>
									);
								}}
							</Field>
						</form>
					);
				}}
			/>
		</>
	);
};

export default PaymentForm;
