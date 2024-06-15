import ControllableStates from './ControllableStates/ControllableStates';

const DiyCreateAirplane = () => {
  return (
    <div>
      <div>
        <ControllableStates labelName="출발지" />
        <ControllableStates labelName="도착지" />
      </div>
    </div>
  );
};

export default DiyCreateAirplane;
