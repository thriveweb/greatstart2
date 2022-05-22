### Templates:

- [x] DefaultPage
- [x] HomePage
- [ ] OurVisionPage
- [x] TeamPage
- [x] QKPortalPage
- [x] Centre
- [ ] EnrolmentPage
- [ ] TourPage
- [ ] CareersPage
- [ ] FeesPage
- [x] ContactPage
- [ ] HealthPage
- [ ] ChecklistPage
- [ ] ProgramsPage
- [x] FamilyChecklistPage

- HOMEPAGE [heavily customised]

- ABOUT (drop down menu)
  - Welcome
  - Our Vision & Philosophy
  - Our Team [custom]
  - Our Learning Environments
- LEARNING (drop down menu)
  - Learning at Great Start Early Learning Centres
  - Reggio Emilia Approach
  - Educational Programs and Curriculum
  - Our Teaching Frameworks
  - Early Years Learning Framework (EYLF) or EYLF
  - National Quality Framework
  - QKeLYM: Curriculum Portal or QKeYLM [custom]
  - Family Participation & Communication
- CENTRES (drop down menu for 3 locations)
  - Mini site for each with Overview, Centre Offering, Gallery, etc [heavily customised, icons, forms, feeds]
- ENROLMENTS (drop down menu)
  - Enrolling at Great Start Early Learning Centres [custom]
  - Book a Tour [form]
  - Fees and Government Subsidies
  - Getting Started
- PARENTAL INFO (drop down menu)
  - Refer A Friend [form]
  - Healthy Menu [PDF menu not included]
  - Safety and Security
  - Health and Medication Information [custom table]
  - Settling Tips
  - Centre Forms and Handbooks
  - Helpful Links
  - New Family Checklist [custom table]
  - FAQs
  - Our Policies
- (OPTIONAL) LATEST NEWS (drop down menu for each centre)
  - Full Blog format
- CAREERS (drop down menu)
  - Employment Opportunities [form]
  - Why Join Our Team?
- CONTACTS
  - Each centre with all modes of communication, location with map, open hours, parking, general enquiry form and appropriate links 7
- ENROLMENT ENQUIRY - Detailed form
- BOOK A TOUR
  - Detailed form
- OTHER PAGES
  - FAQs (accordion style), disclaimers, templates and landing pages

## gatsby v1 rollback

- reinstall all `gatsby-` packages in `package.json` including `gatsby` (`npm i gatsby`, `yarn add gatsby`)
- install `gatsby-link`
- `gatsby-node.js` actions -> boundActionCreators
- search-replace `pageContext` with `pathContext`
- move and rename `Layout.js` to `src/layouts/index.js` will require editing:
  - [see Gatsbro](https://github.com/Jinksi/gatsbro/blob/master/src/layouts/index.js)
  - `{children}` -> `{children()}`
- import `Link` is now from `gatsby-link` (`import Link from 'gatsby-link'`)
- remove import `{ graphql }` from `gatsby` - not needed
- copy `src/utils` from [Gatsbro](https://github.com/Jinksi/gatsbro/blob/master/src/utils.js)
- copy `src/components/Image` from [Gatsbro](https://github.com/Jinksi/gatsbro/tree/master/src/components/Image.js)
- remove any `StaticQuery`, if using query, will need move this query to a page or the main layout and pass down as props
- remove `<Layout>` and Layout import from all `src/templates` and `src/pages`
- install `gatsby-plugin-postcss-sass` and uncomment in `gatsby-config.js`  
  https://github.com/thriveweb/great-start-elc/blob/9162de6fc1bc2cb99cbe5c0600cc0a07b4f19a31/gatsby-config.js#L58-L67