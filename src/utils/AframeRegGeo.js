import AFRAME from "aframe";
import * as THREE from "three";

AFRAME.registerGeometry("phisphere", {
    schema : { phiLength : { default : 360, min : 0, type : "int"}},
    init : function(data) {
        let phi = data.phiLength * Math.PI / 180;
        let sphere = new THREE.SphereGeometry(1, 18, 36, 0, phi);

        let semiStart = new THREE.CircleGeometry(1, 36, 0, Math.PI);
        semiStart.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
        semiStart.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));

        let semiEnd = new THREE.CircleGeometry(1, 32, 0, Math.PI);
        semiEnd.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
        semiEnd.applyMatrix(new THREE.Matrix4().makeRotationY(phi));

        let geometry = new THREE.Geometry();
        geometry.merge(sphere);
        geometry.merge(semiStart);
        geometry.merge(semiEnd);

        this.geometry = geometry;
    }
});

AFRAME.registerGeometry("phicylinder", {
    schema : { thetaLength : { default : 360, min : 0, type : "int"}},
    init : function(data) {
        let phi = data.thetaLength * Math.PI / 180;
        let cylinder = new THREE.CylinderGeometry(1, 1, 1, 36, 18, false, 0, phi);

        let rectStart = new THREE.PlaneGeometry(1, 1);
        rectStart.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        rectStart.applyMatrix(new THREE.Matrix4().setPosition(new THREE.Vector3(0, 0, 0.5)));

        let rectEnd = new THREE.PlaneGeometry(1, 1);
        rectEnd.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2 +  phi));
        rectEnd.applyMatrix(new THREE.Matrix4().setPosition(new THREE.Vector3(Math.sin(phi) * 0.5, 0, Math.cos(phi) * 0.5)));

        let geometry = new THREE.Geometry();
        geometry.merge(cylinder);
        geometry.merge(rectStart);
        geometry.merge(rectEnd);

        this.geometry = geometry;
    }
});

AFRAME.registerGeometry("phitorus", {
    schema : { arc : { default : 360, min : 0, type : "int"}},
    init : function(data) {
        let phi = data.arc * Math.PI / 180;
        let torusGeometry = new THREE.TorusGeometry(1, 1, 36, 32, phi);

        let circleStart = new THREE.CircleGeometry(1, 32, 0, Math.PI * 2);
        circleStart.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
        circleStart.applyMatrix(new THREE.Matrix4().setPosition(new THREE.Vector3(1, 0, 0)));

        let circleEnd = new THREE.CircleGeometry(1, 32, 0, Math.PI * 2);
        circleEnd.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
        circleEnd.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 2 + phi));
        circleEnd.applyMatrix(new THREE.Matrix4().setPosition(new THREE.Vector3(Math.cos(phi), Math.sin(phi), 0)));

        let geometry = new THREE.Geometry();
        geometry.merge(torusGeometry);
        geometry.merge(circleStart);
        geometry.merge(circleEnd);

        this.geometry = geometry;
    }
});

AFRAME.registerComponent("phipolyhedron", {
    schema : { phiLength : { default : 360, min : 0, type : "int"}},
    init : function(data) {
        let phi = data.phiLength * Math.PI / 180;
        let polyhedron = new THREE.SphereGeometry(1, 2, 8, 0, phi);

        let semiStart = new THREE.CircleGeometry(1, 8, 0, Math.PI);
        semiStart.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
        semiStart.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));

        let semiEnd = new THREE.CircleGeometry(1, 8, 0, Math.PI);
        semiEnd.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
        semiEnd.applyMatrix(new THREE.Matrix4().makeRotationY(phi));

        let geometry = new THREE.Geometry();
        geometry.merge(polyhedron);
        geometry.merge(semiStart);
        geometry.merge(semiEnd);

        this.geometry = geometry;
    }
});