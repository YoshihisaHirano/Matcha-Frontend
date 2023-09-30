import { Gender, SexPref } from "~/types/global";

export const sexPrefOptions = ["men", "women", "both"];

export const genderIcons = {
    male: 'Male ♂',
    female: 'Female ♀',
    other: 'Non-binary ⚧'
}

export function getSexPref(gender: Gender, sexPref: SexPref) {
    if (gender === 'male' && sexPref === 'men') return 'Men ⚣'
    if (gender === 'female' && sexPref === 'women') return 'Women ⚢'
    if (gender === 'male' && sexPref === 'women') return 'Women ⚤'
    if (gender === 'female' && sexPref === 'men') return 'Men ⚤'
    return 'Just a good person ⚧'
}