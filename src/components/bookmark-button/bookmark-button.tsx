import React, {useCallback} from 'react';
import {useAppDispatch} from '../../store';
import {addToFavorites, fetchOffer, removeFromFavorites} from '../../api/client.ts';

type BookmarkButtonProps = {
  Bookmarked: boolean;
  Id: string;
  OfferPage: boolean;
}

export function BookmarkButton(props: BookmarkButtonProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const icon = props.OfferPage ? 'offer__bookmark-icon' : 'place-card__bookmark-icon';
  const button = props.OfferPage ? 'offer__bookmark-button' : 'place-card__bookmark-button';

  const refreshOffer = useCallback(() => {
    dispatch(fetchOffer(props.Id)).unwrap().then().catch().finally(() => {});
  }, [dispatch, props.Id]);

  const onClick = useCallback(() => {
    dispatch(props.Bookmarked
      ? removeFromFavorites(props.Id)
      : addToFavorites(props.Id))
      .unwrap()
      .then(() => {})
      .catch(() => {})
      .finally(() => props.OfferPage ? refreshOffer() : {});
  }, [dispatch, props.Bookmarked, props.Id, props.OfferPage, refreshOffer]);

  return (
    <button onClick={onClick}
      className={`${button}${props.Bookmarked ? '--active' : ''} button`}
      type="button"
    >
      <svg className={props.Bookmarked
        ? `${button} ${button}--active button`
        : icon} width={props.OfferPage ? '31' : '18'} height={props.OfferPage ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{props.Bookmarked ? 'In Bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}
