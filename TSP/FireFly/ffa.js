class Firefly {
    constructor(nDimensi, distanceMatrix) {
        this.nDimensi = nDimensi;
        this.distanceMatrix = distanceMatrix;
        this.position = this.generateRandomPermutation(nDimensi);
        this.fitness = this.calculateFitness();
    }

    generateRandomPermutation(n) {
        const cities = Array.from({ length: n - 1 }, (_, index) => index + 1); // Kota selain Surabaya (indeks 0)
        for (let i = cities.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cities[i], cities[j]] = [cities[j], cities[i]];
        }
        return [0, ...cities, 0]; // Mulai dan kembali ke Surabaya
    }

    calculateFitness() {
        let totalDistance = 0;
        for (let i = 0; i < this.position.length - 1; i++) {
            totalDistance += this.distanceMatrix[this.position[i]][this.position[i + 1]];
        }
        return totalDistance; // Total jarak perjalanan
    }

    moveTowards(brighter, beta, alpha, gamma) {
        const dmax = Math.sqrt(this.nDimensi);
        const rij = Math.random(); // Approximation for normalized distance
        const attraction = beta * Math.exp(-gamma * Math.pow(rij, 2));
        const mutation = alpha * (Math.random() - 0.5);

        // Attracted move
        for (let i = 1; i < this.position.length - 1; i++) { // Skip indeks 0 dan terakhir
            if (Math.random() < attraction) {
                const nextIndex = i + 1 < this.nDimensi - 1 ? i + 1 : 1; // Pastikan indeks valid
                [this.position[i], this.position[nextIndex]] =
                    [this.position[nextIndex], this.position[i]];
            }
        }

        // Random mutation
        if (Math.random() < mutation) {
            const i = Math.floor(Math.random() * (this.nDimensi - 2)) + 1; // Skip indeks 0
            const j = Math.floor(Math.random() * (this.nDimensi - 2)) + 1; // Skip indeks 0
            [this.position[i], this.position[j]] = [this.position[j], this.position[i]];
        }

        this.fitness = this.calculateFitness();
    }
}

class FFA {
    constructor(nFireflies, nDimensi, distanceMatrix, alpha, beta, gamma) {
        this.nFireflies = nFireflies;
        this.nDimensi = nDimensi;
        this.distanceMatrix = distanceMatrix;
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
        this.fireflies = [];
        this.bestFirefly = null;
        this.initFireflies();
    }

    initFireflies() {
        for (let i = 0; i < this.nFireflies; i++) {
            const firefly = new Firefly(this.nDimensi, this.distanceMatrix);
            this.fireflies.push(firefly);
        }
        this.bestFirefly = this.fireflies.reduce((best, current) =>
            current.fitness < best.fitness ? current : best
        );
    }

    moveFireflies() {
        this.fireflies.forEach((firefly) => {
            this.fireflies.forEach((brighter) => {
                if (brighter.fitness < firefly.fitness) {
                    firefly.moveTowards(brighter, this.beta, this.alpha, this.gamma);
                }
            });
        });
        this.bestFirefly = this.fireflies.reduce((best, current) =>
            current.fitness < best.fitness ? current : best
        );
    }
}

// Tambahkan ekspor kelas FFA dan Firefly
export { FFA, Firefly };
