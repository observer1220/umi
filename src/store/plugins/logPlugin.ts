export default function logPlugin({ store }) {
  store.$subscribe((mutation, state) => {
    // console.log(mutation.type, mutation.storeId, mutation.events.newValue);
  });
}
