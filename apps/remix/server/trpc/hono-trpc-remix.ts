import { trpcServer } from '@hono/trpc-server';

import { createTrpcContext } from '@shieldsign/trpc/server/context';
import { appRouter } from '@shieldsign/trpc/server/router';
import { handleTrpcRouterError } from '@shieldsign/trpc/utils/trpc-error-handler';

/**
 * Trpc server for internal routes like /api/trpc/*
 */
export const reactRouterTrpcServer = trpcServer({
  router: appRouter,
  endpoint: '/api/trpc',
  createContext: async (_, c) => createTrpcContext({ c, requestSource: 'app' }),
  onError: (opts) => handleTrpcRouterError(opts, 'trpc'),
});
