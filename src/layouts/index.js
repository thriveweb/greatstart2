require('core-js')
require('babel-polyfill')

import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from '../components/Meta'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FamilyHandbookBanner from '../components/FamilyHandbookBanner'

export default ({ children, data }) => {
  const { footerSettings, globalSettings, centres, header } = data
  const { siteTitle, siteUrl, headerScripts, openGraphCard } = globalSettings
  const { showHandbook = false, simpleFooter = false, downloadBanner } = data
  const allPages = data.allPages.edges.map(edge => edge.node)

  return (
    <Fragment>
      <Helmet defaultTitle={siteTitle} titleTemplate={`${siteTitle} | %s`}>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,600,700|Varela+Round"
          rel="stylesheet"
        />

        <meta name="msvalidate.01" content="B0112812CA622A13C327AF572E2BA5B5" />
        <meta name="google-site-verification" content="MoxAZiT4Uwrk6d0PZek_l-BN5JhW65hgzkVSZoUe3vE" />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-123975389-5"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-123975389-5');`}
        </script>
      </Helmet>
      <Meta
        headerScripts={headerScripts}
        absoluteImageUrl={
          openGraphCard &&
          openGraphCard.image &&
          siteUrl + openGraphCard.image
        }
      />

      <Nav allPages={allPages} header={header} />

      <Fragment>{children()}</Fragment>

      {downloadBanner && (
        <FamilyHandbookBanner
          file={downloadBanner.file}
          title={downloadBanner.title}
          preview={downloadBanner.preview}
        />
      )}

      <Footer
        showHandbook={showHandbook}
        simple={simpleFooter || !!downloadBanner}
        footerSettings={footerSettings}
        globalSettings={globalSettings}
        centres={centres}
      />
    </Fragment>
  )
}

export const query = graphql`
  query LayoutQuery {
    globalSettings: settingsYaml(id: { regex: "/global.yml/" }) {
      siteTitle
      headerScripts
      openGraphCard
    }

    footerSettings: settingsYaml(id: { regex: "/footer.yml/" }) {
      exceedText
      exceedTextLong
      exceedLogo
      handbookImage
    }

    header: settingsYaml(id: { regex: "/header.yml/" }) {
      menu {
        title
        url
        subMenu {
          title
          url
        }
      }
    }

    centres: allMarkdownRemark( filter: { fields: { contentType: { regex: "/centre/" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            centreDetails {
              email
              phone
              facebook
            }
          }
        }
      }
    }

    allPages: allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
