# ADRsource CMS Content Model

## Important Notes

- Team members are split into two groups: `neutrals` and `case-managers`.
- `case-managers` can manage many `neutrals`.
- `neutrals` can only be managed by one `case-manager`.

## Page - Home

- [seo](#component---seo)

## Page - Resources

- [seo](#component---seo)

## Page - Resource

- [seo](#component---seo)
- title - string
- slug - string
- author - TeamMember
- publishedAt - date
- type - enum (article, news, webinar)
- content - rich text

## Page - About

- [seo](#component---seo)

## Page - Schedule

- [seo](#component---seo)

## Page - Team

- [seo](#component---seo)

## Page - Member

- [seo](#component---seo)
- slug - string
- role - enum (neutral, case-manager)
- member - [Neutral](#neutral) | [CaseManager](#casemanager)

## Neutral

- [baseMemberInfo](#basememberinfo)
- [caseManager](#casemanager)
- focusAreas - string[]
- nadnId - string
- experienceStartDate - date <!-- use to calc YOE -->

## CaseManager

- [baseMemberInfo](#basememberinfo)
- [neutrals](#neutral)[]

## BaseMemberInfo

- name - string
- email - string
- phone - string
- linkedIn - string
- bio - rich text
- photo - Asset

## Component - Seo

- title - string
- description - string
- index - boolean

## Component - Link

- internalName - string
- url - string
- text - string?
