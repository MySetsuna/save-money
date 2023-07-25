import { For } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import config from '../../config';
import { useLocalConfig } from '../../providers/LocalConfig';

const Dashboard = () => {
  const { store } = useLocalConfig();
  console.log(store.dashboards, 'dashboards');

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        margin: '24px',
        'flex-wrap': 'wrap',
      }}
    >
      <For each={store.dashboards}>
        {(dashboard) => (
          <div style={{ width: `${dashboard.span}%`, 'min-width': '120px' }}>
            <Dynamic
              component={config.dashboardMap[dashboard.key]}
              {...{ dashboard }}
            />
          </div>
        )}
      </For>
    </div>
  );
};
export default Dashboard;