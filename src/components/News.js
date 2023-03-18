import React, {useEffect,useState} from 'react'
import NewsItem from '../NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {
  const [articales,setArticales] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async() => {
      props.setProgress(0);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parseData = await data.json();
      props.setProgress(70);
      setArticales(parseData.articles);
      setTotalResults(parseData.totalResults)
      setLoading(false);
      props.setProgress(100);
    }

    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
      updateNews();
    },[]);

    const fetchMoreData = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(url);
      let parseData = await data.json();
      setArticales(articales.concat(parseData.articles));
      setTotalResults(parseData.totalResults)
      setLoading(false);
    };


    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin:'20px 0px',marginTop:'65px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articales.length}
          next={fetchMoreData}
          hasMore={articales.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
            <div className="row">
              {articales && articales.map((element)=>{
                return  <div className="col md-4" key={element.url}>
                      <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name}/>
                    </div>
              })}
              </div>
            </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={(page+1) > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
}


News.defaultProps = {
  country: 'in',
  pageSize:5,
  category:'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize:PropTypes.number,
}


export default News;