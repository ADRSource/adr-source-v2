import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import { Card, CardBody, CardTag } from '~/components/card';
import { IconArrowTopRight } from '~/components/icons/IconArrowTopRight';
import { IconExternalLink } from '~/components/icons/IconExternalLink';
import { CircleButton } from '~/components/ui/button';
import { heading, text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import type {
  ExternalResourceInfoFragment,
  InternalResourceInfoFragment,
} from '~/graphql/generated/cms.generated';

export function ResourceCard({
  resource,
  type,
}: {
  resource: InternalResourceInfoFragment | ExternalResourceInfoFragment;
  type?: string;
}) {
  switch (resource.__typename) {
    case 'InternalResource': {
      const { title, excerpt, slug } = resource;
      return (
        <Card>
          {type != null ? <CardTag>{type}</CardTag> : null}
          <CardBody>
            <h3 className={heading({ type: '6', className: 'leading-none' })}>{title}</h3>
            <RichText
              content={excerpt.raw as RichTextContent}
              renderers={{
                p: ({ children }) => (
                  <p className={text({ type: 'body', className: 'line-clamp-3' })}>{children}</p>
                ),
              }}
            />
          </CardBody>
          <CircleButton
            href={`${PATHS.resources}/${slug}`}
            size="small"
            className="linkOverlay opacity-25 transition-opacity group-hover:opacity-100"
          >
            <span className="sr-only">Navigate to: {title}</span>
            <IconArrowTopRight aria-hidden />
          </CircleButton>
        </Card>
      );
    }
    case 'ExternalResource': {
      const { title, excerpt, url } = resource;
      return (
        <Card>
          {type != null ? <CardTag>{type}</CardTag> : null}
          <CardBody>
            <h3 className={heading({ type: '6', className: 'leading-none' })}>{title}</h3>
            <RichText
              content={excerpt.raw as RichTextContent}
              renderers={{
                p: ({ children }) => (
                  <p className={text({ type: 'body', className: 'line-clamp-3' })}>{children}</p>
                ),
              }}
            />
          </CardBody>
          <CircleButton
            href={url}
            size="small"
            className="linkOverlay opacity-25 transition-opacity group-hover:opacity-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Navigate to: {title}</span>
            <IconExternalLink aria-hidden />
          </CircleButton>
        </Card>
      );
    }
    default: {
      return null;
    }
  }
}
