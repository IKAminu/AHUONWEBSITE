# AHUON COMPLETE UI/UX MAKEOVER AND PRODUCT RESTRUCTURE

I want you to perform a COMPLETE PROFESSIONAL UI/UX MAKEOVER of the existing AHUON website/application.

This is NOT a request to simply add more gradients, shadows, animations, cards, or decorative effects.

The current application already contains substantial functionality. Your job now is to transform it into a polished, credible, restrained, professional digital platform that could realistically represent a national association of Hajj and Umrah operators in Nigeria.

Think of this as a professional product redesign and visual systems overhaul.

AHUON = Association of Hajj and Umrah Operators of Nigeria.

The website should communicate:

* Institutional credibility
* Trust
* Professionalism
* Islamic identity without becoming overly decorative
* Nigerian identity
* Regulatory seriousness
* Transparency
* Ease of use
* Security
* Accessibility
* Modern technology
* Operational competence

The final result should feel like a serious national association platform, not a startup landing page, SaaS dashboard, template website, or generic AI-generated website.

---

# 1. CRITICAL RULE: PRESERVE FUNCTIONALITY

Before changing anything, inspect the ENTIRE existing application.

Do not destroy, remove, disable, or replace working functionality simply because you are changing the visual design.

Preserve all existing functional systems, including:

* React routing
* Supabase integration
* Authentication
* Member registration
* Member login
* Member directory
* Member profiles
* Complaint submission
* Complaint tracking
* Member dashboard
* EXCO dashboard
* Certificate generation
* Certificate verification
* QR-code verification
* News
* Search
* Filtering
* Sorting
* Pagination
* Database queries
* Role-based access
* Form validation
* Error handling
* Loading states
* Empty states
* Supabase client configuration
* Direct Supabase database queries
* Existing accessibility functionality

Do NOT reintroduce the previous Edge Function fetch architecture that caused "Failed to fetch" errors.

The Directory and Login pages currently use direct Supabase queries. Preserve that architecture unless there is an actual technical reason to change it.

Do not replace working functionality with mock functionality.

Do not create fake buttons that look functional but do nothing.

Every visible interactive control must either work or be clearly presented as unavailable/not implemented.

---

# 2. FIRST: AUDIT THE EXISTING APPLICATION

Before redesigning, inspect the existing codebase and identify:

* Every route
* Every page
* Every reusable component
* Every database-connected feature
* Every form
* Every authentication flow
* Every dashboard
* Every navigation path
* Every button/action
* Every existing accessibility feature
* Every loading state
* Every error state
* Every empty state
* Every Supabase query
* Every important dependency

Create an internal mental map of the application before modifying it.

Do not blindly rewrite pages.

The goal is to improve the existing product rather than rebuild it unnecessarily.

---

# 3. DESIGN DIRECTION

Completely move away from the current overly decorated visual style.

Do NOT use:

* Excessive gradients
* Huge glowing effects
* Excessive glassmorphism
* Excessive rounded cards
* Random floating shapes
* Excessive shadows
* Neon-looking UI
* Excessive animations
* Oversized decorative icons
* Every section having a different visual treatment
* Excessive green-and-gold gradients
* Generic SaaS dashboard aesthetics
* Generic AI-generated landing-page aesthetics

Instead, use a restrained institutional design system.

The design should resemble a combination of:

* A respected national professional association
* A modern regulatory/industry body
* A premium financial or professional-services website
* A well-designed government-adjacent digital service
* A modern Islamic institutional organization

The website should feel calm, authoritative and trustworthy.

---

# 4. BRAND SYSTEM

Use AHUON's existing green and gold identity, but use it intelligently.

Primary:

AHUON Green
#008000

Deep Green:

#005A2B

Darkest Green:

#003D1F

Gold:

#D4AF37

Light Gold:

#F3E7B3

Neutral background:

#F8FAF9

White:

#FFFFFF

Text:

#17211B

Muted text:

#66736A

Borders:

#E2E8E4

