import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import ReferFriendSection from '../components/ReferFriendSection'
import ExceedBanner from '../components/ExceedBanner'

// Export Template for use in CMS preview
export const ReferFriendTemplate = ({
  title,
  subtitle,
  footerSettings,
  body,
  meta
}) => {

  return (
    <main className="ReferFriendForm background-dots">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section">
        <div className="container content">
          <Content source={body} />
          <ReferFriendSection />
        </div>
      </section>
      <div className="section thin">
        <div className="container">
          <ExceedBanner footerSettings={footerSettings} />
        </div>
      </div>
    </main>
  )
}

const ReferFriend = ({ data: { page, footerSettings } }) => (
  <ReferFriendTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
)

export default ReferFriend

export const pageQuery = graphql`
  query ReferFriend($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        subtitle
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
