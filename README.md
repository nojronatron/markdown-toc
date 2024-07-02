# Create Markdown TOC README

Locates all Level 2 headings in the currently selected markdown file and creates a clean, orderly table of contents near the top of the document. As expected, the table of contents entries link to all discovered Level 2 heading labels within the doc, simplifying navigation.

## Features

- Creates a Table of Contents in the currently open markdown file.
- Links to Level 2 heading IDs are stored in Table of contents near top of document.
- Uses the VSCode Command Palette to insert the new table of contents.
- Supports `#` character Headings ('Open ATX') and `=` and `-` characters (alternate syntax) markdown.

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

The only dependencies are `vscode ^1.79.0 and those listed in devDependencies in the package.json file in my [GitHub Project Repo](https://github.com/nojronatron/markdown-toc/).

## Extension Settings

Contributes.Command: `markdown-toc.createTOC` "Create Table of Contents"

ActivationEvents: none.

## Known Issues

- If an H1 equivalent standard heading is not followed by a newline character, it will be ignored. In this case, a Linter should be used and the Markdown should be reformatted to meet minimum standard headings rules.
- Markdown lines start start with a space, whether a header or following a header, may cause Create ToC to miss one or more headers. It is a good practice to use a Markdown Linter. Recommend setting a Linter to run automatically when saving the file to avoid this potentially surprising result.

_Note_: See [GitHub Issues List](https://github.com/nojronatron/markdown-toc/issues) for the most current status.

## Development

1. Development should be possible in Windows, Windows Subsystem for Linux or pure Linux (Ubuntu 22.x recommended) environment.
2. Fork this repo, clone, and create your development branch.
3. `npm i` to install dependencies.
4. `npm run vscodeTest` to execute existing unit tests.
5. Open `Run and Debug` in VSCode and click _Run Extension_ to interact in debug mode. Also, selecting _Extension Tests_ from the Run and Debug Configuration should run the tests similar to step 4.
6. Commit changes, add unit tests, perform manual testing, and push code to create a new PR. Be sure to add Tasks completed, additional context, and link to an existing Issue this PR solves (if there isn't one, create it before generating a new PR).

_Note_: Executing unit tests from shell might fail with an error 'failed to connect to the remote extension host server'. Following [Microsoft VSCode Issue# 187360](https://github.com/microsoft/vscode/issues/187360), delete `~.vscode-server` directory and child items and then restart VSCode. It might also be necessary to install additional Extensions (see `.vscode/extensions.json`), and set additional configuration settings (see `.vscode/settings.json`).

_Note2_: Executing unit tests in a WSL environment from shell might fail with an error 'Failed to connect to the bus: Failed to connect to socket /run/dbus/system_bus_socket: No such file or directory Exit code: SIGTRAP'. Because WSL does not boot-up Linux as it would in a fully-deployed system (e.g. hardware or virtual machine), there is no DBUS systemd/systemctl process running. Internet searches return fairly old references to this problem in WSL 1.x and mostly with other (not Ubuntu) distros, so it is not clear what the answer is.

_Note3_: Executing unit tests from within VSCode as described in step 5 above are working as of v0.2.1.

## Release Notes

This release adds the ability to detect both ATX and Alternate style level 1 and level 2 Headings. In both cases, the generated Table of Contents anchors link fragments to the headings in the markdown document.

See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.

---

## Credits

Design, code, test, and publisher: Jon Rumsey [GitHub](https://github.com/nojronatron) [LinkedIn](https://www.linkedin.com/in/jonathan-rumsey-wa)

## References

- Markdown Rules guidance from [DavidAnson's Markdown Lint repo](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)
- GitIgnore suggestions from [TopTal.com](https://www.toptal.com/developers/gitignore/api/visualstudiocode)
- Guidance on how to create a VS Code Extension from MSFT Learn [VS Code Docs](https://code.visualstudio.com/api/get-started/your-first-extension)
