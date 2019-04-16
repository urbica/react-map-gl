# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [1.6.0](https://github.com/urbica/react-map-gl/compare/v1.5.0...v1.6.0) (2019-04-16)


### Bug Fixes

* **Source:** normalize Source children ([a53a840](https://github.com/urbica/react-map-gl/commit/a53a840))


### Features

* **LanguageControl:** add possibility to set language ([8a0eca3](https://github.com/urbica/react-map-gl/commit/8a0eca3))



# [1.5.0](https://github.com/urbica/react-map-gl/compare/v1.4.0...v1.5.0) (2019-04-11)


### Features

* **Source:** allow add Layers as children components in Source ([73e2d45](https://github.com/urbica/react-map-gl/commit/73e2d45))



# [1.4.0](https://github.com/urbica/react-map-gl/compare/v1.3.0...v1.4.0) (2019-04-08)


### Bug Fixes

* **Source:** remove dependent layers on componentWillUnmount ([3f228af](https://github.com/urbica/react-map-gl/commit/3f228af))


### Features

* **Source:** add dynamic update for vector sources mapbox/mapbox-gl-js[#8048](https://github.com/urbica/react-map-gl/issues/8048) ([7bcd8d7](https://github.com/urbica/react-map-gl/commit/7bcd8d7))



# [1.3.0](https://github.com/urbica/react-map-gl/compare/v1.2.0...v1.3.0) (2019-03-31)

### Features

- **Control:** Add LanguageControl ([e207dd6](https://github.com/urbica/react-map-gl/commit/e207dd6)) (h/t [Tuizi](https://github.com/Tuizi))
- **Marker:** add drag and dragstart events ([#173](https://github.com/urbica/react-map-gl/issues/173)) ([87313ed](https://github.com/urbica/react-map-gl/commit/87313ed)) (h/t [boyur](https://github.com/boyur))

# [1.2.0](https://github.com/urbica/react-map-gl/compare/v1.1.0...v1.2.0) (2019-03-27)

### Bug Fixes

- check for map style on components unmounting ([7634b7b](https://github.com/urbica/react-map-gl/commit/7634b7b))

### Features

- **Controls:** Add getControl() ([a8883f9](https://github.com/urbica/react-map-gl/commit/a8883f9)) (h/t [Tuizi](https://github.com/Tuizi))

# [1.1.0](https://github.com/urbica/react-map-gl/compare/v1.0.0...v1.1.0) (2019-03-27)

### Features

- **Geolocate Control:** Add missing events ([b9fe204](https://github.com/urbica/react-map-gl/commit/b9fe204)) (h/t [Tuizi](https://github.com/Tuizi))

# [1.0.0](https://github.com/urbica/react-map-gl/compare/v1.0.0-beta.0...v1.0.0) (2019-03-14)

### Bug Fixes

- **CustomLayer:** fix layer id getter ([dd278ed](https://github.com/urbica/react-map-gl/commit/dd278ed)), closes [#163](https://github.com/urbica/react-map-gl/issues/163)
- **MapGL:** rewrite layers ordering with normalizeChildren [#163](https://github.com/urbica/react-map-gl/issues/163) ([47c7cb8](https://github.com/urbica/react-map-gl/commit/47c7cb8))

# [1.0.0-beta.0](https://github.com/urbica/react-map-gl/compare/v1.0.0-alpha.4...v1.0.0-beta.0) (2019-03-11)

### Features

- **Cluster:** move Cluster component to separate package ([6b09f97](https://github.com/urbica/react-map-gl/commit/6b09f97))
- **FeatureState:** add FeatureState component ([91b9fc8](https://github.com/urbica/react-map-gl/commit/91b9fc8))

### BREAKING CHANGES

- **Cluster:** Cluster component was moved to separate package @urbica/react-map-gl-cluster

# [1.0.0-alpha.4](https://github.com/urbica/react-map-gl/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2019-03-06)

### Features

- **MapGL:** add viewportChangeMethod and viewportChangeOptions props ([85a04b7](https://github.com/urbica/react-map-gl/commit/85a04b7))
- **Source:** drop separate source components ([012f030](https://github.com/urbica/react-map-gl/commit/012f030))

### BREAKING CHANGES

- **MapGL:** default map viewportChangeMethod changed to jumpTo
- **Source:** remove GeoJSONSource and VectorSource, use Source with type prop instead

# [1.0.0-alpha.3](https://github.com/urbica/react-map-gl/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2019-03-05)

### Bug Fixes

- **MapGL:** fix nextLayerIds collection ([#161](https://github.com/urbica/react-map-gl/issues/161)) ([fbc20c5](https://github.com/urbica/react-map-gl/commit/fbc20c5))

# [1.0.0-alpha.2](https://github.com/urbica/react-map-gl/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2019-03-05)

# [1.0.0-alpha.1](https://github.com/urbica/react-map-gl/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2019-03-05)

### Bug Fixes

- **MapGL:** fix map container flow type ([84896f6](https://github.com/urbica/react-map-gl/commit/84896f6))
- **MapGL:** fix refs in children render ([f038200](https://github.com/urbica/react-map-gl/commit/f038200))

# [1.0.0-alpha.0](https://github.com/urbica/react-map-gl/compare/v0.7.0-beta.1...v1.0.0-alpha.0) (2019-03-04)

### Bug Fixes

- **GeoJSONSource:** fix flow typings ([43ee25d](https://github.com/urbica/react-map-gl/commit/43ee25d))
- **GeoJSONSource:** fix GeoJSONSource type ([e503e2e](https://github.com/urbica/react-map-gl/commit/e503e2e))

### Code Refactoring

- **Cluster:** do not wrap user provided component in Marker by default ([9dbbdf1](https://github.com/urbica/react-map-gl/commit/9dbbdf1))
- **Marker:** switch to portal for rendering Marker content ([a3611d4](https://github.com/urbica/react-map-gl/commit/a3611d4))
- **Popup:** switch to portal for rendering popup content ([3030747](https://github.com/urbica/react-map-gl/commit/3030747))

### Features

- **GeoJSONSource:** add GeoJSONSource ([0c7c1b4](https://github.com/urbica/react-map-gl/commit/0c7c1b4))
- **VectorSource:** add VectorSource ([cf1f028](https://github.com/urbica/react-map-gl/commit/cf1f028))

### BREAKING CHANGES

- **Cluster:** rename `element` prop to `component` and no longer wrap it in Marker
- **Marker:** element prop was removed, use children instead
- **Popup:** element prop was removed, use children instead

<a name="0.7.0-beta.1"></a>

# [0.7.0-beta.1](https://github.com/urbica/react-map-gl/compare/v0.7.0-beta.0...v0.7.0-beta.1) (2019-02-01)

### Features

- **MapContext:** expose MapContext ([f933dcf](https://github.com/urbica/react-map-gl/commit/f933dcf))

<a name="0.7.0-beta.0"></a>

# [0.7.0-beta.0](https://github.com/urbica/react-map-gl/compare/v0.6.0...v0.7.0-beta.0) (2019-01-31)

### Features

- **AttributionControl:** add AttributionControl ([71418d4](https://github.com/urbica/react-map-gl/commit/71418d4))
- **CustomLayer:** add CustomLayer support ([c26e56c](https://github.com/urbica/react-map-gl/commit/c26e56c))
- **FullscreenControl:** add FullscreenControl ([4776dd8](https://github.com/urbica/react-map-gl/commit/4776dd8))
- **GeolocateControl:** add GeolocateControl ([8fdda19](https://github.com/urbica/react-map-gl/commit/8fdda19))
- **ScaleControl:** add ScaleControl ([b434cac](https://github.com/urbica/react-map-gl/commit/b434cac))

<a name="0.6.0"></a>

# [0.6.0](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.19...v0.6.0) (2019-01-17)

### Bug Fixes

- **MapGL:** handle previous props in \_updateMapViewport ([643c38d](https://github.com/urbica/react-map-gl/commit/643c38d))
- throw an error if layer or source props is not an Immutable objects ([a43b320](https://github.com/urbica/react-map-gl/commit/a43b320))

### Features

- **Marker:** add drag support ([10c41f6](https://github.com/urbica/react-map-gl/commit/10c41f6))

<a name="0.6.0-beta.19"></a>

# [0.6.0-beta.19](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.18...v0.6.0-beta.19) (2019-01-15)

### Bug Fixes

- improve flow typings ([d81a82b](https://github.com/urbica/react-map-gl/commit/d81a82b))
- improve flow typings ([ca1a3e8](https://github.com/urbica/react-map-gl/commit/ca1a3e8))
- **Layer:** make radius prop optional ([ab79712](https://github.com/urbica/react-map-gl/commit/ab79712))

### Chores

- update dependencies ([920666e](https://github.com/urbica/react-map-gl/commit/920666e))

### Features

- **NavigationControl:** add NavigationControl [#116](https://github.com/urbica/react-map-gl/issues/116) ([34ae92f](https://github.com/urbica/react-map-gl/commit/34ae92f))

### BREAKING CHANGES

- supercluster peer dependency is updated to 5.0.0

<a name="0.6.0-beta.18"></a>

# [0.6.0-beta.18](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.17...v0.6.0-beta.18) (2018-10-15)

### Bug Fixes

- switch to class properties ([d31a2f9](https://github.com/urbica/react-map-gl/commit/d31a2f9))

### Features

- add React v15 support ([@boyur](https://github.com/boyur) [#105](https://github.com/urbica/react-map-gl/issues/105)) ([f5defa6](https://github.com/urbica/react-map-gl/commit/f5defa6))

<a name="0.6.0-beta.17"></a>

# [0.6.0-beta.17](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.16...v0.6.0-beta.17) (2018-09-27)

### Bug Fixes

- **Marker:** Re-render Marker if position changed (@matis-dk [4fa6126](https://github.com/urbica/react-map-gl/commit/4fa6126))

<a name="0.6.0-beta.16"></a>

# [0.6.0-beta.16](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.15...v0.6.0-beta.16) (2018-09-25)

### Bug Fixes

- fix mapbox-gl flow types import ([7b40115](https://github.com/urbica/react-map-gl/commit/7b40115))
- **Cluster:** remove moveend handler on componentWillUnmount ([230bac5](https://github.com/urbica/react-map-gl/commit/230bac5))
- **Marker:** unmount Marker container on componentWillUnmount ([d57852a](https://github.com/urbica/react-map-gl/commit/d57852a))

<a name="0.6.0-beta.15"></a>

# [0.6.0-beta.15](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.14...v0.6.0-beta.15) (2018-08-14)

### Bug Fixes

- add onPopupClose prop for Popup ([#60](https://github.com/urbica/react-map-gl/issues/60)) ([b1735a4](https://github.com/urbica/react-map-gl/commit/b1735a4))
- **Layer:** fix props type definitions ([20655d1](https://github.com/urbica/react-map-gl/commit/20655d1))
- change deprecated componentWillReceiveProps to componentDidUpdate ([b7bfa80](https://github.com/urbica/react-map-gl/commit/b7bfa80))
- fix propTypes defaults ([e687a16](https://github.com/urbica/react-map-gl/commit/e687a16))
- **MapGL:** reverse layers paint order to respect layers before prop ([107bb38](https://github.com/urbica/react-map-gl/commit/107bb38))
- **Popup:** rename onPopupClose to onClose ([8591e3d](https://github.com/urbica/react-map-gl/commit/8591e3d))

### Code Refactoring

- remove external dependencies ([2a8392c](https://github.com/urbica/react-map-gl/commit/2a8392c))

### BREAKING CHANGES

- **Popup:** Popup onPopupClose prop is renamed to onClick
- supercluster is a peer dependency now

<a name="0.6.0-beta.14"></a>

# [0.6.0-beta.14](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.13...v0.6.0-beta.14) (2018-05-31)

<a name="0.6.0-beta.13"></a>

# [0.6.0-beta.13](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.12...v0.6.0-beta.13) (2018-05-25)

### Features

- **MapGL:** add cursorStyle prop ([73294d3](https://github.com/urbica/react-map-gl/commit/73294d3))
- **MapGL:** add mapbox-gl event listener props support ([c0b1ec5](https://github.com/urbica/react-map-gl/commit/c0b1ec5))

<a name="0.6.0-beta.12"></a>

# [0.6.0-beta.12](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.11...v0.6.0-beta.12) (2018-05-22)

### Bug Fixes

- layer filters can be deep nested List now ([#49](https://github.com/urbica/react-map-gl/issues/49)) ([665a8e0](https://github.com/urbica/react-map-gl/commit/665a8e0))

### Features

- **Popup:** add Popup component ([c08f524](https://github.com/urbica/react-map-gl/commit/c08f524))

<a name="0.6.0-beta.11"></a>

# [0.6.0-beta.11](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.10...v0.6.0-beta.11) (2018-04-20)

### Bug Fixes

- **MapGL:** fix layer before prop passing ([7ab5f4f](https://github.com/urbica/react-map-gl/commit/7ab5f4f))

<a name="0.6.0-beta.10"></a>

# [0.6.0-beta.10](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.9...v0.6.0-beta.10) (2018-03-07)

### Bug Fixes

- **MapGL:** preserve children on mapStyle updates ([b0381fb](https://github.com/urbica/react-map-gl/commit/b0381fb))

<a name="0.6.0-beta.9"></a>

# [0.6.0-beta.9](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.8...v0.6.0-beta.9) (2018-03-01)

### Bug Fixes

- **MapContext:** use create-react-context polyfill ([557f196](https://github.com/urbica/react-map-gl/commit/557f196))
- **package:** update create-react-context to version 0.2.0 ([#36](https://github.com/urbica/react-map-gl/issues/36)) ([64328bb](https://github.com/urbica/react-map-gl/commit/64328bb))
- fix react version ([51093ee](https://github.com/urbica/react-map-gl/commit/51093ee))

<a name="0.6.0-beta.9"></a>

# [0.6.0-beta.9](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.8...v0.6.0-beta.9) (2018-03-01)

### Bug Fixes

- **MapContext:** use create-react-context polyfill ([557f196](https://github.com/urbica/react-map-gl/commit/557f196))
- **package:** update create-react-context to version 0.2.0 ([#36](https://github.com/urbica/react-map-gl/issues/36)) ([64328bb](https://github.com/urbica/react-map-gl/commit/64328bb))
- fix react version ([51093ee](https://github.com/urbica/react-map-gl/commit/51093ee))

<a name="0.6.0-beta.8"></a>

# [0.6.0-beta.8](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.6...v0.6.0-beta.8) (2018-02-15)

### Bug Fixes

- **Source:** remove dependent layers on source removal and support vector source tiles update ([99d3390](https://github.com/urbica/react-map-gl/commit/99d3390))

### Features

- switch to next React Context API ([6c26667](https://github.com/urbica/react-map-gl/commit/6c26667))

<a name="0.6.0-beta.7"></a>

# [0.6.0-beta.7](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.6...v0.6.0-beta.7) (2018-02-15)

### Bug Fixes

- **Source:** remove dependent layers on source removal and support vector source tiles update ([99d3390](https://github.com/urbica/react-map-gl/commit/99d3390))

### Features

- switch to next React Context API ([6c26667](https://github.com/urbica/react-map-gl/commit/6c26667))

<a name="0.6.0-beta.6"></a>

# [0.6.0-beta.6](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.5...v0.6.0-beta.6) (2018-02-14)

### Bug Fixes

- **package:** update [@turf](https://github.com/turf)/helpers to version 6.0.0 ([#30](https://github.com/urbica/react-map-gl/issues/30)) ([7c93762](https://github.com/urbica/react-map-gl/commit/7c93762))
- add localIdeographFontFamily, transformRequest and collectResourceTiming props ([25d7b0c](https://github.com/urbica/react-map-gl/commit/25d7b0c))

<a name="0.6.0-beta.5"></a>

# [0.6.0-beta.5](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.4...v0.6.0-beta.5) (2017-12-21)

### Bug Fixes

- **Layer:** check for before layer existance ([8b5bbbd](https://github.com/urbica/react-map-gl/commit/8b5bbbd))

<a name="0.6.0-beta.4"></a>

# [0.6.0-beta.4](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.3...v0.6.0-beta.4) (2017-12-19)

<a name="0.6.0-beta.3"></a>

# [0.6.0-beta.3](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.2...v0.6.0-beta.3) (2017-12-19)

### Bug Fixes

- **Layer:** add immutable paint and layout properties support ([a3c1e82](https://github.com/urbica/react-map-gl/commit/a3c1e82))

<a name="0.6.0-beta.2"></a>

# [0.6.0-beta.2](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.1...v0.6.0-beta.2) (2017-12-19)

### Bug Fixes

- **MapGL:** fix layers ordering issue ([03c9b16](https://github.com/urbica/react-map-gl/commit/03c9b16))
- **package:** update [@turf](https://github.com/turf)/helpers to version 5.1.0 ([#10](https://github.com/urbica/react-map-gl/issues/10)) ([0e87072](https://github.com/urbica/react-map-gl/commit/0e87072))
- **package:** update [@turf](https://github.com/turf)/helpers to version 5.1.4 ([#14](https://github.com/urbica/react-map-gl/issues/14)) ([a3edc4d](https://github.com/urbica/react-map-gl/commit/a3edc4d))

<a name="0.6.0-beta.1"></a>

# [0.6.0-beta.1](https://github.com/urbica/react-map-gl/compare/v0.6.0-beta.0...v0.6.0-beta.1) (2017-12-01)

<a name="0.6.0-beta.0"></a>

# [0.6.0-beta.0](https://github.com/urbica/react-map-gl/compare/v0.5.3...v0.6.0-beta.0) (2017-12-01)

### Features

- **SSR:** do not require mapbox-gl on non-browser environments ([2b1ebe1](https://github.com/urbica/react-map-gl/commit/2b1ebe1))

<a name="0.5.3"></a>

## [0.5.3](https://github.com/urbica/react-map-gl/compare/v0.5.2...v0.5.3) (2017-11-23)

### Bug Fixes

- **Layer:** unsubscribe from events on componentWillUnmount ([#7](https://github.com/urbica/react-map-gl/issues/7)) ([6ea478d](https://github.com/urbica/react-map-gl/commit/6ea478d))

<a name="0.5.2"></a>

## [0.5.2](https://github.com/urbica/react-map-gl/compare/v0.5.1...v0.5.2) (2017-11-20)

<a name="0.5.1"></a>

## [0.5.1](https://github.com/urbica/react-map-gl/compare/v0.5.0...v0.5.1) (2017-11-17)

### Bug Fixes

- **Cluster:** recreate cluster on new props ([24509ea](https://github.com/urbica/react-map-gl/commit/24509ea))

<a name="0.5.0"></a>

# [0.5.0](https://github.com/urbica/react-map-gl/compare/v0.4.2...v0.5.0) (2017-11-14)

### Features

- **Cluster:** add Cluster component ([330d6e6](https://github.com/urbica/react-map-gl/commit/330d6e6))

<a name="0.4.2"></a>

## [0.4.2](https://github.com/urbica/react-map-gl/compare/v0.4.1...v0.4.2) (2017-11-13)

### Bug Fixes

- **MapGL:** \_updateMapStyle equality check ([7b00541](https://github.com/urbica/react-map-gl/commit/7b00541))

<a name="0.4.1"></a>

## [0.4.1](https://github.com/urbica/react-map-gl/compare/v0.4.0...v0.4.1) (2017-11-13)

### Bug Fixes

- rebuild dist bundle ([aafbcd0](https://github.com/urbica/react-map-gl/commit/aafbcd0))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/urbica/react-map-gl/compare/v0.3.2...v0.4.0) (2017-11-13)

### Bug Fixes

- **MapGL:** emit onViewportChange only if user interacted with map ([73555ee](https://github.com/urbica/react-map-gl/commit/73555ee))

### Features

- **Marker:** add Marker component ([a5ed563](https://github.com/urbica/react-map-gl/commit/a5ed563))

<a name="0.3.2"></a>

## [0.3.2](https://github.com/urbica/react-map-gl/compare/v0.3.1...v0.3.2) (2017-11-02)

### Bug Fixes

- **Map:** add scrollZoom prop ([e916c87](https://github.com/urbica/react-map-gl/commit/e916c87))

<a name="0.3.1"></a>

## [0.3.1](https://github.com/urbica/react-map-gl/compare/v0.3.0...v0.3.1) (2017-10-20)

### Bug Fixes

- **MapGL:** add getMap method to access map instance ([df79111](https://github.com/urbica/react-map-gl/commit/df79111))

<a name="0.3.0"></a>

# [0.3.0](https://github.com/urbica/react-map-gl/compare/v0.2.2...v0.3.0) (2017-10-20)

### Bug Fixes

- fix flow type annotations ([5f480ee](https://github.com/urbica/react-map-gl/commit/5f480ee))
- fix onLoad ([aa4509e](https://github.com/urbica/react-map-gl/commit/aa4509e))

### Features

- introduce Source and Layer components as MapGL children ([da5d660](https://github.com/urbica/react-map-gl/commit/da5d660))
- **Layer:** introduce onEnter and onLeave props ([684cb05](https://github.com/urbica/react-map-gl/commit/684cb05))
- **MapGL:** add a lot of Mapbox GL JS Map options as MapGL props ([b9a6649](https://github.com/urbica/react-map-gl/commit/b9a6649))
- **MapGL:** add renderWorldCopies prop ([a33a944](https://github.com/urbica/react-map-gl/commit/a33a944))

<a name="0.2.2"></a>

## [0.2.2](https://github.com/urbica/react-map-gl/compare/v0.2.1...v0.2.2) (2017-09-18)

### Bug Fixes

- do not handle viewport changes if there is no onViewportChange prop ([285c22d](https://github.com/urbica/react-map-gl/commit/285c22d))

<a name="0.2.1"></a>

## [0.2.1](https://github.com/urbica/react-map-gl/compare/v0.2.0...v0.2.1) (2017-09-15)

### Bug Fixes

- handle rotateend pitchend boxzoomend [#2](https://github.com/urbica/react-map-gl/issues/2) ([4f6176d](https://github.com/urbica/react-map-gl/commit/4f6176d))

<a name="0.2.0"></a>

# [0.2.0](https://github.com/urbica/react-map-gl/compare/v0.1.0...v0.2.0) (2017-09-12)

### Features

- add onClick support ([8f0b836](https://github.com/urbica/react-map-gl/commit/8f0b836))
- add onHover support ([382b680](https://github.com/urbica/react-map-gl/commit/382b680))

<a name="0.1.0"></a>

# 0.1.0 (2017-08-10)

### Bug Fixes

- fix default export ([ce3bc75](https://github.com/urbica/react-map-gl/commit/ce3bc75))

### Features

- add flow and some documentation ([afdba45](https://github.com/urbica/react-map-gl/commit/afdba45))
- initial commit ([47287e4](https://github.com/urbica/react-map-gl/commit/47287e4))
