import React from 'react'
import Helmet from 'react-helmet'
import _get from 'lodash/get'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import { ICONDownload } from '../components/Icons.js'
import Button from '../components/Button.js'
import Accordion from '../components/Accordion.js'
import Image from '../components/Image.js'
import BreakoutBox from '../components/BreakoutBox.js'
import DownloadBanner from '../components/DownloadBanner.js'
import JoinBanner from '../components/JoinBanner.js'
import PopoutBanner from '../components/PopoutBanner.js'
import './EnrolmentsPage.css'

// Export Template for use in CMS preview
export const EnrolmentsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  enrolmentsSection1,
  breakoutBox,
  enrolmentsSection2,
  enrolBanner,
  enrolmentsSection3,
  accordion,
  downloadFile,
  downloadFileText,
  footerSettings,
  meta
}) => {
  // showHandbook

  const handbookDownload = _get(footerSettings, 'handbookDownload') || []

  return (
    <main className="EnrolmentsPage background-dots">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>

      <PageHeader title={title} subtitle={subtitle} />

      <section className="section EnrolmentsPage--Section1">
        <div className="container content">
          {featuredImage &&
            <div className="relative EnrolmentsPage--Section1-Image">
              <Image
                background
                src={featuredImage}
                alt={enrolmentsSection1.title}
              />
            </div>
          }
          <div className='EnrolmentsPage--Section1-Content'>
            <Content src={enrolmentsSection1.title}/>
          </div>
        </div>
      </section>

      <section>
        <div className="container content">
          <BreakoutBox title={breakoutBox.title}>
            <Content src={breakoutBox.content} />
          </BreakoutBox>
        </div>
      </section>

      {!!enrolmentsSection2.steps.length &&
        <section className="section">
          <div className="container content">
              {enrolmentsSection2.steps &&
              enrolmentsSection2.steps.map((step, index) => {
                const iframeSource = _get(step, 'iframeSource') || ''
                return <div key={step.title} className="EnrolmentsPage--Section2--Step">
                  <span className='Button hasShadow'>Step {index + 1}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <Content src={step.content} />
                    {iframeSource &&
                      <div className='login-form'>
                        <iframe width="230"
                          height="260"
                          src={iframeSource}
                          scrolling="no"
                          seamless="seamless">
                        </iframe>
                      </div>
                    }
                  </div>
                </div>
              })}
          </div>
        </section>
      }

      <section className="section">
        <div className="container content">
          <Content src={enrolmentsSection3} />
          {downloadFile &&
            <section className='download-file'>
              <ICONDownload/>
              <a
                href={downloadFile.publicURL}
                target="_blank"
                rel="noopener"
              >
                {downloadFileText}
              </a>
            </section>
          }
          <Accordion items={accordion} />
        </div>
        {footerSettings && <PopoutBanner image={footerSettings.exceedLogo} title={footerSettings.exceedTextLong} />}
      </section>
      <DownloadBanner handbookDownload={handbookDownload} />
    </main>
  )
}

const EnrolmentsPage = ({ data }) => {
  const { markdownRemark: page, footerSettings } = data

  return <EnrolmentsPageTemplate {...page} {...page.frontmatter} footerSettings={footerSettings} />
}

export default EnrolmentsPage

export const pageQuery = graphql`
  query EnrolmentsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        subtitle
        featuredImage {
          ...LargeImage
        }
        enrolmentsSection1 {
          title
        }
        breakoutBox {
          title
          content
        }
        enrolmentsSection2 {
          steps {
            title
            content
            iframeSource
          }
        }
        enrolBanner {
          title
          buttonTitle
          buttonLinkTo
        }
        downloadFile {
          publicURL
        }
        downloadFileText
        enrolmentsSection3
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
      handbookDownload {
        file
        title
      }
    }
  }
`
