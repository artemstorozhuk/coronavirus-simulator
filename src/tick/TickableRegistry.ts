import Tickable from "./Tickable";

export default interface TickableRegistry {

    register(tickable: Tickable);
}
