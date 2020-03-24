import Ticker from "./Ticker";

export default class CompositeTicker implements Ticker {

    private readonly tickers: Array<Ticker>;

    constructor(tickers: Array<Ticker>) {
        this.tickers = tickers;
    }

    tick() {
        this.tickers.forEach(ticker => ticker.tick());
    }

}
