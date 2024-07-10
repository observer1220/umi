import { MutationPayload } from "../../types/form";

export default function logPlugin({ store }: { store: any })  {
  store.$subscribe((mutation: MutationPayload , state: any) => {
    console.log(mutation.type, mutation.storeId, mutation.events.newValue, state);
  });
}