Do not use pure green and gold everywhere.

Green should establish identity and trust.

Gold should be an accent.

White and neutral backgrounds should dominate the interface.

Gold should NOT become the primary button color everywhere.

Maintain strong contrast and WCAG AA accessibility.

---

# 5. TYPOGRAPHY

Replace inconsistent typography with one coherent system.

Use a highly professional modern sans-serif family.

Preferred:

Inter

or

Manrope

or another equivalent highly legible professional typeface already available.

Use typography deliberately.

H1:
Large, strong, restrained.

H2:
Clear section hierarchy.

H3:
Moderate and functional.

Body:
16px minimum where appropriate.

Do not make every heading enormous.

Use line-height generously.

Avoid excessive bold text.

Create a consistent hierarchy for:

* Page titles
* Section headings
* Labels
* Body copy
* Supporting text
* Metadata
* Buttons
* Navigation
* Alerts
* Tables

---

# 6. LAYOUT SYSTEM

Create a consistent layout grid across the entire application.

Use:

* Maximum content width around 1200–1280px
* Consistent horizontal padding
* Consistent vertical rhythm
* 8px spacing system where practical
* Clear section separation
* Strong alignment
* Predictable component placement

Do not allow every page to invent its own spacing system.

The application should feel like ONE product.

---

# 7. HEADER / NAVIGATION

Redesign the global navigation completely.

Desktop navigation should be clean and institutional.

Suggested structure:

AHUON logo / wordmark

Home
About
Members
Directory
News
Complaints
Verify Certificate

Right side:

Member Login

Primary CTA:

Become a Member

Avoid overcrowding the navigation.

Use a clean sticky header with subtle border/shadow.

The header should become slightly compact when scrolling if appropriate.

Mobile navigation should be carefully designed.

Use a proper mobile menu.

Do not allow navigation to overflow or become cramped.

---

# 8. HOMEPAGE

Completely redesign the homepage.

The homepage should immediately answer:

1. What is AHUON?
2. Who does AHUON represent?
3. Why should the public trust AHUON?
4. What can visitors do here?

Hero section:

Use a strong but restrained composition.

Headline concept:

"Advancing Trusted Hajj & Umrah Services in Nigeria"

Supporting copy should explain AHUON's role clearly.

Primary CTA:

"Find an Operator"

Secondary CTA:

"Become a Member"

Include an appropriate visual element that reflects:

* Hajj
* Umrah
* Nigerian operators
* professional travel
* Islamic pilgrimage

Avoid generic stock-photo overload.

Do not put text over visually chaotic images.

Hero should have excellent readability.

---

# 9. HOMEPAGE INFORMATION ARCHITECTURE

After the hero, structure the homepage logically.

Recommended sequence:

1. Hero
2. Trust / credibility indicators
3. What AHUON does
4. Member directory preview
5. Why use an AHUON member
6. Complaint and accountability system
7. Membership / professional standards
8. News and updates
9. Certificate verification
10. Final CTA
11. Footer

Each section must have a clear purpose.

Do not create sections simply to fill space.

---

# 10. TRUST SECTION

Create a sophisticated trust section.

Possible indicators:

* Registered/recognized association information
* Verified member network
* Professional standards
* Complaint resolution mechanism
* Member verification
* Industry representation

Do not invent regulatory claims, certifications, government affiliations or statistics.

If exact numbers are not available, use neutral language instead of fake statistics.

Never create fake trust badges.

---

# 11. MEMBER DIRECTORY

The directory is one of the most important parts of the platform.

Redesign it as a professional searchable registry.

The page should immediately communicate:

"Find an AHUON Member"

Include:

* Search
* State filter
* Service filter
* Sorting
* Pagination
* Result count
* Clear filters
* Empty state
* Loading state

Operator cards should be much cleaner.

Each card should contain only important information:

Company name

Verified status

Location

Hajj / Umrah / Both

Years or relevant experience where available

View Profile

Do not overload cards with icons.

Avoid giant gradient headers.

Use subtle verification indicators.

