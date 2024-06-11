import DiyItem from './components/DiyItem/DiyItem';

export default function App() {
  return (
    <div className="root">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <DiyItem imageUrl="https://picsum.photos/seed/picsum/200/300" />
        <DiyItem imageUrl="https://picsum.photos/seed/picsum/200/300" />
        <DiyItem imageUrl="https://picsum.photos/seed/picsum/200/300" />
        <DiyItem imageUrl="https://picsum.photos/seed/picsum/200/300" />
      </div>
    </div>
  );
}
