import { Firefly } from './firefly.js';

class FireflyAlgorithm {
  constructor(n_Fireflies, n_Dimensions, obj_Function) {
    this.n_Fireflies = n_Fireflies;
    this.fireflies = [];
    this.n_Dimensions = n_Dimensions;
    this.obj_Function = obj_Function;
    this.alpha = 0.5; // Komponen randomisasi (nilai moderat)
    this.beta0 = 1;   // Daya tarik maksimum
    this.gamma = 1;   // Koefisien penyerapan
    this.init_fireflies();
  }

  init_fireflies() {
    for (let i = 0; i < this.n_Fireflies; i++) {
      const firefly = new Firefly(this.n_Dimensions, this.obj_Function);
      firefly.inisialisasiPosisi();
      this.fireflies.push(firefly);
    }
  }

  evaluateFitness() {
    this.fireflies.forEach(firefly => firefly.calculateFitness());
  }

  calculateDistance(firefly1, firefly2) {
    let sum = 0;
    for (let i = 0; i < this.n_Dimensions; i++) {
      sum += Math.pow(firefly1.position[i] - firefly2.position[i], 2);
    }
    return Math.sqrt(sum);
  }

  mainFA() {
    for (let i = 0; i < this.n_Fireflies; i++) {
      for (let j = 0; j < this.n_Fireflies; j++) {
        if (this.fireflies[j].fitness > this.fireflies[i].fitness) { // Firefly j lebih terang
          const distance = this.calculateDistance(this.fireflies[i], this.fireflies[j]);
          const beta = this.beta0 * Math.exp(-this.gamma * Math.pow(distance, 2)); // Menarik firefly lebih terang

          // Perbarui posisi berdasarkan daya tarik dan komponen randomisasi
          for (let k = 0; k < this.n_Dimensions; k++) {
            const randomFactor = this.alpha * (Math.random() - 0.5); // Variasi acak untuk meningkatkan pergerakan
            this.fireflies[i].position[k] += beta * (this.fireflies[j].position[k] - this.fireflies[i].position[k]) + randomFactor;

            // Pastikan posisi dalam batas yang diperbolehkan
            this.fireflies[i].position[k] = Math.max(0, Math.min(this.fireflies[i].position[k], k === 0 ? 20 : k === 1 ? 30 : 50));
          }
          this.fireflies[i].updateQuantity(); // Perbarui kuantitas ke nilai integer
        }
      }
    }
  }

  getBestSolution() {
    return this.fireflies.reduce((best, current) => (current.fitness > best.fitness ? current : best), this.fireflies[0]);
  }
}

export { FireflyAlgorithm };
