# Change Log

All notable changes to the "markdown-toc" extension will be documented in this file using Sematic Versioning.

See [Keep a Changelog](http://keepachangelog.com/) for how this file is structured.

## [Unreleased]

## [0.4.2] - 2024-09-24

Added:

- Support for Closed ATX Style Headings.

```markdown
# Top Level Heading #

Lorem ipsum...

## Table of Contents ##

- [Second Level Heading](#second-level-heading)

## Second Level Heading ##

Dolor sit amet...

```

Bugfixes:

- Generated Table of Contents should use same style as first discovered heading.
- Comma and period characters cause invalid link fragment generation.
- Slash character in a heading causes invalid link fragment generation.
- Undocumented: Space characters in Heading causes invalid link fragment generation.

## [0.3.1] - 2024-07-22

Added:

- Heading Text used in generatd Table of Contents will only be altered if unsupported characters are included.
- Multiple unit tests for better code coverage.

Bugfixes:

- Table of Contents created invalid link fragments in some cases.

## [0.2.1] - 2024-07-01

Added:

- Support for 'next line' headings characters `=` and `-`.

```markdown
Top Level Heading
=

Second Level Heading
-

```

## [0.1.2] - 2023-06-28

Added:

- Support for processing level 2 headers that contain special characters.
- Added References section to README.
- Updated Extension Settings section in README.

Fixed:

- Bug: Certain characters trigger invalid link fragment rule.

## [0.0.1] - 2023-06-16

Added:

- Initial release, reached MVP
- CHANGELOG, README, LICeNSE, and core configuration files to configure dev, build, and test
- Solution implementation
- Unit tests for each functional component
- Screenshots and animated JPG depecting use of this extension
