# ADRsource CMS Content Model

## Important Notes

- Team members are split into two groups: `neutrals` and `case-managers`.
- `case-managers` can manage many `neutrals`.
- `neutrals` can only be managed by one `case-manager`.

## HomePage

- [seo](#component---seo)

## ResourcesPage

- [seo](#component---seo)

## ResourcePage

- [seo](#component---seo) (required)
- title - string (required)
- publishDate - date
- slug - string (required) (unique)
- author - [Neutral](#neutral) | [CaseManager](#casemanager)
- [ResourceType](#resourcetype) (required)
- resourceContent - rich text

## ResourceType

- [ResourcePages](#resourcepage)[]

## AboutPage

- [seo](#component---seo)

## SchedulePage

- [seo](#component---seo)

## TeamPage

- [seo](#component---seo)

## MemberPage

- internalName - string (required)
- [seo](#component---seo) (required)
- slug - string (required) (unique)
- member - [Neutral](#neutral) | [CaseManager](#casemanager)

## Neutral

- internalName - string (required)
- [info](#basememberinfo) (required)
- [MemberPage](#memberpage)
- focusAreas - string[]
- nadnId - string (required) (unique)
- [ResourcePages](#resourcepage)[]
- experienceStartDate - date <!-- use to calc YOE -->
- [CaseManager](#casemanager)

## CaseManager

- internalName - string (required)
- [info](#component---basememberinfo)
- [Neutrals](#neutral)[]
- [MemberPage](#memberpage)[]
- [ResourcePages](#resourcepage)[]

## Component - BaseMemberInfo

- headshot - Asset
- name - string
- email - string
- phone - string
- linkedIn - string
- bio - rich text

## Component - Seo

- title - string
- description - string
- index - boolean

## Component - Link

- internalName - string
- url - string
- text - string?
