import React, { Component } from 'react'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import BookTourSection from '../components/BookTourSection'
import DownloadBanner from '../components/DownloadBanner'
import JoinBanner from '../components/JoinBanner'
import ExceedBanner from '../components/ExceedBanner'
import './BookPage.css'


export const BookPageTemplate = ({ title, subtitle, featuredImage, body, footerSettings, meta }) => {

  const { handbookDownload } = footerSettings

  return (
    <main className="BookPage">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <div className="section">
        <div className="container content">
          <Content source={body} />
        </div>
        <BookTourSection />
        <DownloadBanner handbookDownload={handbookDownload} />
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
  )
}


const BookPage = ({ data }) => {
  const { markdownRemark: page, footerSettings } = data

  return <BookPageTemplate {...page} {...page.frontmatter} body={page.html} footerSettings={footerSettings} />
}

export default BookPage

// Query for BookPage data
// Use GraphiQL interface (http://localhost:8000/___graphql)
// ID is processed via gatsby-node.js
export const pageQuery = graphql`
  query BookPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        featuredImage {
          ...LargeImage
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
      handbookDownload {
        file
        title
      }
    }
  }
`
