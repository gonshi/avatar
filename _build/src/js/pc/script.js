(function(win = window, doc = document){
    'use strict'

    class Main{
        constructor(){
            this.$win = $(win)
            this.$contents = $('.contents')
            win.requestAnimationFrame =
                win.requestAnimationFrame ||
                win.mozRequestAnimationFrame ||
                win.webkitRequestAnimationFrame ||
                win.msRequestAnimationFrame;
            this.exec();
        }

        exec(){
            var loader;

            /*------------------------
             * EVENT LISTENER
            ------------------------*/
            this.$win.on('resize', () => {
                this.camera.aspect = this.$win.width() / this.$win.height();
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.$win.width() * 2, this.$win.height() * 2);
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
            //this.controls.noZoom = true;

            // light
            this.light = new THREE.AmbientLight(0xffffff);
            this.scene.add(this.light);

            this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            this.directionalLight.position.set(0, 2, 10);
            this.scene.add(this.directionalLight);

            // render
            this.renderer = new THREE.WebGLRenderer({alpha: true});
            this.$contents.append(this.renderer.domElement);

            loader = new THREE.JSONLoader();
            loader.load('json/face.json', (geometry, material) => {
                let face_material = new THREE.MeshFaceMaterial(material);
                for(let i=0; i<face_material.materials.length; i++){
                    face_material.materials[i].side = THREE.DoubleSide;
                }
                let face = new THREE.Mesh(geometry, face_material);
                face.position.y -= 3;
                this.scene.add(face);
            });

            this.$win.trigger('resize');
            this.render();
        }

        render(){
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(() => {this.render();});
        }
    }

    new Main();
})();