---

# 12. MEMBER PROFILE PAGE

Redesign member profiles as professional business profiles.

Structure:

Company identity

Verification status

Location

Services

Company description

Contact information where appropriate

Relevant credentials

Membership information

Complaint record information where legitimately available

Certificate verification

Profile metadata

CTA:

"Report a Complaint"

or

"Contact Operator"

The profile should resemble a trustworthy professional registry entry.

---

# 13. REGISTRATION EXPERIENCE

The five-step registration process should remain functional but receive a major UX redesign.

Use a clear progress indicator:

01 Company
02 Principal Officer
03 References
04 Banking
05 Review

The user should always know:

* Where they are
* What is required
* What has been completed
* What remains

Improve:

* Form grouping
* Labels
* Helper text
* Required-field indicators
* Validation
* Error messages
* File uploads
* Review screen
* Mobile experience

Avoid making the registration form visually overwhelming.

Use progressive disclosure.

Sensitive information should receive appropriate privacy messaging.

---

# 14. LOGIN

Redesign login into a clean, trustworthy authentication screen.

No excessive decoration.

Include:

* AHUON branding
* Email
* Password
* Show/hide password
* Remember me if supported
* Login
* Error handling
* Loading state
* Password recovery if supported
* Registration CTA

The page should communicate security without making unsupported security claims.

---

# 15. COMPLAINT SYSTEM

The complaint system needs particularly strong UX because this is a serious function.

Redesign:

File Complaint

Complaint Status

Complaint Timeline

Complaint Details

The interface should feel neutral and procedural.

Avoid making the complaint system visually aggressive.

Explain the process clearly.

Example process:

Submit Complaint
↓
Review
↓
Operator Response
↓
Resolution
↓
Closed

Show complaint reference number prominently.

Make status visually understandable without relying only on color.

Use labels such as:

Submitted
Under Review
Awaiting Response
In Resolution
Resolved
Closed

Maintain the existing resolution tracking functionality.

---

# 16. MEMBER DASHBOARD

Redesign the member dashboard as a professional portal.

Do not make it look like a cryptocurrency dashboard.

Structure:

Welcome / account summary

Membership status

Certificate status

Payment status

Profile completion

Recent activity

Quick actions

Certificate

Edit Profile

Payment History

View Public Profile

The dashboard should prioritize the information members actually need.

Use tables where tables make more sense than cards.

---

# 17. EXCO DASHBOARD

This is an administrative system, so prioritize information density and clarity.

Do not make it visually flashy.

Create:

Overview

Pending Applications

Members

Complaints

Payments

Certificates

News / Announcements

Reports

Settings

Use:

* Tables
* Filters
* Search
* Status badges
* Action menus
* Confirmation dialogs
* Pagination

Dashboard overview should surface:

Pending applications

Active members

Open complaints

Recently resolved complaints

Recent registrations

Important actions requiring attention

Do not use decorative charts unless they communicate useful information.

---

# 18. CERTIFICATE SYSTEM

Redesign the certificate experience.

Certificate preview should feel official and professional.

Verification page should clearly communicate:

Certificate Number

Member Name

Company Name

Status

Issue Date

Expiry Date if applicable

Verification result

QR code

Do not imply that a certificate is valid unless the database confirms it.

Use clear states:

Verified

Not Found

Expired

Revoked

or whatever states the existing database actually supports.

---

# 19. NEWS PAGE

Redesign the news section into a proper association publication area.

Include:

Featured article

Latest news

Categories

Publication dates

Article cards

Article page

Search/filter if appropriate

Do not make news cards excessively decorative.

Use strong editorial hierarchy.

---

# 20. FOOTER

Create a serious institutional footer.

Include:

AHUON

Short association description

Navigation

Membership

Directory

Complaints

Certificate Verification

News

Contact information

Social links if available

Legal / privacy links if implemented

Copyright

Do not invent contact details.

If contact information does not exist in the current application, create a visually appropriate placeholder structure that can easily be populated later, rather than fabricating information.

