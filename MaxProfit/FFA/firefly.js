class Firefly {
    constructor(nDimensi, objFunc) {
      this.objFunc = objFunc;
      this.nDimensi = nDimensi;
      this.position = Array(nDimensi).fill(0); // Posisi dalam ruang solusi
      this.quantity = Array(nDimensi).fill(0); // Kuantitas produk
      this.fitness = -Infinity; // Fitness awal
    }
  
    inisialisasiPosisi() {
      // Menginisialisasi posisi secara acak untuk setiap firefly
      this.quantity[0] = Math.floor(Math.random() * 21); // Produk A: Maksimum 20
      this.quantity[1] = Math.floor(Math.random() * 31); // Produk B: Maksimum 30
      this.quantity[2] = Math.floor(Math.random() * 51); // Produk C: Maksimum 50
      this.position = [...this.quantity]; // Set posisi berdasarkan kuantitas
    }
  
    calculateFitness() {
      this.fitness = this.objFunc(...this.quantity); // Evaluasi fitness berdasarkan kuantitas produk
    }
  
    updateQuantity() {
      for (let i = 0; i < this.nDimensi; i++) {
        this.quantity[i] = Math.round(this.position[i]); // Update kuantitas dari posisi
      }
    }
  }
  
  export { Firefly };
  