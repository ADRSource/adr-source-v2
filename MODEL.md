# ADRsource CMS Content Model

## Important Notes

- Team members are split into two groups: `neutrals` and `case-managers`.
- `case-managers` can manage many `neutrals`.
- `neutrals` can only be managed by one `case-manager`.

## HomePage

- [seo](#component---seo) (required)

## ResourcesPage

- [seo](#component---seo) (required)

## ResourcePage

- [seo](#component---seo) (required)
- title - string (required)
- publishDate - date (required)
- slug - string (required) (unique)
- author - [Neutral](#neutral) | [CaseManager](#casemanager)
- [ResourceType](#resourcetype)
- resourceContent - rich text (required)

## ResourceType

- [ResourcePages](#resourcepage)[]

## AboutPage

- [seo](#component---seo) (required)

## SchedulePage

- [seo](#component---seo) (required)

## TeamPage

- [seo](#component---seo) (required)

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
- [info](#component---basememberinfo) (required)
- [Neutrals](#neutral)[]
- [MemberPage](#memberpage)[]
- [ResourcePages](#resourcepage)[]

## Component - BaseMemberInfo

- headshot - Asset (required)
- name - string (required)
- email - string (required)
- phone - string (required)
- linkedIn - string (required)
- bio - rich text (required)

## Component - Seo

- title - string (required)
- description - string (required)
- index - boolean

## Component - Link

- internalName - string (required)
- url - string (required)
- text - string (required)
