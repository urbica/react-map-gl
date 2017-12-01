# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.6.0-beta.0"></a>
# [0.6.0-beta.0](https://github.com/urbica/react-map-gl/compare/v0.5.3...v0.6.0-beta.0) (2017-12-01)


### Features

* **SSR:** do not require mapbox-gl on non-browser environments ([2b1ebe1](https://github.com/urbica/react-map-gl/commit/2b1ebe1))



<a name="0.5.3"></a>
## [0.5.3](https://github.com/urbica/react-map-gl/compare/v0.5.2...v0.5.3) (2017-11-23)


### Bug Fixes

* **Layer:** unsubscribe from events on componentWillUnmount  ([#7](https://github.com/urbica/react-map-gl/issues/7)) ([6ea478d](https://github.com/urbica/react-map-gl/commit/6ea478d))



<a name="0.5.2"></a>
## [0.5.2](https://github.com/urbica/react-map-gl/compare/v0.5.1...v0.5.2) (2017-11-20)



<a name="0.5.1"></a>
## [0.5.1](https://github.com/urbica/react-map-gl/compare/v0.5.0...v0.5.1) (2017-11-17)


### Bug Fixes

* **Cluster:** recreate cluster on new props ([24509ea](https://github.com/urbica/react-map-gl/commit/24509ea))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/urbica/react-map-gl/compare/v0.4.2...v0.5.0) (2017-11-14)


### Features

* **Cluster:** add Cluster component ([330d6e6](https://github.com/urbica/react-map-gl/commit/330d6e6))



<a name="0.4.2"></a>
## [0.4.2](https://github.com/urbica/react-map-gl/compare/v0.4.1...v0.4.2) (2017-11-13)


### Bug Fixes

* **MapGL:** _updateMapStyle equality check ([7b00541](https://github.com/urbica/react-map-gl/commit/7b00541))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/urbica/react-map-gl/compare/v0.4.0...v0.4.1) (2017-11-13)


### Bug Fixes

* rebuild dist bundle ([aafbcd0](https://github.com/urbica/react-map-gl/commit/aafbcd0))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/urbica/react-map-gl/compare/v0.3.2...v0.4.0) (2017-11-13)


### Bug Fixes

* **MapGL:** emit onViewportChange only if user interacted with map ([73555ee](https://github.com/urbica/react-map-gl/commit/73555ee))


### Features

* **Marker:** add Marker component ([a5ed563](https://github.com/urbica/react-map-gl/commit/a5ed563))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/urbica/react-map-gl/compare/v0.3.1...v0.3.2) (2017-11-02)


### Bug Fixes

* **Map:** add scrollZoom prop ([e916c87](https://github.com/urbica/react-map-gl/commit/e916c87))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/urbica/react-map-gl/compare/v0.3.0...v0.3.1) (2017-10-20)


### Bug Fixes

* **MapGL:** add getMap method to access map instance ([df79111](https://github.com/urbica/react-map-gl/commit/df79111))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/urbica/react-map-gl/compare/v0.2.2...v0.3.0) (2017-10-20)


### Bug Fixes

* fix flow type annotations ([5f480ee](https://github.com/urbica/react-map-gl/commit/5f480ee))
* fix onLoad ([aa4509e](https://github.com/urbica/react-map-gl/commit/aa4509e))


### Features

* introduce Source and Layer components as MapGL children ([da5d660](https://github.com/urbica/react-map-gl/commit/da5d660))
* **Layer:** introduce onEnter and onLeave props ([684cb05](https://github.com/urbica/react-map-gl/commit/684cb05))
* **MapGL:** add a lot of Mapbox GL JS Map options as MapGL props ([b9a6649](https://github.com/urbica/react-map-gl/commit/b9a6649))
* **MapGL:** add renderWorldCopies prop ([a33a944](https://github.com/urbica/react-map-gl/commit/a33a944))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/urbica/react-map-gl/compare/v0.2.1...v0.2.2) (2017-09-18)


### Bug Fixes

* do not handle viewport changes if there is no onViewportChange prop ([285c22d](https://github.com/urbica/react-map-gl/commit/285c22d))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/urbica/react-map-gl/compare/v0.2.0...v0.2.1) (2017-09-15)


### Bug Fixes

* handle rotateend pitchend boxzoomend [#2](https://github.com/urbica/react-map-gl/issues/2) ([4f6176d](https://github.com/urbica/react-map-gl/commit/4f6176d))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/urbica/react-map-gl/compare/v0.1.0...v0.2.0) (2017-09-12)


### Features

* add onClick support ([8f0b836](https://github.com/urbica/react-map-gl/commit/8f0b836))
* add onHover support ([382b680](https://github.com/urbica/react-map-gl/commit/382b680))



<a name="0.1.0"></a>
# 0.1.0 (2017-08-10)


### Bug Fixes

* fix default export ([ce3bc75](https://github.com/urbica/react-map-gl/commit/ce3bc75))


### Features

* add flow and some documentation ([afdba45](https://github.com/urbica/react-map-gl/commit/afdba45))
* initial commit ([47287e4](https://github.com/urbica/react-map-gl/commit/47287e4))
