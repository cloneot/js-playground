import { setTimeout as wait } from 'node:timers/promises'
import AsyncLock from 'async-lock'

const lock = new AsyncLock();

/**
 * test1
 * non-blocking inner function, non-await outside, non-throw
 */
function test1() {
  lock.acquire('1', () => {
    const a = 1 + 2;
    console.log('test1: Inside');
    return a;
  });
  console.log('test1: Outside');
}
// output:
// test1: Inside
// test1: Outside


/**
 * test2
 * blocking inner function, non-await outside, non-throw
 */
function test2() {
  lock.acquire('2', async () => {
    console.log('test2: Inside before wait');
    await wait(1000);
    console.log('test2: Inside after wait');
  });
  console.log('test2: Outside');
}
// output:
// test2: Inside before wait
// test2: Outside
// test2: Inside after wait


/**
 * test3
 * blocking inner function, non-await outside, throw
 */
function test3() {
  try {
    lock.acquire('3', async () => {
      console.log('test3: Inside before wait');
      await wait(1000);
      console.log('test3: Inside after wait');
      throw new Error('test');
    });
  } catch (err) {
    console.log('test3: Error caught', err);
  }
  console.log('test3: Outside');
}
// output:
// test3: Inside before wait
// test3: Outside
// test3: Inside after wait
// /Users/clo/playground/js-playground/async-lock.ts:41
//       throw new Error('test');
// ----------------------------------------------------


/**
 * test4
 * blocking inner function, await outside, throw
 */
async function test4() {
  try {
    await lock.acquire('4', async () => {
      console.log('test4: Inside before wait');
      await wait(1000);
      console.log('test4: Inside after wait');
      throw new Error('test');
    });
  } catch (err) {
    console.log('test4: Error caught', err);
  }
  console.log('test4: Outside');
}
// output:
// test4: Inside before wait
// test4: Inside after wait
// test4: Error caught Error: test
//     at <anonymous> (/Users/clo/playground/js-playground/async-lock.ts:64:13)
// test4: Outside
// ----------------------------------------------------
