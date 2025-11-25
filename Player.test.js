import Player from "./Player";

test("CPU player does not select same cell", () => {
    const cpuPlayer = new Player();
    const result = cpuPlayer.play([1, 2]);
    const result2 = cpuPlayer.play([1, 2]);
    expect(result).toBe(true);
    expect(result2).toBe(false);

})