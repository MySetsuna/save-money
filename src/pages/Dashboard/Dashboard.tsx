import { Component, For } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import config from '../../config';
import { useLocalConfig } from '../../providers/LocalConfig';

const Dashboard: Component = () => {
  const [configStore] = useLocalConfig();

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        margin: '24px',
        'flex-wrap': 'wrap',
      }}
    >
      <For each={configStore.dashboards}>
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
