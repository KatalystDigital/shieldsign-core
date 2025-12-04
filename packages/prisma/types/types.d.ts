/* eslint-disable @typescript-eslint/no-namespace */
import type {
  TDocumentAuthOptions,
  TRecipientAuthOptions,
} from '@shieldsign/lib/types/document-auth';
import type { TDocumentEmailSettings } from '@shieldsign/lib/types/document-email';
import type { TDocumentFormValues } from '@shieldsign/lib/types/document-form-values';
import type { TEnvelopeAttachmentType } from '@shieldsign/lib/types/envelope-attachment';
import type { TFieldMetaNotOptionalSchema } from '@shieldsign/lib/types/field-meta';
import type { TClaimFlags } from '@shieldsign/lib/types/subscription';

/**
 * Global types for Prisma.Json instances.
 */
declare global {
  namespace PrismaJson {
    type ClaimFlags = TClaimFlags;

    type DocumentFormValues = TDocumentFormValues;
    type DocumentAuthOptions = TDocumentAuthOptions;
    type DocumentEmailSettings = TDocumentEmailSettings;
    type DocumentEmailSettingsNullable = TDocumentEmailSettings | null;

    type RecipientAuthOptions = TRecipientAuthOptions;

    type FieldMeta = TFieldMetaNotOptionalSchema;

    type EnvelopeAttachmentType = TEnvelopeAttachmentType;
  }
}

export {};
