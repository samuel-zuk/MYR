const AFRAME = window.AFRAME;
const THREE = require("three");

AFRAME.registerGeometry("fixedSphere", {
    schema : {
        phiLength : {default : 360 },
    },
    init : (data) => {
        let sphereGeometry = new THREE.SphereGeometry(1, 32, 32, 0, data.phiLength);
        let sphereMesh = new THREE.Mesh(sphereGeometry);

        let semi1Geometry = new THREE.CircleGeometry(1, 32, 0, Math.PI);
        let semi1Mesh = new THREE.Mesh(semi1Geometry);         
        semi1Mesh.rotation.z = Math.PI / 2;
        semi1Mesh.rotation.x = Math.PI;

        let semi2Geometry = new THREE.CircleGeometry(1, 32, 0, Math.PI);
        let semi2Mesh = new THREE.Mesh(semi2Geometry);
        semi2Mesh.rotation.z = Math.PI / 2;
        semi2Mesh.rotation.y = data.phiLength;

        let geometry = new THREE.Geometry();
        sphereMesh.updateMatrix();
        geometry.merge(sphereMesh.geometry, sphereMesh.matrix);
        semi1Mesh.updateMatrix();
        geometry.merge(semi1Mesh.geometry, semi1Mesh.matrix);
        semi2Mesh.updateMatrix();
        geometry.merge(semi2Mesh.geometry, semi2Mesh.matrix);
        //geometry.merge(sphereGeometry).merge(semi2Geometry).merge(semi1Geometry);
        this.geometry = geometry;
    }
});