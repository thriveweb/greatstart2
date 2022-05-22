import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Accordion from '../components/Accordion'
import './Faqs.css'

// Export Template for use in CMS preview
export const FaqsTemplate = ({
  title,
  subtitle,
  accordionSection,
  body,
  meta
}) => {

  return (
    <main className="Faqs background-dots">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
         {accordionSection && accordionSection.map(({ title, accordion }, index) =>
            <div key={`accordion-${index}`} className='accordion-section'>
              {title && <h4>{title}</h4>}
              <Accordion items={accordion} />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

const Faqs = ({ data: { page } }) => (
  <FaqsTemplate {...page} {...page.frontmatter} body={page.html} />
)

export default Faqs

export const pageQuery = graphql`
  query Faqs($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        accordionSection {
          title
          accordion {
            content
            title
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
