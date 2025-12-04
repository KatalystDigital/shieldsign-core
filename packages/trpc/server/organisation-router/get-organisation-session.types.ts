import { z } from 'zod';

import { ZOrganisationSchema } from '@shieldsign/lib/types/organisation';
import { OrganisationMemberRole, TeamMemberRole } from '@shieldsign/prisma/generated/types';
import SubscriptionSchema from '@shieldsign/prisma/generated/zod/modelSchema/SubscriptionSchema';
import TeamSchema from '@shieldsign/prisma/generated/zod/modelSchema/TeamSchema';

export const ZGetOrganisationSessionResponseSchema = ZOrganisationSchema.extend({
  teams: z.array(
    TeamSchema.pick({
      id: true,
      name: true,
      url: true,
      createdAt: true,
      avatarImageId: true,
      organisationId: true,
    }).extend({
      currentTeamRole: z.nativeEnum(TeamMemberRole),
      preferences: z.object({
        aiFeaturesEnabled: z.boolean(),
      }),
    }),
  ),
  subscription: SubscriptionSchema.nullable(),
  currentOrganisationRole: z.nativeEnum(OrganisationMemberRole),
}).array();

export type TGetOrganisationSessionResponse = z.infer<typeof ZGetOrganisationSessionResponseSchema>;

export type TeamSession = TGetOrganisationSessionResponse[number]['teams'][number];
export type OrganisationSession = TGetOrganisationSessionResponse[number];
