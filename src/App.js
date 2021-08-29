import React, { Component } from 'react'
import { BsArrowRepeat } from 'react-icons/bs';
import { FaTwitter } from 'react-icons/fa';
import './index.css';
import {Col, Row} from 'react-bootstrap';


const RandomQuotes =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class App extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      quotes: [
        {
          quote:
            "Life isn’t about getting and having, it’s about giving and being.",
          author: "Kevin Kruse"
        }
      ],
      index: 0
    };
    this.getRandomIndex = this.getRandomIndex.bind(this);
  }

  componentDidMount() {
    fetch(RandomQuotes)
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            quotes: res.quotes
          },
          this.getRandomIndex
        );
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;
    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index: index
      });
    }
  };

  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const tewetUrl = `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;

    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="col-6 box p-3 pt-5 rounded" id="quote-box">
          {quote && (
            <div className="mb-3">
              <p id="text" className="fs-5 text fw-bold">{quote.quote}</p>
              <cite id="author" className="d-flex justify-content-end fs-6 text">
                {quote.author}
              </cite>
            </div>
          )}
          <div className="justify-content-between row fs-6 text">
            <a
              className="btn btn-primary col-sm-4 m-1"
              href={tewetUrl}
              target="_blank" rel="noreferrer"
              id="tweet-quote"
            >
              <FaTwitter /> Tweet
            </a>
            <button
              className="btn btn-primary col-sm-4 m-1"
              onClick={this.getRandomIndex}
              id="new-quote"
            >
              <BsArrowRepeat /> Get Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
