import Color from '../Color'
import Hittables from '../Hittables'
import Point from '../Point'
import random from '../random'
import { Dielectric, LambertianMatte, Metal } from '../materials'
import { Sphere } from '../objects'

export default function randomScene(): Hittables {
    const world = new Hittables()

    // Add ground material
    const groundMaterial = new LambertianMatte(new Color(0.5, 0.5, 0.5))
    const ground = new Sphere(new Point(0, -1000, 0), 1000, groundMaterial)
    world.add(ground)

    for (let a = -11; a < 11; a++) {
        for (let b = -11; b < 11; b++) {
            const chooseMaterial = Math.random()
            const center = new Point(
                a + 0.9 * Math.random(),
                0.2,
                b + 0.9 * Math.random()
            )

            if (center.subtract(new Point(4, 0.2, 0)).length() > 0.9) {
                if (chooseMaterial < 0.8) {
                    // Diffuse
                    const albedo = Color.fromVec3(
                        Color.random().mul(Color.random())
                    )
                    const sphereMaterial = new LambertianMatte(albedo)
                    world.add(new Sphere(center, 0.2, sphereMaterial))
                } else if (chooseMaterial < 0.95) {
                    // Metal
                    const albedo = Color.fromVec3(Color.random(0.5, 1))
                    const fuzz = random(0, 0.5)
                    const sphereMaterial = new Metal(albedo, fuzz)
                    world.add(new Sphere(center, 0.2, sphereMaterial))
                } else {
                    // Glass
                    const sphereMaterial = new Dielectric(1.5)
                    world.add(new Sphere(center, 0.2, sphereMaterial))
                }
            }
        }
    }

    // Add bigger spheres
    const material1 = new Dielectric(1.5)
    const sphere1 = new Sphere(new Point(0, 1, 0), 1, material1)
    world.add(sphere1)

    const material2 = new LambertianMatte(new Color(0.4, 0.2, 0.1))
    const sphere2 = new Sphere(new Point(-4, 1, 0), 1, material2)
    world.add(sphere2)

    const material3 = new Metal(new Color(0.7, 0.6, 0.5), 0)
    const sphere3 = new Sphere(new Point(4, 1, 0), 1, material3)
    world.add(sphere3)

    return world
}
