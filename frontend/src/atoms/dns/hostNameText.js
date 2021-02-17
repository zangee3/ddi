import { atom } from "recoil";

export const hostNameTextState = atom({
    key: 'nameTextState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});
