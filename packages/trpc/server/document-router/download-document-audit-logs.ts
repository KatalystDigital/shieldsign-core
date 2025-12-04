import { EnvelopeType } from '@prisma/client';
import { DateTime } from 'luxon';

import { NEXT_PUBLIC_WEBAPP_URL } from '@shieldsign/lib/constants/app';
import { AppError, AppErrorCode } from '@shieldsign/lib/errors/app-error';
import { encryptSecondaryData } from '@shieldsign/lib/server-only/crypto/encrypt';
import { getEnvelopeById } from '@shieldsign/lib/server-only/envelope/get-envelope-by-id';
import { mapSecondaryIdToDocumentId } from '@shieldsign/lib/utils/envelope';

import { authenticatedProcedure } from '../trpc';
import {
  ZDownloadDocumentAuditLogsRequestSchema,
  ZDownloadDocumentAuditLogsResponseSchema,
} from './download-document-audit-logs.types';

export const downloadDocumentAuditLogsRoute = authenticatedProcedure
  .input(ZDownloadDocumentAuditLogsRequestSchema)
  .output(ZDownloadDocumentAuditLogsResponseSchema)
  .mutation(async ({ input, ctx }) => {
    const { teamId } = ctx;
    const { documentId } = input;

    ctx.logger.info({
      input: {
        documentId,
      },
    });

    const envelope = await getEnvelopeById({
      id: {
        type: 'documentId',
        id: documentId,
      },
      type: EnvelopeType.DOCUMENT,
      userId: ctx.user.id,
      teamId,
    }).catch(() => null);

    if (!envelope) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'You do not have access to this document.',
      });
    }

    const encrypted = encryptSecondaryData({
      data: mapSecondaryIdToDocumentId(envelope.secondaryId).toString(),
      expiresAt: DateTime.now().plus({ minutes: 5 }).toJSDate().valueOf(),
    });

    return {
      url: `${NEXT_PUBLIC_WEBAPP_URL()}/__htmltopdf/audit-log?d=${encrypted}`,
    };
  });
