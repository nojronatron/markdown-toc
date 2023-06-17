# markdown-toc README

Locates all Level 2 headings in the currently selected markdown file and creates a clean, orderly table of contents near the top that links to all Level 2 heading labels for simplified navigation.

## Features

- Creates a Table of Contents in the currently open markdown file.
- Links to Level 2 heading IDs are stored in Table of contents.
- Uses the VSCode Command Palette to insert the new table of contents.
- Supports `#` character Headings markdown only.

## About This Extension

![Open a markdown file with headings in it](images/markdown-toc-md-file-with-headings.png)

Open a Markdown File with Headings in it.

---

![Open the Command Palette and find Create Table of Contents command](images/markdown-toc-create-toc-video.gif)

Open Command Palette to find "Create Table of Contents".

---

![Select the command and all Level 2 headings will get linked using Heading IDs](images/markdown-toc-md-file-updated-with-toc.png)

Select the command and a Table of Contents will be created with Heading IDs linked up.

---

## Requirements

The only dependencies are `vscode ^1.79.0 and those listed in devDependencies in the package.json file in my [GitHub Project Repo](https://github.com/nojronatron/markdown-toc/).

## Extension Settings

No `contributes.configuration` extension points are implemented.

## Known Issues

- No support for 'next-line' heading markdown that uses `=` or `-` as Heading level indicators. My intention is to address this in a future release.

_Note_: This is not an exhaustive list. See [GitHub Issues List](https://github.com/nojronatron/markdown-toc/issues) for this project repository.

## Release Notes

- My first VS Code Extension! :tada:
- Minimum viable features implemented.
- Unit tests and documentation included.

See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.

---

## Credits

Design, code, test, and publisher: Jon Rumsey [GitHub](https://github.com/nojronatron) [LinkedIn](https://www.linkedin.com/in/jonathan-rumsey-wa)

GitIgnore suggestions from [TopTal.com](https://www.toptal.com/developers/gitignore/api/visualstudiocode)
