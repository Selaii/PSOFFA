function ObjectiveFunction(qtyA, qtyB, qtyC) {
    const priceA = 200000;
    const priceB = 150000;
    const priceC = 100000;
    const volumeA = 0.5;
    const volumeB = 0.25;
    const volumeC = 0.1;
  
    const totalVolume = qtyA * volumeA + qtyB * volumeB + qtyC * volumeC;
    const totalUnits = qtyA + qtyB + qtyC;
  
    // Batasan: Tidak melebihi kapasitas kontainer
    if (totalVolume > 12) {
      return -Infinity; // Invalid solution
    }
  
    // Batasan: Jumlah total produk antara 30 dan 50
    if (totalUnits < 30 || totalUnits > 50) {
      return -Infinity; // Invalid solution
    }
  
    // Hitung total keuntungan
    return (qtyA * priceA + qtyB * priceB + qtyC * priceC);
  }
  
  export { ObjectiveFunction };
  