const $id = q => document.getElementById(q)
const print = console.log.bind(this)

function handleFileSelection([file]) {
    let reader = new FileReader()
    reader.onload = ({ target: { result } }) => {
        $id("day1_out")
            .innerText = `🌟:${day1_1(result)}\t🌟🌟:${day1_2(result)}`
    }
    reader.readAsText(file)
}

function day1_1(fileAsString) {
    let input = fileAsString.trim().split("").map(Number)
    let sumIfEqual = ([prev, total], cur) => prev === cur ? [cur, total + prev] : [cur, total]
    let [last, total] = input.reduce(sumIfEqual, [input[input.length - 1], 0])
    return total
}

function day1_2(fileAsString) {
    let input = fileAsString.trim().split("").map(Number)
    const [len, step] = [input.length, Math.floor(input.length / 2)]
    let sum = 0
    for (let i = 0; i < len; ++i) {
        const [me, other] = [input[i], input[(i + step) % len]]
        sum = me === other ? sum + me : sum
    }
    return sum
}