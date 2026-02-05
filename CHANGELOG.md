# Changelog

## [2.1.1] - 2026-02-05

### Fixed

- Vanilla has its own entry point under '@twistezo/react-text-scramble/vanilla' to avoid React imports

## [2.1.0] - 2026-02-05

### Added

- Vanilla JS/TS support with class and function APIs
- Vanilla JS example

### Changed

- React component refactored to use `TextScrambleAnimator` internally

### Fixed

- Pause/play bug where paused prop was recreating animator instead of pausing animation state

## [2.0.0] - 2026-02-05

### Added

- Many unit tests for component and utilities
- Integration tests for ESM and CJS bundles
- Bun test runner with happy-dom for DOM testing
- Interactive demo in `example/`

### Changed

- [Breaking] Pause now immediately stops all animations
- Migrate project from npm/tsc to Bun

### Fixed

- Memory Leaks: Properly clean up intervals and timeouts on component unmount

### Removed

- [Breaking] Drop support for GitHub Packages

## [1.0.6] - 2021-08-03

- React text scramble effect component
- TypeScript support
- Customizable animation speeds
- Multiple text cycling
