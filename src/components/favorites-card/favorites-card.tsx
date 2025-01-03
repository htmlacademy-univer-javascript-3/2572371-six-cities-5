import React from 'react';
import {Link} from 'react-router-dom';
import AppRoutes from '../../constants/routes.ts';

type FavoritesCardProps = {
  Premium: boolean;
  Description: string;
  Type: string;
  ImagePath: string;
  Price: number;
  Id : string;
}

function FavoritesCard(props: FavoritesCardProps): React.ReactElement {
  return (
    <article className="favorites__card place-card">
      {props.Premium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <Link to={`${AppRoutes.Offer}${props.Id}`} className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={props.ImagePath} width="260" height="200" alt="Place image"/>
        </a>
      </Link>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.Price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={'place-card__bookmark-button--active button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: 100}}></span>
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

export default FavoritesCard;
