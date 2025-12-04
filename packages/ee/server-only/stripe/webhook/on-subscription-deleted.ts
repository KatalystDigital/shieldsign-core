import { SubscriptionStatus } from '@prisma/client';

import type { Stripe } from '@shieldsign/lib/server-only/stripe';
import { prisma } from '@shieldsign/prisma';

export type OnSubscriptionDeletedOptions = {
  subscription: Stripe.Subscription;
};

export const onSubscriptionDeleted = async ({ subscription }: OnSubscriptionDeletedOptions) => {
  await prisma.subscription.update({
    where: {
      planId: subscription.id,
    },
    data: {
      status: SubscriptionStatus.INACTIVE,
    },
  });
};
