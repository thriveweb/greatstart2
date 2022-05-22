import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import Table from '../components/Table'
import FamilyHandbookBanner from '../components/FamilyHandbookBanner'

export const FamilyChecklistTemplate = ({
  title,
  subtitle,
  featuredImage,
  checklistDownload,
  popoutBanner,
  accordion,
  body,
  lowerSection,
  checklist,
  meta
}) => (
  <main className="FamilyChecklist background-dots">
    <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonical} />}
    </Helmet>

    <PageHeader title={title} subtitle={subtitle} />

    <section className="section">
      <div className="container content">
        <Content source={body} />
      </div>
    </section>

    <section>
      <div className="container content">
        <Table checklist items={checklist} />
      </div>
    </section>

    <section className="section lower-section">
      <div className="container content">
        <Content source={lowerSection} />
      </div>
      {accordion && (
        <Fragment>
          <br />
          <br />
          <div className="container content">
            <Accordion items={accordion} />
          </div>
        </Fragment>
      )}
      <FamilyHandbookBanner downloadBanner={checklistDownload} />
    </section>
  </main>
)

const FamilyChecklist = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <FamilyChecklistTemplate {...page} {...page.frontmatter} body={page.html} />
  )
}

export default FamilyChecklist

export const pageQuery = graphql`
  query FamilyChecklist($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        checklist {
          cell1
        }
        accordion {
          title
          content
        }
        checklistDownload {
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
