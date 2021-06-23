import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useBillboardData } from '../../hooks/billboard-data-hook';
import { filterBillboardData } from '../../redux/filter-Billboard/filterBillboardReducer';
import { getBilboardCategories } from '../../utils/billboard-category/billboard-category-util';
import { formatBillboardCategory } from '../../utils/billboard-table/format-text';
import './billboard-category.css';

const categorySpanActiveStyle = `
color: #0056b3;
  border-bottom: 2px solid #0056b3;
  font-weight: 600;
`;
const CategorySpan = styled.span`
  display: inline-block;
  margin: 0.7rem 1.67rem 0 0;
  cursor: pointer;
  font-size: 0.89rem;
  padding: 8px 8px;
  text-align: center;
  ${(props) => (props.isActive ? categorySpanActiveStyle : '')}
`;

const BillboardCategory = () => {
  const { billboardData, isLoading, isError } = useBillboardData();
  const filterBillboardState = useSelector((state) => state.filterBillboard);

  const dispatch = useDispatch();
  return !isError && !isLoading ? (
    <div className="billboard-category">
      <CategorySpan
        isActive={filterBillboardState.category === 'all'}
        onClick={() =>
          dispatch(
            filterBillboardData({ category: 'all', type: 'all', keyword: '' })
          )
        }
      >
        {' '}
        All
      </CategorySpan>
      {getBilboardCategories(billboardData).map((category) => (
        <CategorySpan
          isActive={filterBillboardState.category === category}
          key={category}
          onClick={() =>
            dispatch(
              filterBillboardData({
                category,
                type: 'category',
                keyword: category,
              })
            )
          }
        >
          {formatBillboardCategory(category)}
        </CategorySpan>
      ))}
    </div>
  ) : null;
};
export default BillboardCategory;
