<div align="center">

# focus-trap-util

**A focus trap that respects Shadow DOM, portals, and the escape key.**

[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

</div>

## About

The usual focus-trap bug is that it queries `document.querySelectorAll`
once and then the modal's content changes underneath it. This one recomputes
the tabbable set on every `Tab`, handles Shadow DOM roots by descending into
them, and treats `Escape` as a callback rather than an implicit close, because
"do you want to discard your changes" is a product decision, not a utility one.

## Quick start

```bash
git clone https://github.com/irisdomain23/focus-trap-util
npm install
npm test
```

## Configuration

| Key | Description |
| --- | --- |
| `container` | element that receives the trap |
| `initialFocus` | element focused on activation, defaults to first tabbable |
| `returnFocus` | element focused on deactivation |
| `onEscape` | callback fired instead of always closing |
## Roadmap

- [ ] Iframe-boundary handling
- [ ] React and Vue binding examples
- [ ] Screen-reader test notes

## Contributing

Issues and pull requests are welcome. Please keep changes small and focused,
and add a test for any behaviour change — every repository here ships with a
runnable test suite and no third-party dependencies, so CI is just
`python3 -m unittest` / `bash test_*.sh`.

## License

[MIT](LICENSE)
