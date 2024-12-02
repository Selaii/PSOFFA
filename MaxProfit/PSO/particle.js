class Particle {
    constructor(nDimensi, objFunc) {
        this.objFunc = objFunc;
        this.nDimensi = nDimensi;
        this.position = Array(nDimensi).fill(0);
        this.velocity = Array(nDimensi).fill(0);
        this.pbest = Array(nDimensi).fill(0);
        this.pbestFitness = -Infinity; 
        this.fitness = -Infinity;
        this.quantity = Array(nDimensi).fill(0);
    }

    inisialisasiPosisi() {
        this.quantity[0] = Math.floor(Math.random() * 21); // Produk A: Maksimum 20
        this.quantity[1] = Math.floor(Math.random() * 31); // Produk B: Maksimum 30
        this.quantity[2] = Math.floor(Math.random() * 51); // Produk C: Maksimum 50
        this.position = [...this.quantity];
        this.velocity.fill(0);
        this.pbest = [...this.quantity];
    }

    calculateFitness() {
        this.fitness = this.objFunc(...this.quantity);
    }

    updatePbest() {
        if (this.fitness > this.pbestFitness) {
            this.pbestFitness = this.fitness;
            this.pbest = [...this.quantity];
        }
    }

    updatePosition() {
        for (let i = 0; i < this.nDimensi; i++) {
            this.position[i] = Math.max(0, Math.min(this.position[i] + this.velocity[i], i === 0 ? 20 : i === 1 ? 30 : 50));
            this.quantity[i] = Math.round(this.position[i]); // Bulatkan ke integer
        }
    }
}

export { Particle };
