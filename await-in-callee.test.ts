// async/await 동작 테스트: caller의 callee 호출 후 로직 실행 시점 확인
import { describe, it, expect, beforeEach } from 'vitest';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let executionLog: string[] = [];

async function calleeWithAwait() {
  executionLog.push('callee-before-wait');
  await delay(50);
  executionLog.push('callee-after-wait');
  return 0;
}

function calleeWithoutAwait() {
  executionLog.push('callee-before-wait');
  delay(50);
  executionLog.push('callee-after-wait');
  return 0;
}

describe('async/await 동작 테스트', () => {
  beforeEach(() => {
    executionLog = [];
  });


  it('sync caller + async blocking callee', async () => {
    executionLog.push('caller-before-call');
    const p = calleeWithAwait();
    executionLog.push('caller-after-call');

    expect(executionLog).toEqual([
      'caller-before-call',
      'callee-before-wait',
      'caller-after-call',
    ]);

    await p;
    expect(executionLog).toEqual([
      'caller-before-call',
      'callee-before-wait',
      'caller-after-call',
      'callee-after-wait',
    ]);
  });

  it('sync caller + sync non-blocking callee', async () => {
    executionLog.push('caller-before-call');
    const p = calleeWithoutAwait();
    executionLog.push('caller-after-call');

    expect(executionLog).toEqual([
      'caller-before-call',
      'callee-before-wait',
      'callee-after-wait',
      'caller-after-call',
    ]);
  });


});
