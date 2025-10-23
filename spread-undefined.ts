
interface BroadcastOptions {
  rooms: Set<string>;
  except?: Set<string>;
}

 const opts: BroadcastOptions = {
  rooms: new Set<string>(),
 }

 console.log('1: ', opts);
 console.log('2: ', ...opts.rooms);
 console.log('3: ', ...new Set(opts.except))
