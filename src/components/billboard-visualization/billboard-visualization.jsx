import _ from 'lodash';
import { useState } from 'react';
import {
  formatBillboardRegion,
  formatBillboardType,
} from '../../utils/billboard-table/format-text';
import ControlBarchartDisplay from '../bar-chart-selection/bar-chart-selection';
import BarChart from '../bar-chart/bar-chart';
import DoughnutChart from '../doughnut-chart/doughnut-chart';
import PieChart from '../pie-chart/pie-chart';
import CircleVisual from '../svg-circle-visual/svg-circle-visual';
import './billboard-visualization.css';

const BillboardDataVisuals = ({
  billboardGeneralInfo: {
    billboard_info: {
      billboardClass,
      billboardStatesStatus,
      billboardCount,
      billboardTypes,
      billboardRegions,
    },
  },
}) => {
  const [currentState, setCurrState] = useState(billboardStatesStatus[0]);
  console.log('ccc', billboardStatesStatus);
  let billboardDigitalTotal = _.reduce(
    billboardClass.digital,
    (result, value) => result + value,
    0
  );
  let billboardStaticTotal = _.reduce(
    billboardClass.static,
    (result, value) => result + value,
    0
  );

  let billboardTypesArr = _.reduce(
    billboardTypes,
    (result, value, key) => {
      result.push({ boardType: key, boardTypeCount: value });
      return result;
    },
    []
  );

  const pieReduce = _.reduce(
    billboardRegions,
    function (result, value, key) {
      result.regions.push(
        formatBillboardRegion(`${key[0].toUpperCase()}${key.substr(1)}`)
      );
      result.regionCount.push(value);
      return result;
    },
    {
      regions: [],
      regionCount: [],
    }
  );
  const barReduce = _.reduce(
    currentState.types,
    (result, value, key) => {
      result.labels.push(formatBillboardType(value.type));
      result.datasets[0].data.push(value.active || 0);
      result.datasets[1].data.push(value.inactive || 0);
      result.datasets[2].data.push(value.vacant || 0);
      result.datasets[0].backgroundColor.push('#FE4127');
      result.datasets[0].borderColor.push('#FE4127');
      result.datasets[1].backgroundColor.push('#0056b3');
      result.datasets[1].borderColor.push('#0056b3');
      result.datasets[2].backgroundColor.push('#24f25e');
      result.datasets[2].borderColor.push('#24f25e');
      return result;
    },
    {
      labels: [],
      datasets: [
        {
          label: 'Active',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 0,
          barThickness: 9,
          maxBarThickness: 16,
          minBarLength: 1,
        },
        {
          label: 'Inactive',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 0,
          barThickness: 9,
          maxBarThickness: 16,
          minBarLength: 1,
        },
        {
          label: 'Vacant',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 0,
          barThickness: 9,
          maxBarThickness: 16,
          minBarLength: 1,
        },
      ],
    }
  );

  return (
    <>
      <div className="row">
        <div className="col p-0 digital">
          <p className="digital-title">Digital</p>
          <div className="doughnut-container">
            <div className="digital-active">
              <DoughnutChart
                value={billboardClass.digital.active || 0}
                totalValue={billboardDigitalTotal}
                classState="active"
              />
              <p>Active</p>
            </div>
            <div className="static-active1">
              <DoughnutChart
                value={billboardClass.digital.inactive || 0}
                totalValue={billboardDigitalTotal}
                classState="inactive"
              />
              <p>Inactive</p>
            </div>
            <div className="digital-active">
              <DoughnutChart
                value={billboardClass.digital.vacant || 0}
                totalValue={billboardDigitalTotal}
                classState="vacant"
              />
              <p>Vacant</p>
            </div>
          </div>
        </div>
        <div className="col p-0 static">
          <p className="static-title">Static</p>
          <div className="doughnut-container">
            <div className="static-active">
              <DoughnutChart
                value={billboardClass.static.active || 0}
                totalValue={billboardStaticTotal}
                classState="active"
              />
              <p>Active</p>
            </div>
            <div className="static-active1">
              <DoughnutChart
                value={billboardClass.static.inactive || 0}
                totalValue={billboardStaticTotal}
                classState="inactive"
              />
              <p>Inactive</p>
            </div>
            <div className="static-active">
              <DoughnutChart
                value={billboardClass.static.vacant || 0}
                totalValue={billboardStaticTotal}
                classState="vacant"
              />
              <p>Vacant</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row seconder">
        <div className="col total">
          <p className="total-title">Total</p>
          <CircleVisual
            bgColor={'rgba(254, 65, 39, 0.15)'}
            textColor={'#f514be'}
            text={billboardCount}
          />
          <p className="state-status-gen">
            in{' '}
            <span className="state-status-num">
              {billboardStatesStatus.length}{' '}
            </span>
            States
          </p>
        </div>
        <div className="col-md-8 types">
          <p className="types-title">Types</p>
          <div className="types-container">
            {billboardTypesArr.map((billboardType, idx) => (
              <div className="types-active" key={billboardType.boardType}>
                <CircleVisual
                  bgColor={
                    idx % 2 === 0 ? 'rgba(254, 65, 39, 0.15)' : '#0057b377'
                  }
                  textColor={idx % 2 === 0 ? '#FE4127' : '#fff'}
                  text={billboardType.boardTypeCount}
                />
                <p>{formatBillboardType(billboardType.boardType)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row folker">
        <div className="col billboards">
          <p className="billboard-title">Region and number of Assets</p>
          <PieChart
            pieLabels={pieReduce.regions}
            pieData={pieReduce.regionCount}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 lagos">
          <ControlBarchartDisplay
            stateData={billboardStatesStatus}
            currState={currentState}
            setCurrState={setCurrState}
          />
          <div className="">
            <BarChart barData={barReduce} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BillboardDataVisuals;
