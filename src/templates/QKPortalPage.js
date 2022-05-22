import React from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

import PageHeader from '../components/PageHeader'
import Image from '../components/Image'
import Content from '../components/Content'
import BreakoutBox from '../components/BreakoutBox'
import JoinBanner from '../components/JoinBanner'
import ExceedBanner from '../components/ExceedBanner'
import './QKPortalPage.css'

// Export Template for use in CMS preview
export const QKPortalPageTemplate = ({ title, subtitle, image, boxTitle, boxContent, features, rawMarkdownBody, footerSettings, meta }) => {

  return <main className="QKPortalPage">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <div className="section">
        <div className='header-columns background-dots'>
          {image && <Image src={image} alt={title} />}
          <div className="container content">
            <BreakoutBox title={boxTitle}>
              {boxContent && <Content src={boxContent} />}
            </BreakoutBox>
          </div>
        </div>
        <div className='features'>
          <div className='container content'>
            {features && <h3>{features.title}</h3>}
            <div className='features-list'>
              {features && features.featuresItem.map(( item, index ) => {
                const { icon, description } = item
                return <div className='features-item' key={index}>
                  {icon &&
                    <div className='features-icon'>
                      <Image src={icon} alt='features icon' />
                    </div>
                  }
                  {description && <Content src={description} />}
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
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
}

const QKPortalPage = ({ data }) => {
  const { markdownRemark: page, footerSettings } = data

  return <QKPortalPageTemplate {...page} {...page.frontmatter} footerSettings={footerSettings} />
}

export default QKPortalPage

// Query for QKPortalPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query QKPortalPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        image {
          ...MediumImage
        }
        boxTitle
        boxContent
        features {
          title
          featuresItem {
            description
            icon {
              ...SmallImage
            }
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
