//! ARRAY (knows what data it stores)
const names: Array<string> = [];
names[0].split(' ');

//! PROMISE (knows what data it returns)
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done!')
  }, 2000);

  reject('Something went wrong...')
})

promise.then(data => data.split(' '))


//! BUILD OUR OWN GENERIC TYPE
