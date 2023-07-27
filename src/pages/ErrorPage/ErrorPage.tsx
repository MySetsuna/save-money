import { ErrorPageComponent } from '@/types';
import { A } from '@solidjs/router';
import { onMount } from 'solid-js';

const ErrorPage: ErrorPageComponent = (props) => {
  onMount(() => {
    console.log(props);
  });

  return (
    <div>
      <div>{props.toString()}</div>
      <button>
        <A href="/">返回首页</A>
      </button>
    </div>
  );
};
export default ErrorPage;
