(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    'use strict';

    var win = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
    var doc = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

    var Main = (function () {
        function Main() {
            _classCallCheck(this, Main);

            this.$win = $(win);
            this.$contents = $('.contents');
            win.requestAnimationFrame = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || win.msRequestAnimationFrame;
            this.exec();
        }

        _createClass(Main, [{
            key: 'exec',
            value: function exec() {
                var _this = this;

                var loader;

                /*------------------------
                 * EVENT LISTENER
                ------------------------*/
                this.$win.on('resize', function () {
                    _this.camera.aspect = _this.$win.width() / _this.$win.height();
                    _this.camera.updateProjectionMatrix();
                    _this.renderer.setSize(_this.$win.width(), _this.$win.height());
                });

                /*------------------------
                 *   INIT
                ------------------------*/

                this.camera = new THREE.PerspectiveCamera(60, this.$win.width() / this.$win.height(), 1, 4000);
                this.scene = new THREE.Scene();

                // camera
                this.camera.position.z = 10;

                // controls
                this.controls = new THREE.TrackballControls(this.camera);
                this.controls.rotateSpeed = 5.0;
                this.controls.noZoom = true;

                // light
                this.light = new THREE.AmbientLight(0xffffff);
                this.scene.add(this.light);

                this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
                this.directionalLight.position.set(0, 2, 10);
                this.scene.add(this.directionalLight);

                // render
                this.renderer = new THREE.WebGLRenderer({ alpha: true });
                this.renderer.setSize(this.$win.width(), this.$win.height());
                this.$contents.append(this.renderer.domElement);

                loader = new THREE.JSONLoader();
                loader.load('../json/face.json', function (geometry, material) {
                    var face_material = new THREE.MeshFaceMaterial(material);
                    for (var i = 0; i < face_material.materials.length; i++) {
                        face_material.materials[i].side = THREE.DoubleSide;
                    }
                    var face = new THREE.Mesh(geometry, face_material);
                    face.position.y -= 3;
                    _this.scene.add(face);
                });

                this.render();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                this.controls.update();
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(function () {
                    _this2.render();
                });
            }
        }]);

        return Main;
    })();

    new Main();
})();

},{}]},{},[1]);
