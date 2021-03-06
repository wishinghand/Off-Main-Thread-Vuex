function calculatePrimes(iterations, multiplier) {
  const primes = [];
  const now = Date.now();

  // Casual UI-Locking code for 2 seconds!
  while (now + 2000 >= Date.now());

  // Heavy computation!
  for (let i = 0; i < iterations; i++) {
    const candidate = i * (multiplier * Math.random());
    let isPrime = true;
    for (let c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

onmessage = (e) => {
  if (e.data === 'generateItems') {
    // Perform the calculation
    self.postMessage({ type: 'SET_WORKING', payload: true });
    const primes = calculatePrimes(400, 1000000000);
    self.postMessage({ type: 'SET_ITEMS', payload: primes });
    self.postMessage({ type: 'SET_WORKING', payload: false });
  }
};
