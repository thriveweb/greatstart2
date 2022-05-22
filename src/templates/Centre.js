import React from 'react'
import Helmet from 'react-helmet'

import Image from '../components/Image'
import Meta from '../components/Meta'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import BreakoutBox from '../components/BreakoutBox'
import PopoutBanner from '../components/PopoutBanner'
import Testimonials from '../components/Testimonials'
import Gallery from '../components/Gallery'
import CentreMap from '../components/CentreMap'


import './Centre.css'

// Export Template for use in CMS preview
export const CentreTemplate = ({
  title,
  subtitle,
  featuredImage,
  downloadBanner,
  logo,
  centreIntro,
  centreDetails,
  contentColumns,
  classroomsSection,
  testimonials,
  directorStatement,
  gallery = [],
  additionalInfoBoxes = [],
  body,
  meta,
  footerSettings,
}) => {
  const { openingHours, location, mapIframe, phone, email } = centreDetails

  return (
    <main className="Centre">
      <Helmet defaultTitle={meta && meta.title || `${title} | Great Start ELC`}>
        {meta && <meta name="description" content={meta.description} />}
        {meta && <link rel="canonical" href={meta.canonical} />}
      </Helmet>
      <PageHeader title={title} subtitle={subtitle} />

      <section className="section Centre--Intro background-dots">
        <div className="container content">
          <Image className="Centre--Intro--Logo" src={logo} alt={title} />
          <h3 className="Centre--Intro--Title">{centreIntro}</h3>
        </div>
      </section>

      <section className="section Centre--MainSection background-clouds">
        <div className="container content">
          <BreakoutBox className="Centre--Details" title="Centre Details">
            {openingHours && (
              <p>
                <strong>Open Hours</strong>
                <br />
                {openingHours}
              </p>
            )}
            {location && (
              <div className='location'>
                <p>
                  <strong>Centre Location</strong>
                 <br />
                 {location}
                </p>
                {mapIframe && <Content className='map-container' src={mapIframe} />}
              </div>
            )}
            {(email || phone) && (
              <div>
                <strong>Contact Info</strong>
                <br />
                {phone && <div>T: {phone}</div>}
                {email && <div>E: {email}</div>}
              </div>
            )}
            <br />
            <Button to='/enrolments/enrolling-great-start-early-learing-centre/'>Enrol Now</Button>
          </BreakoutBox>
          <Content source={body} />
          {!!contentColumns.length &&
            <div className='column-section'>
              {contentColumns.map((column, index) => {
                const { image, content } = column

                return <div className='column-content' key={index}>
                    {image && <Image src={image} alt='centre image' />}
                    {content && <Content src={content} />}
                  </div>
              })}
            </div>
          }
        </div>
      </section>

      {footerSettings && <PopoutBanner image={footerSettings.exceedLogo} title={footerSettings.exceedTextLong} />}

      {classroomsSection && (
        <section className="section secondary Centre--ClassroomsSection">
          <div className="container skinny taCenter">
            <h3>{classroomsSection.title}</h3>
          </div>
          <div className="container taCenter">
            {classroomsSection.items && (
              <div className="Centre--ClassroomsSection--Items">
                {classroomsSection.items.map(item => (
                  <div
                    className="Centre--ClassroomsSection--Item"
                    key={item.title}
                  >
                    <div  className="Centre--ClassroomsSection--Item--Icon">
                      <Image
                        src={item.icon}
                        alt={item.title}
                      />
                    </div>
                    <h6 className="Centre--ClassroomsSection--Item--Title">
                      {item.title}
                    </h6>
                    <p>{item.subtitle}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="Centre--ClassroomsSection--Subtitle">
              {classroomsSection.subtitle}
              <Button to="/enrolments/enrolling-great-start-early-learing-centre/">Enrol Now</Button>
            </div>
          </div>
        </section>
      )}

      {testimonials.length && <Testimonials items={testimonials} />}

      {directorStatement && (
        <section className="section Centre--DirectorStatement">
          <div className="container content">
            <h5 className="Centre--DirectorStatement--Title">
              {directorStatement.title}
            </h5>
            {directorStatement.image && (
              <Image
                className="Centre--DirectorStatement--Image"
                src={directorStatement.image}
                alt={directorStatement.title}
              />
            )}
            <Content src={directorStatement.content} />
          </div>
        </section>
      )}

      {gallery.length && (
        <section className="section thin Centre--Gallery">
          <div className="container taCenter content">
            <h3 className="Centre--Gallery--Title">Centre Gallery</h3>
            <Gallery images={gallery.map(item => item.image)} />
          </div>
        </section>
      )}

      <section className="section thin Centre--InfoBoxes">
        <div className="container content">
          {additionalInfoBoxes.map((box, index) => {
            const cols = [3, 4, 5]
            const color = cols[index % cols.length]
            return (
              <BreakoutBox
                className="Centre--InfoBox"
                title={box.title}
                key={box.title}
                color={color}
                noShadow
              >
                <p>{box.content}</p>
                {box.buttonTitle && (
                  <Button to={box.buttonLinkTo}>{box.buttonTitle}</Button>
                )}
              </BreakoutBox>
            )
          })}
        </div>
      </section>
    </main>
  )
}

const Centre = ({ data: { page, footerSettings } }) => (
  <CentreTemplate
    {...page}
    {...page.frontmatter}
    body={page.html}
    footerSettings={footerSettings}
  />
)

export default Centre

export const pageQuery = graphql`
  query Centre($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        logo {
          ...FluidImage
        }
        centreIntro
        centreDetails {
          openingHours
          location
          mapIframe
          phone
          email
        }
        contentColumns {
          content
          image {
            ...MediumImage
          }
        }
        classroomsSection {
          title
          subtitle
          items {
            icon {
              ...SmallImage
            }
            title
            subtitle
          }
        }
        testimonials {
          name
          testimonial
        }
        directorStatement {
          image {
            ...MediumImage
          }
          title
          content
        }
        gallery {
          image {
            ...FluidImage
          }
        }
        additionalInfoBoxes {
          title
          content
          buttonTitle
          buttonLinkTo
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