---

# 21. COMPONENT DESIGN SYSTEM

Create a coherent reusable component system.

Standardize:

Buttons

Inputs

Selects

Textareas

Cards

Tables

Badges

Alerts

Modals

Dropdowns

Tabs

Breadcrumbs

Pagination

Tooltips

Loading states

Empty states

Error states

Success states

File upload controls

Form sections

Status indicators

Use consistent:

* Border radius
* Border thickness
* Shadows
* Spacing
* Typography
* Icon sizing
* Hover states
* Focus states
* Disabled states

Do not redesign the same component differently on every page.

---

# 22. ICONOGRAPHY

Use one coherent icon library/style.

Do not mix random icon styles.

Icons should support comprehension, not decorate every sentence.

Use icons sparingly.

Do not put an icon beside every piece of metadata simply because space exists.

Humanity has survived without a location pin beside every city name.

---

# 23. MOTION

Use animation very sparingly.

Allowed:

* Subtle hover transitions
* Button feedback
* Modal transitions
* Page transitions where useful
* Dropdown animations
* Loading animations

Avoid:

* Constant floating elements
* Excessive scaling
* Large entrance animations
* Distracting parallax
* Decorative motion everywhere

The site should feel fast and stable.

---

# 24. ACCESSIBILITY

Preserve and improve the existing accessibility work.

Maintain:

* WCAG 2.1 AA target
* Keyboard navigation
* Visible focus states
* Skip navigation
* Semantic HTML
* Correct heading hierarchy
* Accessible labels
* ARIA where necessary
* Screen-reader support
* Error announcements
* Form validation
* Accessible dialogs
* Accessible dropdowns
* Accessible tables
* Accessible pagination
* Color contrast

Do not rely on color alone to communicate:

* Verification
* Complaint status
* Errors
* Success
* Warnings

Test the interface with keyboard navigation.

---

# 25. MOBILE DESIGN

Do not treat mobile as a smaller desktop.

Actually redesign responsive layouts.

Check:

320px
375px
390px
430px
768px
1024px
1280px
1440px+

Pay particular attention to:

* Navigation
* Forms
* Tables
* Directory cards
* Filters
* Dashboards
* Complaint timelines
* Certificate pages
* Buttons
* Modals

Prevent:

* Horizontal scrolling
* Overflow
* Tiny text
* Tiny buttons
* Broken grids
* Clipped content
* Overlapping elements

---

# 26. EMPTY / LOADING / ERROR STATES

Every data-driven page needs proper states.

Loading:

Use restrained skeleton loaders or clear loading indicators.

Empty:

Explain what happened and what the user can do next.

Error:

Explain the problem in human language.

Do not expose raw Supabase errors to users.

Do not use:

"Failed to fetch"

as the primary user-facing message.

Instead provide a useful message and recovery action.

---

# 27. DATA AND SECURITY UX

Do not expose sensitive member information unnecessarily.

Banking information must never appear in public member profiles.

Private registration information must remain private.

Complaint evidence must not become publicly accessible simply because a complaint exists.

Respect existing Supabase security architecture.

Do not weaken authentication or database access controls to make the UI work.

Do not hardcode credentials.

Do not expose secrets in frontend code.

---

# 28. CONTENT QUALITY

Rewrite awkward AI-generated interface copy where necessary.

Use concise, professional English.

Avoid phrases such as:

"Experience the future..."

"Revolutionary platform..."

"Seamless ecosystem..."

"Empowering excellence..."

unless there is an actual reason to say them.

AHUON is an association. Speak with institutional clarity.

Prefer:

"Find verified AHUON members."

over:

"Discover a world-class ecosystem of trusted pilgrimage service providers."

Clear beats impressive.

---

# 29. VISUAL HIERARCHY TEST

After redesigning each page, ask:

What is the most important thing on this screen?

It should be visually obvious within approximately two seconds.

Then ask:

What should the user do next?

That should also be obvious.

If everything is visually loud, nothing is important.

