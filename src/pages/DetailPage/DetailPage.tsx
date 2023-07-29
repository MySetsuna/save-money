import { ADD_TYPE_MAP } from '@/constant';
import { useUser } from '@/providers/User';
import dayjs from 'dayjs';
import { createEffect, createSignal, For } from 'solid-js';
type row = {
  value: string;
  type: string;
  useType: string;
  remake?: string;
  time: number;
};
const fetchDetails = (userId: number) => {
  console.log(userId, 'userId');

  const detailsJSON = localStorage.getItem(`${userId}_ADDITION`);
  const detailsObj = JSON.parse(detailsJSON ?? '{}');
  const times = Object.keys(detailsObj).sort((a, b) => Number(b) - Number(a));
  const details = [];
  for (const time of times) {
    const row = Object.assign({}, detailsObj[time], { time });
    details.push(row);
  }
  return details as row[];
};

const DetailPage = () => {
  const [useStore] = useUser();
  const [details, setDetails] = createSignal<row[]>();
  createEffect(() => {
    if (useStore().id > 0) {
      const details = fetchDetails(useStore().id);
      setDetails(details);
    }
  });
  return (
    <>
      <div style={{ display: 'flex', gap: '15px' }}>
        <div>金额</div>
        <div>类型</div>
        <div>用途分类</div>
        <div>备注</div>
        <div>时间</div>
      </div>
      <For each={details()}>
        {(row) => {
          return (
            <div style={{ display: 'flex', gap: '15px' }}>
              <div>{row.value}</div>
              <div>{ADD_TYPE_MAP[row.type]}</div>
              <div>{row.useType}</div>
              <div>{row.remake}</div>
              <div>{dayjs(Number(row.time)).format('YYYY/MM/DD HH:mm:ss')}</div>
            </div>
          );
        }}
      </For>
    </>
  );
};
export default DetailPage;
