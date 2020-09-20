# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.14.2](https://github.com/urbica/react-map-gl/compare/v1.14.1...v1.14.2) (2020-09-20)


### Features

* adding bounds prop to MapGL component ([#305](https://github.com/urbica/react-map-gl/issues/305)) ([72adfcd](https://github.com/urbica/react-map-gl/commit/72adfcd5fdd3679951c054bd2f0cd6b147b9797b))

### [1.14.1](https://github.com/urbica/react-map-gl/compare/v1.14.0...v1.14.1) (2020-08-03)


### Bug Fixes

* **marker:** properly remove onClick event listener on unmount ([abc28ee](https://github.com/urbica/react-map-gl/commit/abc28eeb889224a1ec5d297db547126891b4c8d6))

## [1.14.0](https://github.com/urbica/react-map-gl/compare/v1.13.2...v1.14.0) (2020-08-02)


### Features

* **marker:** add onClick handler ([#301](https://github.com/urbica/react-map-gl/issues/301)) ([5a09e0e](https://github.com/urbica/react-map-gl/commit/5a09e0e4b3099f3a71517c41c44ac359baeb0a25))

### [1.13.2](https://github.com/urbica/react-map-gl/compare/v1.13.1...v1.13.2) (2020-07-18)


### Bug Fixes

* check style height and width in MapGL's componentDidUpdate (h/t [@cazzer](https://github.com/cazzer)) ([#298](https://github.com/urbica/react-map-gl/issues/298))  ([a310867](https://github.com/urbica/react-map-gl/commit/a310867f4875416545a19b0acdc0983bc8737263)), closes [#272](https://github.com/urbica/react-map-gl/issues/272)
* fix flow warnings ([#300](https://github.com/urbica/react-map-gl/issues/300)) ([f8e72f5](https://github.com/urbica/react-map-gl/commit/f8e72f5f30dc75b96f9f1c54afb47a181fdc71dc))
* **marker:** add new Marker props ([#289](https://github.com/urbica/react-map-gl/issues/289)) ([3f25e74](https://github.com/urbica/react-map-gl/commit/3f25e74a194d1770f751a180f27bc871f5ea7e33))

### [1.13.1](https://github.com/urbica/react-map-gl/compare/v1.13.0...v1.13.1) (2020-04-26)


### Bug Fixes

* add support for the maxWidth option of MapboxGL's Popup. (h/t @WesWedding) ([#287](https://github.com/urbica/react-map-gl/issues/287)) ([c6101c1](https://github.com/urbica/react-map-gl/commit/c6101c1b0a6129eae038f6f6060ec3bbfbdfd75b))

## [1.13.0](https://github.com/urbica/react-map-gl/compare/v1.12.4...v1.13.0) (2020-02-14)


### Features

* **mapgl:** add fadeDuration, crossSourceCollisions, and locale props ([9fe04e2](https://github.com/urbica/react-map-gl/commit/9fe04e2277d3b655e38336516ea029f2c4f4f9e2)), closes [#279](https://github.com/urbica/react-map-gl/issues/279)

### [1.12.4](https://github.com/urbica/react-map-gl/compare/v1.12.3...v1.12.4) (2020-01-22)


### Bug Fixes

* **layer:** add support for dynamic type, source and source-layer props [#273](https://github.com/urbica/react-map-gl/issues/273) ([#274](https://github.com/urbica/react-map-gl/issues/274)) ([f735323](https://github.com/urbica/react-map-gl/commit/f735323f5e3fe7231cc19a4cb12ec401e6df371d))

### [1.12.3](https://github.com/urbica/react-map-gl/compare/v1.12.2...v1.12.3) (2019-11-26)


### Bug Fixes

* return if map is undefind on unmount ([#265](https://github.com/urbica/react-map-gl/issues/265)) (h/t [chinesejar](https://github.com/chinesejar)) ([f2cdd7f](https://github.com/urbica/react-map-gl/commit/f2cdd7fe08ad0d6d8783f62139207f32d90eb4ee))

### [1.12.2](https://github.com/urbica/react-map-gl/compare/v1.12.1...v1.12.2) (2019-11-12)


### Bug Fixes

* **mapgl:** add missing `antialias` prop ([f363d94](https://github.com/urbica/react-map-gl/commit/f363d94))

### [1.12.1](https://github.com/urbica/react-map-gl/compare/v1.12.0...v1.12.1) (2019-10-19)


### Bug Fixes

* Always remove the event handlers before the Layer component is ummounted ([#259](https://github.com/urbica/react-map-gl/issues/259)) (h/t [warborn](https://github.com/warborn)) ([a9bcffc](https://github.com/urbica/react-map-gl/commit/a9bcffc))

## [1.12.0](https://github.com/urbica/react-map-gl/compare/v1.11.2...v1.12.0) (2019-09-24)


### Bug Fixes

* **filter:** add validate prop ([4ebe646](https://github.com/urbica/react-map-gl/commit/4ebe646))
* **filter:** set filter to undefined on unmount ([ca1186e](https://github.com/urbica/react-map-gl/commit/ca1186e))
* **filter:** use Array.isArray to validate filter ([ea99412](https://github.com/urbica/react-map-gl/commit/ea99412))


### Features

* **filter:** add Filter component ([357f7f5](https://github.com/urbica/react-map-gl/commit/357f7f5)), closes [#252](https://github.com/urbica/react-map-gl/issues/252)

### [1.11.2](https://github.com/urbica/react-map-gl/compare/v1.11.1...v1.11.2) (2019-09-17)


### Bug Fixes

* **mapgl:** temporary fix for preserving layers on style change ([d55be91](https://github.com/urbica/react-map-gl/commit/d55be91)), closes [#255](https://github.com/urbica/react-map-gl/issues/255)

### [1.11.1](https://github.com/urbica/react-map-gl/compare/v1.11.0...v1.11.1) (2019-09-12)


### Bug Fixes

* **source:** fix source flickering when using tiles prop ([636ea4f](https://github.com/urbica/react-map-gl/commit/636ea4f)), closes [#254](https://github.com/urbica/react-map-gl/issues/254)

## [1.11.0](https://github.com/urbica/react-map-gl/compare/v1.10.0...v1.11.0) (2019-09-11)

### Bug Fixes

- **source:** add dynamic raster sources support ([be3aa67](https://github.com/urbica/react-map-gl/commit/be3aa67)), closes [#247](https://github.com/urbica/react-map-gl/issues/247)
- allow mapbox-gl >= 1.0 in peerDependencies ([f68dbbb](https://github.com/urbica/react-map-gl/commit/f68dbbb)), closes [#243](https://github.com/urbica/react-map-gl/issues/243)
- update flow settings ([de2a766](https://github.com/urbica/react-map-gl/commit/de2a766))
- image source updates ([0f8b070](https://github.com/urbica/react-map-gl/commit/0f8b070)) (h/t [chinesejar](https://github.com/chinesejar))

### Features

- **trafficcontrol:** add possibility to toggle traffic ([eb120b8](https://github.com/urbica/react-map-gl/commit/eb120b8))
- **TrafficControl:** Add traffic control button ([73e2326](https://github.com/urbica/react-map-gl/commit/73e2326))

## [1.10.0](https://github.com/urbica/react-map-gl/compare/v1.9.1...v1.10.0) (2019-08-21)

### Features

- **mapgl:** add layer-specific events support ([54d6f72](https://github.com/urbica/react-map-gl/commit/54d6f72)), closes [#244](https://github.com/urbica/react-map-gl/issues/244)

### [1.9.1](https://github.com/urbica/react-map-gl/compare/v1.9.0...v1.9.1) (2019-08-20)

### Bug Fixes

- **source:** chech if source exists when Source updated ([d74608d](https://github.com/urbica/react-map-gl/commit/d74608d))

## [1.9.0](https://github.com/urbica/react-map-gl/compare/v1.8.0...v1.9.0) (2019-08-11)

### Features

- Add support for the className prop of the Popup component ([c8c8cf3](https://github.com/urbica/react-map-gl/commit/c8c8cf3))

## [1.8.0](https://github.com/urbica/react-map-gl/compare/v1.7.0...v1.8.0) (2019-07-05)

### Bug Fixes

- **Layer:** support layer id updates ([4b92d58](https://github.com/urbica/react-map-gl/commit/4b92d58))

### Features

- **MapGL:** add showTileBoundaries prop ([#233](https://github.com/urbica/react-map-gl/issues/233)) ([3944438](https://github.com/urbica/react-map-gl/commit/3944438))

### Tests

- **Layer:** add Layer unmount test ([5f16e78](https://github.com/urbica/react-map-gl/commit/5f16e78))
- **MapGL:** do not call onViewportChange if originalEvent is not present ([ca0ac1c](https://github.com/urbica/react-map-gl/commit/ca0ac1c))
- **Source:** do not render children until loaded ([eeb9167](https://github.com/urbica/react-map-gl/commit/eeb9167))

## [1.7.0](https://github.com/urbica/react-map-gl/compare/v1.6.1...v1.7.0) (2019-07-03)

### Bug Fixes

- **normalizeChildren:** keep function children and handle empty children ([61bdca9](https://github.com/urbica/react-map-gl/commit/61bdca9))

### Features

- **Image:** allow to add images to the style ([#229](https://github.com/urbica/react-map-gl/issues/229)) ([8816df4](https://github.com/urbica/react-map-gl/commit/8816df4)) (h/t [device25](https://github.com/device25))

### [1.6.1](https://github.com/urbica/react-map-gl/compare/v1.6.0...v1.6.1) (2019-07-01)

### Bug Fixes

- **Layer:** fix layer `before` prop updates [#196](https://github.com/urbica/react-map-gl/issues/196) ([adde8da](https://github.com/urbica/react-map-gl/commit/adde8da))
- **MapGL:** fix neted Layers ordering ([#231](https://github.com/urbica/react-map-gl/issues/231)) ([b6e12ab](https://github.com/urbica/react-map-gl/commit/b6e12ab))

# [1.6.0](https://github.com/urbica/react-map-gl/compare/v1.5.0...v1.6.0) (2019-04-16)

### Bug Fixes

- **Source:** normalize Source children ([a53a840](https://github.com/urbica/react-map-gl/commit/a53a840))

### Features

- **LanguageControl:** add possibility to set language ([8a0eca3](https://github.com/urbica/react-map-gl/commit/8a0eca3))

# [1.5.0](https://github.com/urbica/react-map-gl/compare/v1.4.0...v1.5.0) (2019-04-11)

### Features

- **Source:** allow add Layers as children components in Source ([73e2d45](https://github.com/urbica/react-map-gl/commit/73e2d45))

# [1.4.0](https://github.com/urbica/react-map-gl/compare/v1.3.0...v1.4.0) (2019-04-08)

### Bug Fixes

- **Source:** remove dependent layers on componentWillUnmount ([3f228af](https://github.com/urbica/react-map-gl/commit/3f228af))

### Features

- **Source:** add dynamic update for vector sources mapbox/mapbox-gl-js[#8048](https://github.com/urbica/react-map-gl/issues/8048) ([7bcd8d7](https://github.com/urbica/react-map-gl/commit/7bcd8d7))

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
