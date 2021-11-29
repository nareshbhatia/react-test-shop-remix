import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from 'remix';
import type { ActionFunction, LoaderFunction, MetaFunction } from 'remix';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import {
  CartSummary,
  Header,
  HorizontalContainer,
  ScrollingContainer,
  TextField,
  ViewVerticalContainer,
} from '../components';
import { Cart, Catalog } from '../models';
import { API_URL, yupLocale, yupToFormErrors } from '../utils';

type CheckoutPageData = {
  cart: Cart;
};

export let loader: LoaderFunction = async () => {
  const resCart = await fetch(`${API_URL}/cart`);
  const cart = await resCart.json();

  let data: CheckoutPageData = {
    cart,
  };

  return json(data);
};

export let action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();

  // set up yup errors
  yup.setLocale(yupLocale);

  const addressSchema = yup.object().shape({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    company: yup.string(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
  });

  const address = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    company: formData.get('company'),
    address: formData.get('address'),
    city: formData.get('city'),
    state: formData.get('state'),
    zip: formData.get('zip'),
  };

  try {
    await addressSchema.validate(address, { abortEarly: false });
    await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shippingAddress: address }),
    });
    return redirect('/orders');
  } catch (e) {
    const errors = yupToFormErrors(e as ValidationError);
    return errors;
  }
};

export let meta: MetaFunction = () => {
  return {
    title: 'React Test Shop',
    description: 'Welcome to React Test Shop!',
  };
};

export default function CheckoutPage() {
  let { cart } = useLoaderData<CheckoutPageData>();
  let errors = useActionData();
  let transition = useTransition();

  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0 container">
        <ScrollingContainer className="flex-1 my-2">
          <Form method="post">
            <h2>Checkout</h2>

            <h3 className="mt-3 mb-3">Shipping Address</h3>
            <div className="mb-2">
              <TextField
                id="firstName"
                name="firstName"
                label="First name"
                error={errors?.firstName}
              />
            </div>
            <div className="mb-2">
              <TextField
                id="lastName"
                name="lastName"
                label="Last name"
                error={errors?.lastName}
              />
            </div>
            <div className="mb-2">
              <TextField
                id="company"
                name="company"
                label="Company (optional)"
                error={errors?.company}
              />
            </div>
            <div className="mb-2">
              <TextField
                id="address"
                name="address"
                label="Address"
                error={errors?.address}
              />
            </div>

            <HorizontalContainer>
              <div className="mb-2 flex-2">
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  error={errors?.city}
                />
              </div>
              <div className="mb-2 ml-1 flex-1">
                <TextField
                  id="state"
                  name="state"
                  label="State"
                  error={errors?.state}
                />
              </div>
              <div className="ml-1 flex-1">
                <TextField
                  id="zip"
                  name="zip"
                  label="Zip"
                  error={errors?.zip}
                />
              </div>
            </HorizontalContainer>

            <button className="btn btn-lg btn-secondary mt-2" type="submit">
              {transition.submission ? 'Placing...' : 'Place your order'}
            </button>
          </Form>
        </ScrollingContainer>
        <ScrollingContainer className="paper border-paper ml-2 my-2 p-2 w-400">
          <CartSummary cart={cart} />
        </ScrollingContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
}
