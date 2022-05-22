import React, { Fragment } from 'react'
import _get from 'lodash/get'

import JoinBanner from '../components/JoinBanner'
import FamilyHandbookSection from '../components/FamilyHandbookSection'
import ExceedBanner from '../components/ExceedBanner'
import SubscribeFormSection from '../components/SubscribeFormSection'
import { ICONFacebook } from '../components/Icons'
import './Footer.css'

export default ({
  showHandbook = false,
  simple = false,
  showExceedBannerLong = false,
  globalSettings = {},
  footerSettings = {},
  centres = {},
  ...props
}) => {
  const { siteTitle } = globalSettings
  const edges = _get(centres, 'edges') || []

  return (
    <Fragment>
      {!simple && (
        <Fragment>
          {showHandbook &&
            footerSettings && (
              <FamilyHandbookSection
                image={footerSettings.handbookImage}
                file={footerSettings.handbookFile}
              />
            )}
        </Fragment>
      )}

      <footer className="Footer">
        <div className="Footer--upper">
          <div className="container Footer--upper--container">
            <div className='footer-centres'>
              {edges &&
                edges.map((centre, index) => {
                  const node = _get(centre, 'node') || []
                  const fields = _get(node, 'fields') || []
                  const slug = _get(fields, 'slug') || []

                  const frontmatter = _get(node, 'frontmatter') || []
                  const title = _get(frontmatter, 'title') || ''
                  const centreDetails = _get(frontmatter, 'centreDetails') || []
                  const email = _get(centreDetails, 'email') || ''
                  const phone = _get(centreDetails, 'phone') || ''
                  const facebook = _get(centreDetails, 'facebook') || ''

                  return <div key={index} className="Footer--column">
                    <div className="Footer--column--title">{title.replace('Early Learning Centre', '')}</div>
                    <a href={`mail:${email}`} className="Footer--email noDecoration colorInherit">
                      {email}
                    </a>
                    <a href={`tel:${phone}`} className="Footer--phone noDecoration colorInherit">
                      {phone}
                    </a>
                    <a href={slug} className="Footer--view colorInherit">
                      View Centre
                    </a>
                    <a className='centreSocial' href={facebook} target="_blank" rel="noopener"><ICONFacebook /></a>
                  </div>
                })}
            </div>
            <div className="Footer--column form-column">
              <div className="Footer--column--title">
                Sign up for Centre Newsletter
                <SubscribeFormSection />
              </div>
            </div>
          </div>
        </div>

        <div className="Footer--lower">
          <div className="container taCenter">
            © {new Date().getFullYear()} {siteTitle} | Web Design by{' '}
            <a
              href="https://thriveweb.com.au"
              target="_blank"
              rel="noopener"
              className="colorInherit"
              rel="noopener noreferrer"
            >
              Thrive
            </a>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}
