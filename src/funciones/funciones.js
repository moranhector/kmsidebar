//fUNCION PARA MOSTRAR LAS DURACIONES DE LAS CANCIONES EN ALBUMES
export function convertMsToMinutesAndSeconds(durationMs) {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  }
  
  // Otras funciones aquí...
export function convertMsToSeconds (durationMs) {
     return Math.floor(durationMs / 1000);
   };  