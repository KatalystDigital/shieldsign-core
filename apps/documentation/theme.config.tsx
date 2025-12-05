import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs';

const themeConfig: DocsThemeConfig = {
  logo: <span>ShieldSign</span>,
  head: function useHead() {
    const config = useConfig();

    const title = `${config.frontMatter.title} | ShieldSign Docs` || 'ShieldSign Docs';
    const description = config.frontMatter.description || 'The official ShieldSign documentation';

    return (
      <>
        <meta httpEquiv="Content-Language" content="en" />
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </>
    );
  },
  project: {
    link: 'https://github.com/KatalystDigital/shieldsign-core',
  },
  docsRepositoryBase: 'https://github.com/KatalystDigital/shieldsign-core/tree/main/apps/documentation',
  footer: {
    content: (
      <span>
        {new Date().getFullYear()} © ShieldSign. Licensed under AGPL-3.0.
      </span>
    ),
  },
  color: {
    hue: 100,
    saturation: 48.47,
  },
};

export default themeConfig;
