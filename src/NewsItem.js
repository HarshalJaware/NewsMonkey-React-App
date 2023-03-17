import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,publishedAt,author,source} = this.props;
    let publishedDate = (publishedAt)?new Date(publishedAt).toGMTString():"";
    let newsAuther = (author !== '')?author:'Unkonwn';
    return (
      <div className="my-3">
        <div className="card">
            <img src={imageUrl?imageUrl:"/no_image_exist.png"} className="card-img-top" alt={title}/>
            <div className="card-body">
                <h5 className="card-title">{title}<span style={{color:'#ff0000'}} className="badge badge-success">{source}</span></h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {newsAuther} on {publishedDate}</small></p>
                <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark" target="_blank">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}
