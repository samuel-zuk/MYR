import * as THREE from "three";

export function sphere(data) {
    let phi = data.phi * Math.PI / 180;
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

export function cylinder(data) {
    let phi = data.phi * Math.PI / 180;
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
