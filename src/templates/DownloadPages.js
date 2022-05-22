import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import FamilyHandbookBanner from '../components/FamilyHandbookBanner'
import './DownloadPage.css'

// Export Template for use in CMS preview
export const DownloadPagesTemplate = ({
  title,
  subtitle,
  downloadBanner,
  body,
  meta
}) => {

  return (
    <main className="DownloadPage background-dots">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
        </div>
        <FamilyHandbookBanner downloadBanner={downloadBanner} />
      </section>
    </main>
  )
}

const DownloadPages = ({ data: { page } }) => (
  <DownloadPagesTemplate {...page} {...page.frontmatter} body={page.html} />
)

export default DownloadPages

export const pageQuery = graphql`
  query DownloadPages($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        downloadBanner {
          file {
            publicURL
          }
          title
          preview {
            ...SmallImage
          }
        }
        meta {
          canonicalLink
          description
          title
        }
      }
    }
  }
`
