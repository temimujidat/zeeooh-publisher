import { useSelector, useDispatch } from 'react-redux';
import { filterBillboardData } from '../../redux/filter-Billboard/filterBillboardReducer';
import './billboard-category.css';

const BillboardCategory = () => {
  const filterBillboardState = useSelector((state) => state.filterBillboard);
  const dispatch = useDispatch();
  return (
    <div className="billboard-category">
      <span
        className={
          filterBillboardState.type !== 'category'
            ? 'display-billboards-active'
            : ''
        }
        onClick={() =>
          dispatch(filterBillboardData({ type: 'all', keyword: '' }))
        }
      >
        {' '}
        All{' '}
      </span>
      <span
        className={
          filterBillboardState.type === 'category' &&
          filterBillboardState.keyword === 'billboard'
            ? 'display-billboards-active'
            : ''
        }
        onClick={() =>
          dispatch(
            filterBillboardData({ type: 'category', keyword: 'billboard' })
          )
        }
      >
        Billboard
      </span>
      <span
        className={
          filterBillboardState.type === 'category' &&
          filterBillboardState.keyword === 'constructionAdvert'
            ? 'display-billboards-active'
            : ''
        }
        onClick={() =>
          dispatch(
            filterBillboardData({
              type: 'category',
              keyword: 'constructionAdvert',
            })
          )
        }
      >
        Construction Advert
      </span>
      <span
        className={
          filterBillboardState.type === 'category' &&
          filterBillboardState.keyword === 'lampPost'
            ? 'display-billboards-active'
            : ''
        }
        onClick={() =>
          dispatch(
            filterBillboardData({ type: 'category', keyword: 'lampPost' })
          )
        }
      >
        Lamp Post
      </span>
      <span
        className={
          filterBillboardState.type === 'category' &&
          filterBillboardState.keyword === 'streetFurniture'
            ? 'display-billboards-active'
            : ''
        }
        onClick={() =>
          dispatch(
            filterBillboardData({
              type: 'category',
              keyword: 'streetFurniture',
            })
          )
        }
      >
        Street Furniture
      </span>
      <span
        className={
          filterBillboardState.type === 'category' &&
          filterBillboardState.keyword === 'transitAdvert'
            ? 'display-billboards-active'
            : ''
        }
        onClick={() =>
          dispatch(
            filterBillboardData({ type: 'category', keyword: 'transitAdvert' })
          )
        }
      >
        Transit Advert
      </span>
    </div>
  );
};
export default BillboardCategory;
