import { RichText as HygraphRichText } from '@graphcms/rich-text-react-renderer';
import { EmbedReferences, RichTextContent } from '@graphcms/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { text } from '~/components/ui/text';
import { PATHS } from '~/constants/paths.constants';
import styles from './rich-text.module.css';

export function RichText({
  content,
  references,
}: {
  content: RichTextContent;
  references: EmbedReferences;
}) {
  return (
    <div className={twMerge(styles.root, 'flex w-full flex-col items-center')}>
      <HygraphRichText
        content={content}
        renderers={{
          h2: ({ children }) => {
            return (
              <h2 className="mb-[1em] mt-[2em] text-left font-sans text-xl leading-none">
                {children}
              </h2>
            );
          },
          p: ({ children }) => {
            return (
              <p
                className={text({
                  type: 'body',
                  className: 'mb-[1em] mt-[1em] empty:hidden',
                })}
              >
                {children}
              </p>
            );
          },
          img: ({ altText, src, width, height }) => {
            if (src == null) return <></>;
            return (
              <Image
                className="mb-4 mt-[calc(theme(spacing.4)_-_1em)] w-full max-w-4xl overflow-clip rounded-lg bg-brand-black first-of-type:mt-0"
                src={src}
                alt={altText ?? ''}
                width={width}
                height={height}
              />
            );
          },
          a: ({ children, href, openInNewTab, ...rest }) => {
            if (href == null) return <></>;

            return (
              <Link
                href={href}
                {...((openInNewTab ?? false)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                {...rest}
                className="text-brand-toffee underline"
              >
                {children}
              </Link>
            );
          },
          link: {
            MemberPage: (props: { slug: string; children: React.ReactNode }) => {
              return (
                <Link href={`${PATHS.team}/${props.slug}`} className="text-brand-toffee underline">
                  {props.children}
                </Link>
              );
            },
          },
          blockquote: ({ children }) => {
            return (
              <blockquote className="mb-[1em] mt-[1em] w-full max-w-prose border-l-4 border-brand-toffee bg-brand-toffee/10 px-2 py-[1em] text-base italic text-brand-toffee">
                {children}
              </blockquote>
            );
          },
        }}
        references={references}
      />
    </div>
  );
}
