import React from 'react'
import Link from 'gatsby-link'
import _get from 'lodash/get'
import Helmet from 'react-helmet'

import PageHeader from '../components/PageHeader'
import Wave from '../components/Wave'
import Image from '../components/Image'
import Content from '../components/Content'
import HomeDownloadBanner from '../components/HomeDownloadBanner'
import JoinBanner from '../components/JoinBanner'
import ExceedBanner from '../components/ExceedBanner'
import Button from '../components/Button'

import './HomePage.css'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  homeSection1,
  homeSection2,
  homeSection3,
  homeSection4,
  footerSettings,
  meta
}) => {
  // showHandbook

  const handbookDownload = _get(footerSettings, 'handbookDownload') || []

  return <main className="Home">
    <Helmet defaultTitle={meta ? meta.title : `${title} | Great Start ELC`}>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <link rel="canonical" href={meta.canonicalLink} />}
    </Helmet>
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      button={{ linkTo: '/enrolments/enrolling-great-start-early-learing-centre/', title: 'Enrol Now' }}
      backgroundImage={featuredImage}
    />
    {homeSection1 && (
      <div className="section homeSection1">
        <div className="container taCenter">
          <h2>{homeSection1.title}</h2>
          {homeSection1.centres && (
            <div className="homeSection1--boxes">
              {homeSection1.centres.map((centre, index) => (
                <Link
                  key={'centre' + index}
                  className="hasBorder hasShadowHover homeSection1--box"
                  to={centre.linkTo}
                >
                  <Image
                    className="homeSection1--box--logo"
                    src={centre.logo}
                    alt={centre.title || centre.description}
                  />

                  <p className="homeSection1--box--description">
                    {centre.description}
                  </p>
                  <strong>View Centre</strong>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
    {homeSection2 && (
      <div className="section dots-left light homeSection2">
        <div className="container homeSection2--container">
          <div className="relative">
            <Image
              background
              src={homeSection2.image}
              alt={homeSection2.title}
            />
          </div>
          <div>
            <h2>{homeSection2.title}</h2>
            <p>
              <strong>{homeSection2.subtitle}</strong>
            </p>
            <Content src={homeSection2.content} />
            <Button to={homeSection2.linkTo}>Read More</Button>
          </div>
        </div>
      </div>
    )}
    {homeSection3 && (
      <div className="section homeSection3">
        <div className="container">
          <h3>{homeSection3.title}</h3>
          {homeSection3.items && (
            <div className="homeSection3--items">
              {homeSection3.items.map(item => (
                <div className="homeSection3--item" key={item.title}>
                  <div className="homeSection3--item--icon">
                    <Image
                      src={item.icon}
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <div className="homeSection3--item--title">
                      {item.title}
                    </div>
                    <div>{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
    {homeSection4 && (
      <div className="section dots-right">
        <div className="container">
          <div className="homeSection4--grid">
            <div className="homeSection4--grid--image relative">
              <Image background src={homeSection4.image1} alt={title} />
            </div>
            {homeSection4.items &&
              homeSection4.items.map((item, index) => {
                const col = `col${index + 1}`
                return (
                  <Link
                    to={item.linkTo}
                    className={`homeSection4--grid--item hasShadowHover ${col}`}
                    key={item.title}
                  >
                    <h3 className="homeSection4--grid--item--title">
                      {item.title}
                    </h3>
                    <Wave />
                    <p className="homeSection4--grid--item--description">
                      {item.description}
                    </p>
                    <div className="Button homeSection4--grid--item--button">
                      Read More
                    </div>
                  </Link>
                )
              })}
            <div className="homeSection4--grid--image relative">
              <Image background src={homeSection4.image2} alt={title} />
            </div>
          </div>
        </div>
      </div>
    )}
    <div className="section thin JoinBannerSection">
      <div className="container">
        <JoinBanner linkTo="/" />
      </div>
    </div>
    <HomeDownloadBanner handbookDownload={handbookDownload} />
    <div className="section thin">
      <div className="container">
        <ExceedBanner footerSettings={footerSettings} />
      </div>
    </div>
  </main>
}

// Export Default HomePage for front-end
const HomePage = ({ data: { markdownRemark, footerSettings } }) => (
  <HomePageTemplate {...markdownRemark.frontmatter} footerSettings={footerSettings} />
)
export default HomePage

export const pageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        template
        subtitle
        featuredImage {
          ...LargeImage
        }
        meta {
          canonicalLink
          description
          noindex
          title
        }
        homeSection1 {
          title
          centres {
            logo {
              ...SmallImage
            }
            description
            linkTo
          }
        }
        homeSection2 {
          title
          subtitle
          content
          linkTo
          image {
            ...MediumImage
          }
        }
        homeSection3 {
          title
          items {
            icon {
              ...SmallImage
            }
            title
            subtitle
          }
        }
        homeSection4 {
          image1 {
            ...MediumImage
          }
          image2 {
            ...MediumImage
          }
          items {
            title
            description
            linkTo
          }
        }
      }
    }
    footerSettings: settingsYaml(id: { regex: "/footer.yml/" }) {
      exceedText
      exceedTextLong
      exceedLogo
      siteTitle
      siteDescription
      handbookDownload {
        file
        title
      }
    }
  }
`
