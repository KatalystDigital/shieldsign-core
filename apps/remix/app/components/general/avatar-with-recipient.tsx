import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import type { Recipient } from '@prisma/client';
import { DocumentStatus } from '@prisma/client';

import { useCopyToClipboard } from '@shieldsign/lib/client-only/hooks/use-copy-to-clipboard';
import { getRecipientType } from '@shieldsign/lib/client-only/recipient-type';
import { NEXT_PUBLIC_WEBAPP_URL } from '@shieldsign/lib/constants/app';
import { RECIPIENT_ROLES_DESCRIPTION } from '@shieldsign/lib/constants/recipient-roles';
import { recipientAbbreviation } from '@shieldsign/lib/utils/recipient-formatter';
import { cn } from '@shieldsign/ui/lib/utils';
import { useToast } from '@shieldsign/ui/primitives/use-toast';

import { StackAvatar } from './stack-avatar';

export type AvatarWithRecipientProps = {
  recipient: Recipient;
  documentStatus: DocumentStatus;
};

export function AvatarWithRecipient({ recipient, documentStatus }: AvatarWithRecipientProps) {
  const [, copy] = useCopyToClipboard();

  const { _ } = useLingui();
  const { toast } = useToast();

  const signingToken = documentStatus === DocumentStatus.PENDING ? recipient.token : null;

  const onRecipientClick = () => {
    if (!signingToken) {
      return;
    }

    void copy(`${NEXT_PUBLIC_WEBAPP_URL()}/sign/${signingToken}`).then(() => {
      toast({
        title: _(msg`Copied to clipboard`),
        description: _(msg`The signing link has been copied to your clipboard.`),
      });
    });
  };

  return (
    <div
      className={cn('my-1 flex items-center gap-2', {
        'cursor-pointer hover:underline': signingToken,
      })}
      role={signingToken ? 'button' : undefined}
      title={signingToken ? _(msg`Click to copy signing link for sending to recipient`) : undefined}
      onClick={onRecipientClick}
    >
      <StackAvatar
        first={true}
        key={recipient.id}
        type={getRecipientType(recipient)}
        fallbackText={recipientAbbreviation(recipient)}
      />

      <div
        className="text-muted-foreground text-sm"
        title={
          signingToken ? _(msg`Click to copy signing link for sending to recipient`) : undefined
        }
      >
        <p>{recipient.email}</p>
        <p className="text-muted-foreground/70 text-xs">
          {_(RECIPIENT_ROLES_DESCRIPTION[recipient.role].roleName)}
        </p>
      </div>
    </div>
  );
}