---

# 30. REMOVE VISUAL NOISE

Audit the existing application and REMOVE:

* Unnecessary gradients
* Redundant cards
* Excessive shadows
* Decorative icons
* Repeated headings
* Excessive badges
* Unnecessary animations
* Redundant CTAs
* Excessive rounded containers
* Visually competing sections
* Duplicate information

Do not add more UI simply because there is available space.

Whitespace is intentional.

---

# 31. DESKTOP AND MOBILE POLISH

Perform a final visual QA pass across every route.

Check:

Home
About
Register
Login
Directory
Member Detail
File Complaint
Complaint Status
Member Dashboard
EXCO Dashboard
News
Verify Certificate
404

For every page inspect:

* Alignment
* Typography
* Spacing
* Contrast
* Button consistency
* Form consistency
* Mobile responsiveness
* Loading state
* Empty state
* Error state
* Accessibility
* Navigation
* Visual hierarchy

---

# 32. FUNCTIONAL QA

After the visual redesign, verify that the following still work:

Member registration

Login

Logout

Directory search

Directory filtering

Directory sorting

Pagination

Member profile

Complaint submission

Complaint tracking

Member dashboard

Certificate generation

Certificate verification

QR verification

EXCO authentication

EXCO member approval

EXCO complaint management

News

Supabase database queries

Supabase authentication

Loading states

Error handling

Do not declare the project complete merely because the interface renders.

Actually verify interactions.

---

# 33. IMPORTANT: DO NOT BREAK EXISTING SUPABASE ARCHITECTURE

The application previously experienced fetch problems involving Edge Functions.

The current working approach uses direct Supabase database queries in areas such as Directory and Login.

Preserve the current working approach.

Before modifying any database-connected component:

1. Inspect how it currently queries Supabase.
2. Preserve working queries.
3. Preserve authentication.
4. Preserve data structures.
5. Preserve existing database relationships.
6. Only modify UI/state logic where necessary.
7. Do not create duplicate data-access systems unnecessarily.

---

# 34. REMOVE DEMO/DEVELOPMENT UI FROM THE PUBLIC EXPERIENCE

The purple "Seed Demo Data" button must NOT appear as a permanent public-facing control.

If the demo seeder is required for development, keep it behind an appropriate development/admin mechanism.

Do not expose:

* Demo credentials
* Development controls
* Seed buttons
* Debug controls
* Raw database errors
* Internal implementation details

to normal public users.

---

# 35. DESIGN PRINCIPLE

The most important principle:

LESS, BUT BETTER.

Every element should earn its place.

AHUON should feel like an organization that has existed for years and is now receiving a world-class digital platform.

It should not feel like an AI generated website attempting to prove how many UI effects it knows.

Think:

Institutional.
Elegant.
Trustworthy.
Quietly modern.
Professional.
Clear.
Human.
Nigerian.
Islamically appropriate.
Operationally serious.

---

# 36. FINAL IMPLEMENTATION REQUIREMENT

Do not merely describe the changes.

Actually implement them throughout the existing application.

Do not create a design proposal instead of modifying the website.

Do not stop after redesigning the homepage.

Apply the design system consistently across EVERY page and reusable component.

Where an existing component is visually inconsistent, refactor it so the entire application uses the new system.

Where existing functionality is already correct, leave its underlying behavior intact and improve its presentation.

Where functionality is genuinely missing, implement it only if it can be done safely without breaking the existing architecture.

At the end, perform a full consistency pass across the entire application.

The final AHUON platform should look like one coherent product designed by a professional product design team, not a sequence of individually generated pages.

PRIORITY ORDER:

1. Preserve functionality
2. Fix broken UX
3. Establish design system
4. Improve information hierarchy
5. Improve visual consistency
6. Improve accessibility
7. Improve responsive behavior
8. Remove visual noise
9. Polish interactions
10. Perform full QA

Do NOT optimize for "more features."

Optimize for:

CLARITY + TRUST + PROFESSIONALISM + USABILITY.
