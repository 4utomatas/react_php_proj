// returns a random number between min (included) and max (excluded)
export default function GetRandomBetween(smallest, largest) {
    return Math.floor(Math.random() * (largest - smallest) ) + smallest;
}