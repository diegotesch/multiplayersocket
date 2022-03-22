export default function createKeyboardListener(document) {
  const state = {
    observers: []
  }

  function subscribe(observerFn) {
    state.observers.push(observerFn);
  }

  function notifyAll(command) {
    console.log(`Notifying ${state.observers.length} observers`)

    for (const observerFn of state.observers) {
      observerFn(command);
    }
  }

  document.addEventListener('keydown', handleKeydown);

  function handleKeydown(event) {
    const keyPressed = event.key;

    const command = {
      playerId: 'Diego',
      keyPressed
    }

    notifyAll(command);
  }

  return {
    subscribe
  }
}