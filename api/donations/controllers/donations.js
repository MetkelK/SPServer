"use strict";

const stripe = require("stripe")(process.env.STRIPE_KEY);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async setUpStripeSession(ctx) {
    const { amount } = ctx.request.body;
    const configuredAmount = amount * 100;

    const session = await stripe.checkout.sessions.create({
      success_url: "https://sick-pay-fund.vercel.app/success",
      cancel_url: "https://sick-pay-fund.vercel.app/donation",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            unit_amount: configuredAmount,
            currency: "cad",
            product_data: {
              name: "donation",
              description: "donation amount",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });
    ctx.send({ id: session.id });
  },
};
