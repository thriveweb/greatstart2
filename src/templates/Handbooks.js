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
import './Handbooks.css'

// Export Template for use in CMS preview
export const HandbooksTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadableForms,
  footerSettings,
  body,
  meta
}) => {


  return (
    <main className="Handbooks background-dots">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div>
        <div className="container content m-t-2">
          {downloadableForms && <DownloadBox listItems={downloadableForms} />}
        </div>
      </section>
      <div className="section thin JoinBannerSection">
        <div className="container">
          <JoinBanner linkTo="/" />
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

const Handbooks = ({ data: { page, footerSettings } }) => (
  <HandbooksTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
)

export default Handbooks

export const pageQuery = graphql`
  query Handbooks($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
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
