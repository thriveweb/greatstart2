import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import PopoutBanner from '../components/PopoutBanner'
import DownloadBox from '../components/DownloadBox'
import InfoListing from '../components/InfoListing'
import JoinBanner from '../components/JoinBanner'
import ExceedBanner from '../components/ExceedBanner'
import './DefaultPage.css'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  className,
  subtitle,
  featuredImage,
  downloadBanner,
  popoutBanner,
  accordion,
  downloadableForms,
  infoSection,
  footerSettings,
  body,
  meta
}) => {

  const description = _get(infoSection, 'description') || ''
  const infoListing = _get(infoSection, 'infoListing') || []

  return (
    <main className="DefaultPage background-dots">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section background-clouds">
        <div className="container content">
          <Content source={body} />
        </div>
        <div className="container content m-t-2">
          {downloadableForms && <DownloadBox listItems={downloadableForms} />}
        </div>
        {accordion && (
          <div className="container content m-t-2">
            <Accordion items={accordion} />
          </div>
        )}
        <InfoListing description={description} infoListing={infoListing} />
      </section>

      {popoutBanner && (
        <PopoutBanner image={popoutBanner.image} title={popoutBanner.title} />
      )}
      <div className="section thin JoinBannerSection">
        <div className="container">
          <JoinBanner linkTo="/" className={className} />
        </div>
      </div>
      <div className="section thin">
        <div className="container">
          <ExceedBanner footerSettings={footerSettings} />
        </div>
      </div>
    </main>
  )
}

const DefaultPage = ({ data: { page, footerSettings } }) => (
  <DefaultPageTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
)

export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        className
        title
        subtitle
        featuredImage {
          ...LargeImage
        }
        downloadableForms {
          file {
            publicURL
          }
          title
        }
        downloadBanner {
          file {
            publicURL
          }
          title
          preview {
            ...SmallImage
          }
        }
        accordion {
          title
          content
        }
        infoSection {
          description
          infoListing {
            icon {
              ...SmallImage
            }
            title
            content
          }
        }
        meta {
          canonicalLink
          description
          title
        }
      }
    }
    footerSettings: settingsYaml(id: { regex: "/footer.yml/" }) {
      exceedText
      exceedTextLong
      exceedLogo
    }
  }
`
