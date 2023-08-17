import { useNavigate } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';
import {
  ADD_TYPE_COST,
  ADD_TYPE_INCOME,
  ADD_TYPE_BUDGETCUTS,
  ADD_TYPE_BUDGETADD
} from '@/constant';
import styles from './Addition.module.scss';
import { useUser } from '@/providers/User';
import { useCounter } from '@/providers/Counter';

const Addition = () => {
  let form: HTMLFormElement | undefined;
  const navigate = useNavigate();
  const [useStore] = useUser();
  const [counter, { setCounter }] = useCounter();
  const [otherUserType, seOtherUserType] = createSignal<string | undefined>();

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const time = new Date();
    let { total, balance } = counter();
    const addItem: {
      [prop: string]: any;
      type?: string;
      value?: string;
      useType?: string;
      remake?: string;
    } = {};
    for (const data of new FormData(form)) {
      console.log(data);
      const [key, value] = data;
      addItem[key] = value;
    }
    if (
      addItem.type === `${ADD_TYPE_COST}` ||
      addItem.type === `${ADD_TYPE_BUDGETCUTS}`
    ) {
      balance -= Number(addItem.value) || 0;
      if (addItem.type === `${ADD_TYPE_BUDGETCUTS}`) {
        total -= Number(addItem.value) || 0;
      }
    }
    if (addItem.type === `${ADD_TYPE_BUDGETADD}`) {
      total += Number(addItem.value) || 0;
      balance += Number(addItem.value) || 0;
    }
    const detailsJSON = localStorage.getItem(`${useStore().id}_ADDITION`);
    const details = detailsJSON ? JSON.parse(detailsJSON) : {};
    details[time.getTime()] = addItem;
    setCounter({ userId: useStore().id, balance, total });
    localStorage.setItem(`${useStore().id}_ADDITION`, JSON.stringify(details));
    navigate('/detail', { replace: true });
  };
  onMount(() => {
    if (form) form.onsubmit = handleSubmit;
  });
  return (
    <>
      <div class={styles.addition}>
        <span>Addition</span>
        <form ref={form}>
          <div class="editable-rows">
            <div class="row">
              <div>金额</div>
              <input type="number" placeholder="金额" name="value" required />
            </div>
            <div class="row">
              <div>类型</div>
              <select name="type">
                <option value={ADD_TYPE_COST}>支出</option>
                <option value={ADD_TYPE_INCOME}>收入</option>
                <option value={ADD_TYPE_BUDGETCUTS}>削减预算</option>
                <option value={ADD_TYPE_BUDGETADD}>补充预算</option>
              </select>
            </div>
            <div class="row">
              <div>用途分类</div>
              <fieldset>
                <legend>请选择该资金的用途：</legend>
                <div class="usetype-box">
                  <input type="radio" id="eat" name="useType" value="餐饮" />
                  <label for="eat">餐饮</label>
                </div>
                <div class="usetype-box">
                  <input
                    type="radio"
                    id="transportation"
                    name="useType"
                    value="交通费"
                  />
                  <label for="transportation ">交通费</label>
                </div>
                <div class="usetype-box">
                  <input
                    type="radio"
                    id="other"
                    name="useType"
                    value={otherUserType()}
                  />
                  <label for="other ">其他:</label>
                  <input
                    type="text"
                    onChange={(event) => seOtherUserType(event.target.value)}
                  />
                </div>
              </fieldset>
            </div>
            <div class="row">
              <div>备注</div>
              <textarea rows={4} placeholder="备注" name="remake" />
            </div>
          </div>
          <div class="row footer">
            <button type="button" onClick={() => window.history.go(-1)}>
              取消
            </button>
            <button type="submit">确认</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Addition;
