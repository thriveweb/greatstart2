import React from 'react'
import CMS from 'netlify-cms'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { DownloadPagesTemplate } from '../templates/DownloadPages'
import { TeamMembersTemplate } from '../templates/TeamMembers'
import { CentreTemplate } from '../templates/Centre'
import { HealthInfoPageTemplate } from '../templates/HealthInfoPage'
import { FamilyChecklistTemplate } from '../templates/FamilyChecklist'

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('defaultPages', ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('defaultPages', ({ entry }) => (
  <DownloadPagesTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('team-members', ({ entry }) => (
  <TeamMembersTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('centres', ({ entry }) => (
  <CentreTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('health-info-page', ({ entry }) => (
  <HealthInfoPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('family-checklist', ({ entry }) => (
  <FamilyChecklistTemplate {...entry.toJS().data} />
))
