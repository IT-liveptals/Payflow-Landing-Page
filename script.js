const chart = LightweightCharts.createChart(document.getElementById("chart"), {
    width: document.getElementById("chart").clientWidth,
    height: 350,
});

const candleSeries = chart.addCandlestickSeries();


// 1. DEFINE FIRST (IMPORTANT)
let lastCandle = {
    time: Math.floor(Date.now() / 1000),
    open: 100,
    high: 105,
    low: 95,
    close: 102
};


// 2. RANDOM GENERATOR
function getRandomCandle(last) {
    const change = (Math.random() - 0.5) * 1000;

    const open = last.close;
    const close = open + change;

    return {
        time: Math.floor(Date.now() / 1000),
        open: open,
        high: Math.max(open, close) + Math.random(),
        low: Math.min(open, close) - Math.random(),
        close: close
    };
}


// 3. SET INITIAL DATA
candleSeries.setData([lastCandle]);


// 4. LIVE UPDATE LOOP
setInterval(() => {
    const newCandle = getRandomCandle(lastCandle);

    candleSeries.update(newCandle);

    lastCandle = newCandle;

}, 2000);