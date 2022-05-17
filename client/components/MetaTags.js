import Header from 'components/Header'
import Head from 'next/head'
import { useRouter } from 'next/router'

const MetaTags = ({
  documentTitle,
  metaImageUrl = 'https://res.cloudinary.com/jlp0422/image/upload/v1652746266/f1-fantasy-2022/cars/turbo-team-racing.jpg',
  description = 'Custom built website for F1 Fantasy 2022 League',
}) => {
  const { asPath } = useRouter()
  const contentUrl = `https://f1-fantasy-2022.vercel.app${asPath}`
  const docAndSiteTitle = `${documentTitle} | F1 Fantasy 2022`
  return (
    <Head>
      <title>{docAndSiteTitle}</title>
      <link rel="icon" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"/>


      {/* <!-- COMMON TAGS --> */}
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      {/* <!-- Search Engine --> */}
      <meta name="description" content={description} key="desc" />
      <meta name="image" content={contentUrl} key="img" />

      {/* <!-- Schema.org for Google --> */}
      <meta itemprop="name" content={docAndSiteTitle} key="g-name" />
      <meta itemprop="description" content={description} key="g-desc" />
      <meta itemprop="image" content={contentUrl} key="g-img" />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary" key="tw-card" />
      <meta name="twitter:title" content={docAndSiteTitle} key="tw-title" />
      <meta name="twitter:description" content={description} key="tw-desc" />
      <meta name="twitter:site" content="@jeremyphilipson" key="tw-site" />
      <meta name="twitter:image:src" content={metaImageUrl} key="tw-img-src" />

      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta property="og:title" content={docAndSiteTitle} key="og-title" />
      <meta property="og:image" content={metaImageUrl} key="og-image" />
      <meta name="og:description" content={description} key="og-desc" />
      <meta name="og:url" content={contentUrl} key="og-url" />
      <meta name="og:site_name" content={docAndSiteTitle} key="og-site" />
      <meta property="og:type" content="website" key="og-type" />
      <meta property="og:locale" content="en_US" key="og-locale" />
    </Head>
  )
}

export default MetaTags
