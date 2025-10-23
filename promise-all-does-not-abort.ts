// import { describe, it, beforeEach } from 'vitest';

// describe('Promise.all', () => {
//   it('reject if any promise rejects', () => {

//   });
// });
const p1 = new Promise((_, reject) => setTimeout(() => reject('p1 reject'), 100));
const p2 = new Promise(res => setTimeout(() => res('p2 resolve'), 200));
const p3 = new Promise(res => setTimeout(() => res('p3 resolve'), 300));

Promise.all([p1, p2, p3]).catch(console.log);

p1.catch(console.log); // 100ms 후에 "p1 reject" 출력됨
p2.then(console.log); // 200ms 후에 "p2 resolve" 출력됨
p3.then(console.log); // 300ms 후에 "p3 resolve" 출력됨
