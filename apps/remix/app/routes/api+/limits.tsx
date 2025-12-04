import { limitsHandler } from '@shieldsign/ee/server-only/limits/handler';

import type { Route } from './+types/limits';

export async function loader({ request }: Route.LoaderArgs) {
  return limitsHandler(request);
}
