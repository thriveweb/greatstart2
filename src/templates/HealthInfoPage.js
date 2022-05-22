import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import Table from '../components/Table'
import ExceedBanner from '../components/ExceedBanner'
import './HealthInfoPage.css'

// Export Template for use in CMS preview
export const HealthInfoPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  popoutBanner,
  accordion,
  body,
  lowerSection,
  table,
  footerSettings,
  meta
}) => (
  <main className="HealthInfoPage background-dots">
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
        <Table
          headings={table.headings.map(item => item.heading)}
          items={table.items}
        />
      </div>
    </section>

    <section className="section background-clouds">
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
    </section>
    <div className="section thin">
      <div className="container">
        <ExceedBanner footerSettings={footerSettings} />
      </div>
    </div>
  </main>
)

const HealthInfoPage = ({ data }) => {
  const { markdownRemark: page, footerSettings } = data

  return (
    <HealthInfoPageTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
  )
}

export default HealthInfoPage

export const pageQuery = graphql`
  query HealthInfoPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        lowerSection
        table {
          headings {
            heading
          }
          items {
            cell1
            cell2
          }
        }
        accordion {
          title
          content
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
