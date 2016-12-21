export default function swSetup(){
  if(navigator.serviceWorker){
    window.addEventListener('load', register);
  }
}

function register(){
  navigator.serviceWorker.register('/sw.bundle.js')
  .then(function(registration){
    console.log('ServiceWorker registered successfully', registration);
  })
  .catch(function(err){
    console.log('ServiceWorker failed', err);
  });
}
