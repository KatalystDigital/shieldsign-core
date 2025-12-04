import { z } from 'zod';

import { ZOrganisationEmailManySchema } from '@shieldsign/lib/types/organisation-email';
import { ZFindResultResponse, ZFindSearchParamsSchema } from '@shieldsign/lib/types/search-params';

export const ZFindOrganisationEmailsRequestSchema = ZFindSearchParamsSchema.extend({
  organisationId: z.string(),
  emailDomainId: z.string().optional(),
});

export const ZFindOrganisationEmailsResponseSchema = ZFindResultResponse.extend({
  data: ZOrganisationEmailManySchema.array(),
});

export type TFindOrganisationEmailsResponse = z.infer<typeof ZFindOrganisationEmailsResponseSchema>;
