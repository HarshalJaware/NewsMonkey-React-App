import React, { Component } from 'react'
import NewsItem from '../NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export default class News extends Component {
    static defaultProps = {
      country: 'in',
      pageSize:5,
      category:'general',
      apiKey:'40e6d68ce7494a2e9bf76c21c4a0fb9e'
    }

    static propTypes = {
      country: PropTypes.string,
      pageSize:PropTypes.number,
    }

    constructor(props){
        super(props);
        this.state = {
            articales: [],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        articales: parseData.articles,
        totalResults:parseData.totalResults,
        loading:false});
    }

    async componentDidMount(){
      this.updateNews();
    }

    handlePrevClick  = async() =>{
        this.setState({page:this.state.page - 1});
        this.updateNews();
        console.log('===================================='+this.state.page);
    }

    handleNextClick  = async() =>{
      this.setState({page:this.state.page + 1});
      this.updateNews();
      console.log('===================================='+this.state.page);
    }

    fetchMoreData = async () => {
      this.setState({page:this.state.page + 1});
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        articales: this.state.articales.concat(parseData.articles),
        totalResults:parseData.totalResults,
        loading:false});
    };

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articales.length}
          next={this.fetchMoreData}
          hasMore={this.state.articales.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
            <div className="row">
              {this.state.articales && this.state.articales.map((element)=>{
                return  <div className="col md-4" key={element.url}>
                      <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}/>
                    </div>
              })}
              </div>
            </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={(this.state.page+1) > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}
