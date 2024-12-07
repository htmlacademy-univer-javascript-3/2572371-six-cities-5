import React from 'react';
import {Link} from 'react-router-dom';
import AppRoutes from '../../constants/routes.ts';

type CardProps = {
  Premium: boolean;
  Description: string;
  Type: string;
  ImagePath: string;
  Bookmarked: boolean;
  Price: number;
  Id: string;
  onMouseOver: () => void;
}

function Card(props: CardProps): React.ReactElement {
  return (
    <article className="cities__card place-card" onMouseOver={props.onMouseOver}>
      {props.Premium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoutes.Offer}${props.Id}`}>
          <img className="place-card__image" src={props.ImagePath} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.Price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button${props.Bookmarked && '--active'} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{props.Bookmarked ? 'In Bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: 80}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{props.Description}</a>
        </h2>
        <p className="place-card__type">{props.Type}</p>
      </div>
    </article>
  );
}

export default Card;
