## 1.0.0
- Published or something idk

## 1.1.0
- Added Preview for watcher. It is always on currently. Just close it if you don't want it. Applab preview kind of doesnt work. That or design.html is bugged.

## 1.1.1
- Attempt to fix type folder not being included

## 1.2.0
- Typescript compiler fixes.
- Added support for Nomx, a Nom-like library but more strict and exclusive to cdo-sync. Recommended use with typescript.
- Fixed design.html

## 1.2.1
- Patch for stuff I did not include in the last version: Proper support for Nomx definitions and library

## 1.2.2
- A few updates for Nomx, basically more properties. And a new class, RippleButton.

## 1.3.0
- Fixes to typescript compiler that *should* work with folders with spaces. In the future I do want to have the folder contain node_modules for type definitions for libraries, so that
	```ts
	import Library from "./libraries/library"
	```
	Can be used instead of adding to add each manually and have all the library type definitions pre-defined.