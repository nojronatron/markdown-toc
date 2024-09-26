# Create Markdown TOC README

Locates all Level 2 headings in the currently selected markdown file and creates a clean, orderly table of contents near the top of the document. As expected, the table of contents entries link to all discovered Level 2 heading labels within the document, simplifying navigation.

## Features

- Creates a table of contents in the currently open markdown file just prior to the first Level 2 heading.
- Links to Level 2 headings are stored in the generated table of contents.
- Supports standard Headings (Open ATX) that are only prefixed with `#` character(s).
- Support Closed ATX Headings prefixed and suffixed with `#` character(s).
- Supports alternate (Next Line) Headings syntax using `=` or `-` characters on nextline following heading title.
- Generated Table of Contents uses same style of heading (Open, closed, ATX, etc) that it detects within your document.
- If there is no first level heading, the generated Table of Contents will be inserted near the top of the document.
- Unsupported link-fragment characters are removed.
- Headings that contain characters other than alpha-numerics will likely be processed with the exception of unsupported characters such as `<`, `>`, and `:`.
- Use the VSCode Command Palette to insert the new table of contents.
- If a Table of Contents already exists, the extension will not make any changes.

See [CHANGELOG.md](./CHANGELOG.md) for details.

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

Build: `npm install`

Test: `npm test`

Install: Open _Extensions_ panel (`ctrl+shift+x`) in VS Code and search for "Create Markdown TOC".

For development:

- `vscode ^1.90.0`.
- `node 20.14.x`.
- See `package.json` for additional dev dependencies in [my GitHub Project Repo](https://github.com/nojronatron/markdown-toc/).

### Testing

Automatically run unit tests in a Terminal by using `npm test`.

Manual test files are located in the `/test/manual-test-files/` directory. Run VS Code, Press F5 to execute the 'Run Extension' Launch Configuration, and then open the folder to get started. _Avoid_ saving changes to the files.

## Extension Settings

Contributes.Command: `markdown-toc.createTOC` "Create Table of Contents"

ActivationEvents: none.

## Known Issues

- Always use a Markdown Linter before running this tool for the best results.
- A Level 1 Heading must be followed by a newline character or it will be ignored (note: Table of Contents generation does not depend on any Level 1 heading specifically).
- Headings that start with a space may cause Create ToC to ignore the heading.
- Level 2 headings that do not match Level 1 heading style will not be shown in the generated Table of Contents.
- Using multiple headings types will produce unexpected results.
- A user can create a Heading with many spaces in it that will Lint without error. Create ToC will generate a valid, Linted Link Fragment for that "spacey heading" _but_ the link will be dead.

_Note_: See [GitHub Issues List](https://github.com/nojronatron/markdown-toc/issues) for the most current status.

## Release Notes

This release adds the ability to detect both Standard (Open ATX and Closed ATX) style and Alternate (Next Line) style level 1 and level 2 headings. In all cases, the generated Table of Contents with link fragments will be inserted near the top of the existing markdown document under the first discovered Level 1 heading.

See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.

---

## Credits

Design, code, test, and publisher: Jon Rumsey [GitHub](https://github.com/nojronatron) [LinkedIn](https://www.linkedin.com/in/jonathan-rumsey-wa)

## References

- Markdown Rules guidance from [DavidAnson's Markdown Lint repo](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)
- GitIgnore suggestions from [TopTal.com](https://www.toptal.com/developers/gitignore/api/visualstudiocode)
- Guidance on how to create a VS Code Extension from MSFT Learn [VS Code Docs](https://code.visualstudio.com/api/get-started/your-first-extension)
