/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","1d59e0ed57fa72c8c192147925eb844c"],["bower_components/app-layout/app-drawer/app-drawer.html","e14029895a8741ac6fde01218be08dbc"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","68c44a7d0ce56eec5179385ddd1fcad5"],["bower_components/app-layout/app-toolbar/app-toolbar.html","1969068eeac3ed606025f04bf7871282"],["bower_components/app-route/app-location.html","8fd3320544adb5e25f032dc9ca593d45"],["bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["bower_components/app-route/app-route.html","9c3a42d3d9282b6ac79b7c6936dbcedc"],["bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror-client.html","db45f3e0ebb1793ab2d93a23d98c0c84"],["bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html","bf44841abb63ad2337bfb245b901acb8"],["bower_components/app-storage/app-indexeddb-mirror/common-worker.html","9c85fcf413a3fb6c31269c1cce0f4840"],["bower_components/app-storage/app-network-status-behavior.html","a06873ebcb4e55881e862d14a4344fb2"],["bower_components/app-storage/app-storage-behavior.html","f30899aad62846eda52b1db2ea0b41de"],["bower_components/firebase/firebase-app.js","fc0e83a6e51ce9511acaf16e8e67c4d6"],["bower_components/firebase/firebase-auth.js","3698ac754886a363528b0ad42e2f56e3"],["bower_components/firebase/firebase-database.js","b5312a1dd8ff022e55b032ec57c3d208"],["bower_components/firebase/firebase-messaging.js","dee64bddf8f74cc0d708c8538be76173"],["bower_components/firebase/firebase-storage.js","4004d1231b6add3ed044c24803d350d6"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/geo-location/geo-location.html","79aa68b485f808ad4ef743351f6a7656"],["bower_components/google-apis/google-maps-api.html","a80e25b1c82c44268244a18c250036de"],["bower_components/google-map/google-map-marker.html","b82e59149a2dbd7da24db02fb3f542c8"],["bower_components/google-map/google-map.html","4fb9374905c2f7ebe71357ce73148a05"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1844b46b152179da8a8d2b8a8093f06c"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","7e459d599801c582676534c6d03a4b13"],["bower_components/iron-behaviors/iron-button-state.html","7f7f96935de5deaf9a51264225eb1a5a"],["bower_components/iron-behaviors/iron-control-state.html","f1329af310a186a0c3ce264937c34c5e"],["bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","9ce917fa978d3e488b33ef5183bc6631"],["bower_components/iron-collapse/iron-collapse.html","2494cde7ebae8437288622a4def53282"],["bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","48ae64b446d2f6b9a190e808e76e3caa"],["bower_components/iron-dropdown/iron-dropdown.html","5e69466c8603a435c687e5433887ee2c"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","92bb426360aac378afd1aeac4b055098"],["bower_components/iron-flex-layout/iron-flex-layout-classes.html","7fdc2ab3c7921949621e8374a86e2af4"],["bower_components/iron-flex-layout/iron-flex-layout.html","03e6f060e1a174a51cc599efac9de802"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","2f0a609a52c3b90dc78d529858f04445"],["bower_components/iron-icon/iron-icon.html","0d81dc84af38dfdaa7eca375ab7a9b9e"],["bower_components/iron-icons/communication-icons.html","11ba510515f0e44ff68521fe50a80ef2"],["bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","b4ba3d89346b84fd775da5d96c484015"],["bower_components/iron-image/iron-image.html","2c7dd007dfbf8aa1d759cac087063e6b"],["bower_components/iron-input/iron-input.html","117e335561f348f7cc615443df387405"],["bower_components/iron-jsonp-library/iron-jsonp-library.html","a4ff2805427db5f42f10f190280e6eab"],["bower_components/iron-list/iron-list.html","8213fd6173f9bd8f8673a61480f11aed"],["bower_components/iron-location/iron-location.html","f19dc20392409803357aff026bb27009"],["bower_components/iron-location/iron-query-params.html","e7bf2e51c290545d9cd87e4805c042b4"],["bower_components/iron-media-query/iron-media-query.html","0082aca119880bf33ce3ffd1fa0e9011"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","7744b8d275a22ea335c23e4db0012281"],["bower_components/iron-menu-behavior/iron-menubar-behavior.html","300745a77aae1eaa953f015ae1f77025"],["bower_components/iron-meta/iron-meta.html","f01d1551e8bbe3a8f3ec8d0f52e3be14"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","a2388bb1967df490e219522e00bb22da"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","b48170aa9276dbdc4a0bc76c3bb65cfe"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","2c31da4ab22d8497de3915f945cbf3fb"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","4c27c4ceb18ea76cdf7419112eef258b"],["bower_components/iron-overlay-behavior/iron-scroll-manager.html","bf24adfcd5aaad2fe8fb4c000e251054"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","ef694568c45e136bc268824fd6de7a0a"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","a7b27f01b2f263bf67885d684f9affcc"],["bower_components/iron-selector/iron-multi-selectable.html","2e226f063dd99d8ecda93977d986176b"],["bower_components/iron-selector/iron-selectable.html","c07b54680e6b7cd953bf981a38495402"],["bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","15574530462b9f0c2ae512b078c596a2"],["bower_components/matrix-layout/matrix-layout.html","b8214dc3a1311381c6d20f4b93062d5b"],["bower_components/matrix-layout/matrix-style.html","7456107a73aeb1cf24a66359def733a5"],["bower_components/neon-animation/animations/fade-in-animation.html","036c85fbf438281e2bc9efca073fdf48"],["bower_components/neon-animation/animations/fade-out-animation.html","834a2368655face5daff331858b56d46"],["bower_components/neon-animation/neon-animatable-behavior.html","ca326c00077a9ef323071b2fdab2abd9"],["bower_components/neon-animation/neon-animation-behavior.html","ecc870deadbf9d6d9134a3550eb10676"],["bower_components/neon-animation/neon-animation-runner-behavior.html","ea4b34401b73bac731f4063139414a46"],["bower_components/neon-animation/web-animations.html","aa5266664b17a9a7d7ebf0c4e6fcf8c9"],["bower_components/paper-avatar/lib/jdenticon-1.4.0.min.js","60afbb7d18927be715fcfc84141c0e39"],["bower_components/paper-avatar/lib/md5.min.js","9888f9f563c62ac9b25266a3ac470b53"],["bower_components/paper-avatar/paper-avatar.html","94d3b68ad11747f07badf5220c241283"],["bower_components/paper-behaviors/paper-button-behavior.html","d3c9b2685f6e6585da6cf1e632c50574"],["bower_components/paper-behaviors/paper-checked-element-behavior.html","6bacfe845e0be777b4ae80f02ff85115"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["bower_components/paper-behaviors/paper-ripple-behavior.html","d865b73dbb028c24ed30c47da4a3e8fe"],["bower_components/paper-button/paper-button.html","e56a59ed88bb90e19df8338c53e984a5"],["bower_components/paper-card/paper-card.html","86feddb1aa52e5c01a980bd1c0ecc613"],["bower_components/paper-checkbox/paper-checkbox.html","fe4a6896f8abf9313f01d24af58ccabf"],["bower_components/paper-dialog-behavior/paper-dialog-behavior.html","c81f9bf9a0173da1dd5af3df073a25cc"],["bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","583a2b1fd983174e12159eec8a1e5c46"],["bower_components/paper-dialog-scrollable/paper-dialog-scrollable.html","6dbdf7b633a98273c971d15bda39bf11"],["bower_components/paper-dialog/paper-dialog.html","3cdf217af9197ada5462374abda382f2"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","bd8d99e625c1baab3431ae830d788c72"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-light.html","a67a2717119275676c91399df6a8a087"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","62226dde51d0f26f0ccab279cfb89b58"],["bower_components/paper-dropdown-menu/paper-dropdown-menu.html","7f0211e5e0a93682e83188c89d0591a8"],["bower_components/paper-fab/paper-fab.html","d2179fce15722c8defad314178fb03d7"],["bower_components/paper-icon-button/paper-icon-button.html","c3acafc40e7feb18eec57b7e49df808c"],["bower_components/paper-input/paper-input-addon-behavior.html","db9171b2bf4fdb8327dd4f311ccc0296"],["bower_components/paper-input/paper-input-behavior.html","b55486082945b3371e70e8bf304624e4"],["bower_components/paper-input/paper-input-char-counter.html","515307f96f8507f77b1246b6d17be658"],["bower_components/paper-input/paper-input-container.html","2ab251ffd2f84f0af4f186627ffccb0d"],["bower_components/paper-input/paper-input-error.html","19103517e283f3c553437b1b82a5bcd2"],["bower_components/paper-input/paper-input.html","d6bea3871a883194d8bcd99bb021d69c"],["bower_components/paper-item/paper-icon-item.html","e5a5af273afb4448b9f84b3af3cefcd9"],["bower_components/paper-item/paper-item-behavior.html","ccdc3fce427156a1795b26da08a50d06"],["bower_components/paper-item/paper-item-shared-styles.html","b5104778f1e5f558777d7558623493db"],["bower_components/paper-item/paper-item.html","b81e400f53e1f76d7e2629781773abb3"],["bower_components/paper-listbox/paper-listbox.html","93927bd9e8bbfa08b9d8b8e9d9b66ab8"],["bower_components/paper-menu-button/paper-menu-button-animations.html","14091ce3c8f8008b87e0684ff082d514"],["bower_components/paper-menu-button/paper-menu-button.html","d9a9547221b9b4228c4e46e08363c2bd"],["bower_components/paper-radio-button/paper-radio-button.html","056d57a6d92b86a50064baee11952409"],["bower_components/paper-radio-group/paper-radio-group.html","8d12f9d9cff8f2b4b9a2b13a58fcf314"],["bower_components/paper-ripple/paper-ripple.html","0c89f5d6aec27fa86d0a5422dae34099"],["bower_components/paper-spinner/paper-spinner-behavior.html","46ef5ac786242c29920edbff151343cd"],["bower_components/paper-spinner/paper-spinner-styles.html","7a7e3975c31540dd209e69d7b9cb7ac0"],["bower_components/paper-spinner/paper-spinner.html","7de6bbcb534d5c959225338cda53073f"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/paper-styles.html","3a86674df8b40032fc42fe95649bbec6"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/paper-toast/paper-toast.html","7f30ebdad155bf8015b4679175f2b979"],["bower_components/polymer/lib/elements/array-selector.html","52e8ccf3909fdd0f9419e9774d2ca0a7"],["bower_components/polymer/lib/elements/custom-style.html","f40bf2a4b73a468b95ae479828a3dc5a"],["bower_components/polymer/lib/elements/dom-bind.html","0d93f7a399636f6cf6ebad294794304e"],["bower_components/polymer/lib/elements/dom-if.html","42bd24d5b4fb742b2e889bdaf7de0123"],["bower_components/polymer/lib/elements/dom-module.html","5da507765615f5c123d0efd6c0ee2b26"],["bower_components/polymer/lib/elements/dom-repeat.html","518834bcc7fee13e2e02b85a7b2c7d10"],["bower_components/polymer/lib/legacy/class.html","4ba6bb406bd899376a4c9af525d92a77"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","70df13315aefb7e89bf35414f9f4ee2d"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","61308a9cc1b2cd07bdd49037c643f677"],["bower_components/polymer/lib/legacy/polymer-fn.html","4ecb6f82dd2003974ec5004dcb5644f0"],["bower_components/polymer/lib/legacy/polymer.dom.html","1591777a3be67b598828f7c8cc9b7dcf"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","5a2d1489b25cbcfc0ff535ed9c3b7652"],["bower_components/polymer/lib/mixins/dir-mixin.html","37c54da92010eb75da55564f2a0b6550"],["bower_components/polymer/lib/mixins/element-mixin.html","2fc071522b613c1b9b3ad5603ee9c89d"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","38c200c539ed88933dbe5bbba675f9a4"],["bower_components/polymer/lib/mixins/mutable-data.html","ae5b34cdf84154794087778b40b70b53"],["bower_components/polymer/lib/mixins/property-accessors.html","ab4ec928a215b43a9ee1e4abeb61d840"],["bower_components/polymer/lib/mixins/property-effects.html","43bdf8293189c2669bab67adc2a92fbb"],["bower_components/polymer/lib/mixins/template-stamp.html","2eb71f1f90a4ddb27e31abb407d63363"],["bower_components/polymer/lib/utils/array-splice.html","ed2dff64e9ee2459f197c4b5dfa40d55"],["bower_components/polymer/lib/utils/async.html","cfcef147bd7038f9bc9f93723a8becc6"],["bower_components/polymer/lib/utils/boot.html","ddbfb0d5a025990bf06885bb2a31b459"],["bower_components/polymer/lib/utils/case-map.html","3688b5ebabbe0f08a45d3041d15992d7"],["bower_components/polymer/lib/utils/debounce.html","15487e936eb37101e328bc4ea01733f7"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","fe4ed52ab5eb3a1163b60fe98cafe4a5"],["bower_components/polymer/lib/utils/flush.html","816191b9a81240311f51d0a02ac54fbe"],["bower_components/polymer/lib/utils/gestures.html","6e26471677802afb1463b666f45649c7"],["bower_components/polymer/lib/utils/import-href.html","d235b50f7364ad24853e388c0e47235a"],["bower_components/polymer/lib/utils/mixin.html","ca3a32aca09b6135bd17636d93b649cf"],["bower_components/polymer/lib/utils/path.html","5ce25fdab968f4c908a04b457059589d"],["bower_components/polymer/lib/utils/render-status.html","92d5cab79f72fe11c7dfe9f503f58e09"],["bower_components/polymer/lib/utils/resolve-url.html","17c2ea102916e990c83f1530fc8d7738"],["bower_components/polymer/lib/utils/settings.html","c97b6a7e2375492073255c6fe52b8ef8"],["bower_components/polymer/lib/utils/style-gather.html","9a460886072e6590d4e24dbed482dfac"],["bower_components/polymer/lib/utils/templatize.html","7959b8bfbe64bc85851a672b8fca5c54"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","7e714c300932fa5c6d7bee1c8da03721"],["bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["bower_components/polymerfire/firebase-app-script.html","df1897d11acb9c75522859d372873358"],["bower_components/polymerfire/firebase-app.html","251301a34120bf378941824c3e3bf579"],["bower_components/polymerfire/firebase-auth-script.html","12fe480c116018252246dd4366d1a1ef"],["bower_components/polymerfire/firebase-auth.html","3b6eefa90bd492fccc9ba708f26e5fc3"],["bower_components/polymerfire/firebase-common-behavior.html","a18fe1f3e787924c833f43306de0948a"],["bower_components/polymerfire/firebase-database-behavior.html","a0f518c13c6d0e855c3b7d17caa62d0f"],["bower_components/polymerfire/firebase-database-script.html","b280409885282a43d9b5dd1ee5226fed"],["bower_components/polymerfire/firebase-messaging-script.html","33e0a36b60580c0bcbde7440ce9216e7"],["bower_components/polymerfire/firebase-query.html","fa7bd7aa295648fa5530d6430cbf92f2"],["bower_components/polymerfire/firebase-storage-script.html","73903c0e578289a5910eaad341a730ca"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","996204e3caf0fd21a4d0b39bd4cbab17"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","6e2cb1745040846fe648378e542eeb62"],["bower_components/vaadin-button/vaadin-button.html","7fea10a8aca4172fa18eae3e9072812a"],["bower_components/vaadin-control-state-mixin/vaadin-control-state-mixin.html","86420d23681d838fac9b87b2de03b443"],["bower_components/vaadin-development-mode-detector/vaadin-development-mode-detector.html","e6059bbb14685b1961275676efbbfba0"],["bower_components/vaadin-element-mixin/vaadin-element-mixin.html","f8ee1ebded82497a1364068ea1a1c874"],["bower_components/vaadin-progress-bar/src/vaadin-progress-bar.html","a304b0c9196c24afb90834f06f604010"],["bower_components/vaadin-progress-bar/src/vaadin-progress-mixin.html","e024b309330a69bddda484496f29a7df"],["bower_components/vaadin-progress-bar/theme/valo/vaadin-progress-bar.html","2d2d704de519dc86c381ff09631e199a"],["bower_components/vaadin-progress-bar/vaadin-progress-bar.html","385b91936d6212470f77f2d10ea425f4"],["bower_components/vaadin-themable-mixin/vaadin-themable-mixin.html","645b05569c610d3ad9c46472f657737d"],["bower_components/vaadin-upload/vaadin-upload-file.html","714c120be67c4624a1f1771eaf29d056"],["bower_components/vaadin-upload/vaadin-upload-icons.html","2bf82b95619b25c4df9d12b21545ac2c"],["bower_components/vaadin-upload/vaadin-upload.html","0b4248ff0d1344f53b53e1efe8046a5e"],["bower_components/vaadin-valo-styles/color.html","5f2e356e144b81220f45c68432c66895"],["bower_components/vaadin-valo-styles/spacing.html","233301aa89ae5a713ba19e01a1d2977d"],["bower_components/vaadin-valo-styles/style.html","42ea6aed5d375f15be6ba6ef02cc18db"],["bower_components/vaadin-valo-styles/version.html","9ed7f9062c4df24f13e6773fffccac64"],["bower_components/web-animations-js/web-animations-next-lite.min.js","befa29858423272e72afd1711c999e0e"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["images/favicon.ico","82b34d0faee76b89a9f946763428f668"],["index.html","4f4162c4e764ad016d41675fd5ad48a0"],["manifest.json","1845171d3c4fe9ebe6a48852f4347b34"],["src/components/entity/state-badge.html","95049aebbc4a6f6bdae4ae51a97b30e6"],["src/components/entity/state-icon.html","ad503f27e9fc163b46e60a137d97b58d"],["src/components/info-group.html","ed8394b833f243387353595c7d856d6d"],["src/components/list-device.html","1fb2221ac9471fe1c0af5165dd1c64fa"],["src/components/menu-sidebar.html","997af9d0397fab9fe04f14ba7e1c21f1"],["src/components/notification-manager.html","cc7acbd10e53af86d23a01820ad9c2d1"],["src/components/panel-expansion.html","5edeb0b0c5ba60a98b20968d5c27f826"],["src/components/pop-menu-item.html","d8a40399b259dc6852c40cca97ea3b74"],["src/dialog/device-dialog.html","eaa959647805af689ab73e604c41d64b"],["src/dialog/paper-input-dialog.html","578e5bfd077640ee2a414a199207c0a6"],["src/dialog/upload-image.html","94f5f14231c84f36dfa8d3649cd94a43"],["src/js/dynamics.min.js","e6af409f43c742dc64bec225cc87571c"],["src/js/markerclusterer.js","5ba32b298d905d62b1a9875e4d6ddcdd"],["src/js/richmarker.js","3b6922effba2dfe91696de12b8837bca"],["src/layouts/login-form.html","981dec19dca896b5e23122073f526930"],["src/layouts/maps-page.html","6e95023ce1adcf167fc9c5a1cd3ed4f6"],["src/login/email-login-fire.html","49abfe8d6070b8f0f3fe8a493ee28cf8"],["src/login/login-fire.html","c189b731b39a75697370150e2e6ce459"],["src/login/phone-login-fire.html","c93bfa95fc807e0c13d7192375629891"],["src/login/social-login-fire.html","7f4742e3fd7e9b0d414e11108a863510"],["src/my-app.html","5a5a9b35b6e001a0bbb04c49805e93cd"],["src/resources/share-style.html","2f9c635d77508c28e42a04d4528c24b8"],["src/state-summary/state-imgur-upload.html","ae3c96f195e867a048e6bb7dccf78690"],["src/state-summary/state-info-input.html","b1772f964a4804b237b8dbc0943b4861"],["src/state-summary/state-info-select.html","6861eb4f023273f04fc27412b5495bbf"],["src/state-summary/state-radio-group.html","c76a11a3b12a44646561e332c21dd1db"],["src/state-summary/state-select-icon.html","34095e52ea3d8d7399e2ce0e1d5849da"],["src/state-summary/three-col-layout.html","ea85f80238094fd7c5ab04fd217c8bf2"],["src/util/firebase-data-helper.html","2955c48ab0129e14f79189d1a2b92764"],["src/util/firebase-device-helper.html","a6c6bde0510daf823c986e81646b971f"],["src/util/roboto.html","d4be0e47852e32f5596f721f731cad66"],["src/util/unicode-sign-helper.html","fe0a05bcd5346c1e24bdfc5b05b0cac7"],["src/views/d2l-dom-focus.html","115b76f043004787958e850790a3f85c"],["src/views/d2l-dom-visibility.html","004e02a8da32659ba5cfb1dba3e0311a"],["src/views/d2l-dom.html","9aa8846e0fda531aa5269dc00d046a71"],["src/views/d2l-dropdown-content-behavior.html","27ce19874f3e2767bc0fc498fadb2320"],["src/views/d2l-dropdown-content.html","2f4f058c49ccf10fece97775255896b7"],["src/views/d2l-dropdown-opener-behavior.html","b98181d8c9d27618acb769db494363c5"],["src/views/d2l-dropdown.html","b560d5e76b473d4acd2b459079c37694"],["src/views/d2l-gestures-swipe.html","ef97fb1ba934064ff222e2a372d407bf"],["src/views/d2l-id.html","6495de3f27dcbe7482cc5e5727cad82f"],["src/views/oc-paper-menu-button-in-iron-list.html","83bcc8dbcb8c0b51105cb7e38044e566"],["src/views/profile-marker.html","46fd1ed6d1196a0ab18b6ac61a7124be"],["src/views/rich-marker-script.html","f9bf61556f82e483dfaf2e2f52d44120"],["static/mdi.html","1c1ec78e351b5293ac9574592b72514a"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["^(?!\\/__).*"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/bower_components\/webcomponentsjs\/.*.js/, toolbox.networkFirst, {"cache":{"name":"webcomponentsjs-polyfills-cache"}});




